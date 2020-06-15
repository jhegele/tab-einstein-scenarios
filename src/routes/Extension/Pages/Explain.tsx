import React from 'react';
import type { SFDCPredictionResponse, SFDCColumn } from '../../../api/types';
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../../store';
import { ArrowIcon } from '../../../components';
import numeral from 'numeral';
import { css } from '@emotion/core';
import { Preferences } from '../../../store/types';

interface ExplainProps {
    prediction: SFDCPredictionResponse;
    prefsOverride?: Preferences;
}

export const Explain: React.FC<ExplainProps> = ({ prediction, prefsOverride }) => {

    const preferences = useSelector(
        (state: RootState) => state.preferences,
        shallowEqual
    )

    // allow override of redux prefs so that we can re-use this component in the
    // config window
    const prefs = prefsOverride ? prefsOverride : preferences;

    const middleValueColToExplanation = (col: SFDCColumn, appendAnd: boolean = false): string => {
        // range type results from Einstein have a columnValue of the form X.XXXXXX to X.XXXXXX
        const reRange: RegExp = /(\d(?:\.?\d*)?) to (\d(?:\.?\d*)?)/;
        const matchRange = col.columnValue.match(reRange);
        if (matchRange) {
            const rangeMin: string = numeral(parseFloat(matchRange[1])).format(prefs.explain.explanationNumberFormatting);
            const rangeMax: string = numeral(parseFloat(matchRange[2])).format(prefs.explain.explanationNumberFormatting)
            return `${col.columnName} is between ${rangeMin} and ${rangeMax}${appendAnd ? ' &' : ''}`;
        }

        // by default, we return a simple string with the column name and unchanged value
        return `${col.columnName} is ${col.columnValue}${appendAnd ? ' &' : ''}`;
    }

    const upArrow = <ArrowIcon variant='up' color={prefs.explain.arrowUpColor} />
    const downArrow = <ArrowIcon variant='down' color={prefs.explain.arrowDownColor} />

    const { middleValues } = prediction.predictions[0].prediction;

    return (
        <table
            css={css`
                width: 90%;
                border-collapse: collapse;
                & > * td {
                    font-size: ${`${prefs.explain.textBody.size}${prefs.explain.textBody.unit}`};
                    font-weight: ${prefs.explain.textBody.weight};
                    color: ${prefs.global.textColor};
                }
                & > * th {
                    font-size: ${`${prefs.explain.textHeader.size}${prefs.explain.textHeader.unit}`};
                    font-weight: ${prefs.explain.textHeader.weight};
                    color: ${prefs.global.textColor};
                }
            `}
        >
            <thead>
                <tr
                    css={css`
                        & > th {border-bottom: 2px solid ${prefs.global.textColor}};
                    `}
                >
                    <th>&nbsp;</th>
                    <th
                        css={css`
                            width: 25%;
                        `}
                    >
                        Value
                    </th>
                    <th>Explanation</th>
                </tr>
            </thead>
            <tbody>
                {middleValues.map((mv, idx) => (
                    <tr 
                        css={idx < middleValues.length - 1 
                            ? css`
                                & > td {border-bottom: 1px dotted ${prefs.global.textColor}};
                            `
                            : null
                        }
                        key={`pred.mv.${idx}`}
                    >
                        <td>
                            {mv.value > 0 ? upArrow : mv.value < 0 ? downArrow : '&nbsp;'}
                        </td>
                        <td
                            css={css`
                                text-align: center;

                            `}
                        >
                            {mv.value > 0 ? '+' : ''}{numeral(mv.value).format(prefs.explain.valueNumberFormatting)}
                        </td>
                        <td>
                            <table>
                                <tbody>
                                    {mv.columns.map((col, idx) => (
                                        <tr key={`pred.mv.col.${idx}`}>
                                            <td>
                                                {middleValueColToExplanation(col, idx < mv.columns.length - 1)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

}