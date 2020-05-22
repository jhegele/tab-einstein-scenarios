import React from 'react';
import { SFDCPredictionResponse } from '../../api/types';
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../store';
import { LayoutExtension } from '../../components';
import numeral from 'numeral';

interface PredictDisplayProps {
    prediction: SFDCPredictionResponse;
}

export const PredictDisplay: React.FC<PredictDisplayProps> = ({ prediction }) => {

    const { extensions: { environment } } = window.tableau;

    const preferences = useSelector(
        (state: RootState) => state.preferences,
        shallowEqual
    )

    const predictedValue = prediction.predictions[0].prediction.total;

    return (
        <LayoutExtension
            prefs={preferences}
            showToolbar={environment.mode === 'authoring'}
        >
            {numeral(predictedValue).format(preferences.textPrimary.numberFormatting)}
        </LayoutExtension>
    )

}