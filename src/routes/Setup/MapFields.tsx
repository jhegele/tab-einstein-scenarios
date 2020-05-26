import React, { useEffect, useState } from 'react';
import { SFDCAuthResponse, PredictionDef, DashboardParams } from './types';
import { getModelDefs } from '../../api';
import { css } from '@emotion/core';
import { Loading, LayoutSetup } from '../../components';
import { DropdownSelect, Button } from '@tableau/tableau-ui';
import { MappedFields } from '../../store/types';

import einsteinLogo from '../../static/img/einstein-logo.png';

const cssFieldMapContainer = css`
    display: flex;
    flex-direction: column;
    flex: 2;
    margin-top: 20px;
`;

const cssFieldMapRowContainer = (index: number) => css`
    display: flex;
    flex-direction: row;
    height: 35px;
    align-items: center;
    background-color: ${index % 2 === 0 ? 'inherit' : '#f5f5f5'};
`;

const cssDescription = css`
    width: calc(100% - 40px);
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    padding: 20px;
`;

interface MapFieldsProps {
    auth: SFDCAuthResponse;
    predictionDef: PredictionDef;
    params: DashboardParams;
    onFieldsMapped: (mappedFields: MappedFields) => any;
    onBack: () => void;
}

export const MapFields: React.FC<MapFieldsProps> = ({ auth, predictionDef, params, onFieldsMapped, onBack }) => {

    const [ modelFields, setModelFields ] = useState<string[]>();
    const [ mappedFields, setMappedFields ] = useState<MappedFields>([])

    params.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);

    useEffect(() => {
        getModelDefs({
            auth: {
                instanceUrl: auth.instance_url,
                tokenType: auth.token_type,
                accessToken: auth.access_token,
                refreshToken: auth.refresh_token
            },
            predictionDef: {
                id: predictionDef.id,
                url: predictionDef.url,
                modelsUrl: predictionDef.modelsUrl
            }
        })
            .then(({ data }) => {
                const model = data.models[0];
                setModelFields(Object.keys(model.fieldMap).sort())
            })
    }, [])

    useEffect(() => {
        console.log(mappedFields);
    }, [mappedFields])

    if (!modelFields) return <Loading />

    const handleSelectParam = (einsteinFieldName: string, tableauParamName: string) => {
        const mapIndex = mappedFields.map(f => f.einFieldName).indexOf(einsteinFieldName);
        const newMappedFields = [...mappedFields];
        if (mapIndex === -1) {
            newMappedFields.push({
                einFieldName: einsteinFieldName,
                tabParamName: tableauParamName
            })
        } else {
            newMappedFields.splice(mapIndex, 1);
            
        }
        setMappedFields(newMappedFields);
    }

    return (
        <LayoutSetup
            header={{
                title: 'Einstein - Map Fields',
                logo: {
                    url: einsteinLogo,
                    heightInPx: 75
                }
            }}
            navFooter={{
                align: 'right',
                content: (
                    <React.Fragment>
                        <Button
                            kind='primary'
                            onClick={() => onFieldsMapped(mappedFields)}
                            disabled={mappedFields.length === 0}
                            css={css`
                                margin-right: 20px;
                            `}
                        >
                            Next
                        </Button>
                        <Button
                            kind='outline'
                            onClick={onBack}
                            css={css`
                                margin-right: 20px;
                            `}
                        >
                            Back
                        </Button>
                    </React.Fragment>
                )
            }}
        >
            <div css={cssDescription}>
                You will need to map parameters from your Einstein model to Tableau parameters available in your
                dashboard below. If you do not wish to use a parameter from Einstein, simply select NULL and it 
                will be excluded. Make sure that you build parameter controls for any inputs that you want your
                users to be able to modify.
            </div>
            <div css={cssFieldMapContainer}>
                <div css={cssFieldMapRowContainer(0)}>
                    <div
                        css={css`
                            flex: 1;
                            font-weight: bold;
                        `}
                    >
                        Einstein Model Parameters
                    </div>
                    <div
                        css={css`
                            flex: 1;
                            font-weight: bold;
                        `}
                    >
                        Tableau Parameters
                    </div>
                </div>
                {modelFields.map((fieldName, idx) => (
                    <div key={fieldName} css={cssFieldMapRowContainer(idx)}>
                        <div
                            css={css`
                                flex: 1;
                            `}
                        >
                            {fieldName}
                        </div>
                        <div
                            css={css`
                                flex: 1;
                            `}
                        >
                            <DropdownSelect
                                kind='line'
                                onChange={({ target: { value } }) => handleSelectParam(fieldName, value)}
                                css={css`
                                    min-width: 300px;
                                `}
                            >
                                <option value=''>NULL</option>
                                {params.map(param => (
                                    <option
                                        key={param.name}
                                        value={param.name}
                                    >
                                        {param.name}
                                    </option>
                                ))}
                            </DropdownSelect>
                        </div>
                    </div>
                ))}
            </div>
        </LayoutSetup>
    )

}