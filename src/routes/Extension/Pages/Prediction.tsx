import React from 'react';
import type { SFDCPredictionResponse } from '../../../api/types';
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../../store';
import numeral from 'numeral';
import { css } from '@emotion/core';
import { Preferences } from '../../../store/types';

interface PredictionProps {
    prediction: SFDCPredictionResponse;
    prefsOverride?: Preferences;
}

export const Prediction: React.FC<PredictionProps> = ({ prediction, prefsOverride }) => {

    const preferences = useSelector(
        (state: RootState) => state.preferences,
        shallowEqual
    )

    // allow override of redux prefs so that we can re-use this component in the
    // config window
    const prefs: Preferences = prefsOverride ? prefsOverride : preferences;

    const predictedValue = prediction!.predictions[0].prediction.total;
    const val = numeral(predictedValue).format(prefs.predict.numberFormatting);
    const { prefix, suffix } = prefs.predict;
    const fontSize = `${prefs.predict.text.size}${prefs.predict.text.unit}`;
    return (
        <div
            css={css`
                font-size: ${fontSize};
                font-weight: ${prefs.predict.text.weight};
                color: ${prefs.global.textColor};
            `}
        >
            {`${prefix ? prefix : ''}${val}${suffix ? suffix : ''}`}
        </div>
    )

}