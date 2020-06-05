import React, { useEffect, useState } from 'react';
import type { SFDCPredictionResponse, SFDCColumn, SFDCPrescription } from '../../../api/types';
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../../store';
import numeral from 'numeral';
import { Preferences } from '../../../store/types';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { css } from '@emotion/core';

interface ActionProps {
    prediction: SFDCPredictionResponse;
    prefsOverride?: Preferences;
}

export const Action: React.FC<ActionProps> = ({ prediction, prefsOverride }) => {

    const [ selected, setSelected ] = useState<number>();
    const [ prescriptions, setPrescriptions ] = useState<React.ReactNode[]>([]);

    useEffect(() => {   
        const { prescriptions: prescriptionsData } = prediction.predictions[0];
        if (prescriptionsData.length > 0) {
            setPrescriptions(prescriptionsData.map(p => prescriptionToNarrative(p)));
            setSelected(0);
        } else {
            console.log('Einstein sent back no prescriptive info.')
        }
    }, [])

    const preferences = useSelector(
        (state: RootState) => state.preferences,
        shallowEqual
    )

    // allow override of redux prefs so that we can re-use this component in the
    // config window
    const prefs = prefsOverride ? prefsOverride : preferences;

    const colValueToExplanation = (col: SFDCColumn, appendAnd: boolean = false): string => {
        // range type results from Einstein have a columnValue of the form X.XXXXXX to X.XXXXXX
        const reRange: RegExp = /(\d(?:\.?\d*)?) to (\d(?:\.?\d*)?)/;
        const matchRange = col.columnValue.match(reRange);
        if (matchRange) {
            const rangeMin: string = numeral(parseFloat(matchRange[1])).format(prefs.explain.explanationNumberFormatting);
            const rangeMax: string = numeral(parseFloat(matchRange[2])).format(prefs.explain.explanationNumberFormatting);
            return `${col.columnName} is between ${rangeMin} and ${rangeMax}${appendAnd ? ' &' : ''}`;
        }

        // by default, we return a simple string with the column name and unchanged value
        return `${col.columnName} is ${col.columnValue}${appendAnd ? ' &' : ''}`;
    }

    const prescriptionToNarrative = (prescription: SFDCPrescription): React.ReactNode => {
        let totalChange: string = numeral(Math.abs(prescription.value)).format(prefs.explain.valueNumberFormatting);
        if (prescription.value > 0) {
            totalChange = `${totalChange} increase`;
        } else if (prescription.value < 0) {
            totalChange = `${totalChange} decrease`;
        } else {
            totalChange = 'No change'
        }
        const explanations: string[] = prescription.columns.map(col => colValueToExplanation(col));
        if (explanations.length === 1) return (
            <div
                css={css`
                    display: flex;
                    flex-direction: column;
                `}
            >
                <div
                    css={css`
                        font-size: ${prefs.predict.textSizeInPx}px;
                        font-weight: ${prefs.predict.textWeight};
                        margin-bottom: ${prefs.predict.textSizeInPx / 2}px;
                        display: flex; 
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    {totalChange}
                </div>
                <div
                    css={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    {`if ${explanations[0]}`}
                </div>
            </div>
        ) 
        const lastExplanation: string = explanations.pop() || '';
        return (
            <div
                css={css`
                    display: flex;
                    flex-direction: column;
                `}
            >
                <div
                    css={css`
                        font-size: ${prefs.predict.textSizeInPx}px;
                        font-weight: ${prefs.predict.textWeight};
                        margin-bottom: ${prefs.predict.textSizeInPx / 2}px;
                        display: flex; 
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    {totalChange}
                </div>
                <div>
                    {`if ${explanations.join(', ')}, and ${lastExplanation}`}
                </div>
            </div>
        )
    }

    if (selected === undefined) return null;

    return (
        <div
            css={css`
                width: 80%;
            `}
        >
            <div
                css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                `}
            >
                {prescriptions[selected]}
            </div>
            <div
                css={css`
                    display: flex;
                    flex-direction: row;
                `}
            >
                <div
                    css={css`
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    {selected > 0
                        ? (
                            <RiArrowLeftSLine
                                css={css`
                                color: ${prefs.global.accentColor};
                                width: 30px;
                                height: 30px;
                                cursor: pointer;
                            `}
                                onClick={() => setSelected(curr => curr === undefined ? undefined : curr - 1)}
                            />
                        )
                        : null
                    }
                </div>
                <div
                    css={css`
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    {selected < prescriptions.length - 1
                        ? (
                            <RiArrowRightSLine
                                css={css`
                                    color: ${prefs.global.accentColor};
                                    width: 30px;
                                    height: 30px;
                                    cursor: pointer;
                                `}
                                onClick={() => setSelected(curr => curr === undefined ? undefined : curr + 1)}
                            />
                        )
                        : null
                    }
                </div>
            </div>
        </div>
    )

}