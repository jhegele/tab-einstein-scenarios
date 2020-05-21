import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store';
import { getPrediction } from '../../api';
import { Loading } from '../../components';
import { ParameterChangedEvent } from '@tableau/extensions-api-types';
import { PredictDisplay } from './PredictDisplay';
import { SFDCPredictionResponse } from '../../api/types';

export const Predict: React.FC = () => {

    const [ ready, setReady ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ paramValues, setParamValues ] = useState<{[key: string]: any}>({});
    const [ predictionResponse, setPredictionResponse ] = useState<SFDCPredictionResponse>();

    const { extensions } = window.tableau;
    if (!extensions.dashboardContent) throw 'Error: dashboardContent not found in extensions object!';
    if (!extensions.dashboardContent.dashboard) throw 'Error: dashboard object not found in dashboardContent object!'
    const { dashboard } = extensions.dashboardContent;

    const { auth, prediction } = useSelector(
        (state: RootState) => state,
        shallowEqual
    )

    if (!prediction.mappedFields) throw 'Error: no mapped fields found in settings!'

    const getParamValues = async (): Promise<{[key: string]: any}> => {
        const params = await dashboard.getParametersAsync();
        const values: {[key: string]: any} = {};
        prediction.mappedFields!.forEach(field => {
            const matchedParam = params.filter(p => p.name === field.tabParamName);
            if (matchedParam.length === 0) throw 'Error: mapped Tableau parameter does not exist in dashboard!'
            values[field.einFieldName] = matchedParam[0].currentValue.value;
        });
        return values;
    }

    const setParamListeners = async (): Promise<(() => any)[]> => {
        const tableauParams = prediction.mappedFields!.map(field => field.tabParamName);
        const unregisterFns: (() => any)[] = [];
        tableauParams.forEach(async tabParam => {
            const param = await dashboard.findParameterAsync(tabParam);
            if (param) {
                unregisterFns.push(
                    // @ts-ignore
                    param.addEventListener('parameter-changed', async (paramEvent: ParameterChangedEvent) => {
                        const updatedValues = await getParamValues();
                        setParamValues(updatedValues);
                    })
                )
            }
        })
        return unregisterFns;
    }

    const updatePrediction = () => {
        setLoading(true);
        const einsteinColNames = Object.keys(paramValues);
        const dataRow = einsteinColNames.map(col => paramValues[col]);
        getPrediction({
            auth: {
                accessToken: auth.accessToken!,
                tokenType: auth.tokenType!,
                instanceUrl: auth.instanceUrl!
            },
            predictionDef: {
                id: prediction.id!,
            },
            data: {
                columnNames: einsteinColNames,
                rows: [dataRow]
            }
        })
            .then(({ data }) => {
                setPredictionResponse(data);
                setLoading(false);
            })
    }

    useEffect(() => {
        setReady(false);
        setParamListeners()
            .then(unregisterFns => {
                getParamValues()
                    .then(values => {
                        setParamValues(values)
                        setReady(true);
                        return unregisterFns;
                    });
            })
    }, [])

    useEffect(() => {
        if (Object.keys(paramValues).length > 0) updatePrediction();
    }, [paramValues])

    if (loading || !ready || !predictionResponse) return <Loading />

    return (
        <PredictDisplay 
            prediction={predictionResponse}
        />
    )

}