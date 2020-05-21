import React from 'react';
import { SFDCPredictionResponse } from '../../api/types';
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../store';
import { css } from '@emotion/core';

const cssOuterContainer = (bgColor: string) => css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${bgColor};
`;

const cssTextContainer = (sizeInPx: number, color: string, weight: string) => css`
    font-size: ${sizeInPx}px;
    color: ${color};
    font-weight: ${weight};
`;

interface PredictDisplayProps {
    prediction: SFDCPredictionResponse;
}

export const PredictDisplay: React.FC<PredictDisplayProps> = ({ prediction }) => {

    const preferences = useSelector(
        (state: RootState) => state.preferences,
        shallowEqual
    )

    let textPrimary = prediction.predictions[0].prediction.total.toString();
    if (preferences.textPrimary.prefix) textPrimary = `${preferences.textPrimary.prefix}${textPrimary}`;
    if (preferences.textPrimary.suffix) textPrimary = `${textPrimary}${preferences.textPrimary.suffix}`;

    return (
        <div 
            css={cssOuterContainer(preferences.backgroundColor)}
        >
            <div css={cssTextContainer(preferences.textPrimary.sizeInPx, preferences.textPrimary.color, preferences.textPrimary.weight)}>
                {textPrimary}
            </div>
        </div>
    )

}