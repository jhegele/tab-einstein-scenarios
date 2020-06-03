import React, { useEffect, useState } from 'react';
import { SFDCAuthResponse, PredictionDef } from './types';
import { getPredictionDefs } from '../../api';
import { Loading, LayoutSetup } from '../../components';
import { DropdownSelect, Button } from '@tableau/tableau-ui';
import { css } from '@emotion/core';

import einsteinLogo from '../../static/img/einstein-logo.png';

const cssDescription = css`
    width: calc(100% - 40px);
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    padding: 20px;
`;

interface PredictionDefsProps {
    auth: SFDCAuthResponse;
    onPredictionDefSelected: (def: PredictionDef) => any;
    onBack: () => void;
}

export const PredictionDefs: React.FC<PredictionDefsProps> = ({ auth, onPredictionDefSelected, onBack }) => {

    const [ predictionDefs, setPredictionDefs ] = useState<PredictionDef[]>();
    const [ selectedDef, setSelectedDef ] = useState<PredictionDef>();

    useEffect(() => {
        getPredictionDefs({
            auth: {
                accessToken: auth.access_token,
                tokenType: auth.token_type,
                instanceUrl: auth.instance_url,
                refreshToken: auth.refresh_token
            }
        })
            .then(({ data }) => (
                setPredictionDefs(
                    data.predictionDefinitions
                        .sort((a, b) => a.label > b.label ? 1 : a.label < b.label ? -1 : 0)
                        .map(pd => ({
                            id: pd.id,
                            createdBy: pd.createdBy.name,
                            createdDate: new Date(pd.createdDate),
                            label: pd.label,
                            lastModifiedBy: pd.lastModifiedBy.name,
                            lastModifiedDate: new Date(pd.lastModifiedDate),
                            url: pd.url,
                            modelsUrl: pd.modelsUrl
                        } as PredictionDef))
                )
            ))
    }, [])

    useEffect(() => {
        console.log('PREDICTION DEFS: ', predictionDefs);
        if (predictionDefs) {
            if (predictionDefs.length > 0) {
                setSelectedDef(predictionDefs[0]);
            } else {
                alert('No prediction definitions were found in your Einstein account! You must deploy your model and the model must show up in Model Manager before you\'ll be able to use this extension.');
            }
        }
    }, [predictionDefs])

    if (!predictionDefs) return <Loading />

    const handleSelect = (id: string) => {
        const matchPredictionDef = predictionDefs.filter(pd => pd.id === id);
        setSelectedDef(matchPredictionDef[0]);
    }

    return (
        <LayoutSetup
            header={{
                title: 'Einstein - Select Prediction Definition',
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
                            onClick={() => selectedDef ? onPredictionDefSelected(selectedDef) : null}
                            css={css`
                                margin-right: 20px;
                            `}
                            disabled={!selectedDef}
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
                From the menu below, select the Einstein prediction definition that you'd like to use. Please note that,
                currently, this extension only supports prediction definitions with a single model. If your prediction
                definition contains multiple models, the extension will still work it will simply select the first model
                among the set of models.
            </div>
            <div
                css={css`
                    margin-top: 20px;
                `}
            >
                <DropdownSelect
                    value={selectedDef?.id || ''}
                    onChange={({ target: { value } }) => handleSelect(value)}
                    label='Einstein Prediction Definition'
                    kind='line'
                >
                    {predictionDefs.map(pd => (
                        <option key={pd.url} value={pd.id}>{pd.label}</option>
                    ))}
                </DropdownSelect>
            </div>
        </LayoutSetup>
    )

}