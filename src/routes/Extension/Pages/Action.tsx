import React from 'react';
import type { SFDCPredictionResponse, SFDCColumn, SFDCPrescription } from '../../../api/types';
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../../store';
import numeral from 'numeral';
import { Preferences } from '../../../store/types';

interface ActionProps {
    prediction: SFDCPredictionResponse;
    prefsOverride?: Preferences;
}

export const Action: React.FC<ActionProps> = ({ prediction, prefsOverride }) => {

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

    const prescriptionToNarrative = (prescription: SFDCPrescription): string => {
        const totalChange: string = numeral(prescription.value).format(prefs.explain.valueNumberFormatting);
        const explanations: string[] = prescription.columns.map(col => colValueToExplanation(col));
        if (explanations.length === 1) return `${totalChange} if ${explanations[0]}`;
        const lastExplanation: string = explanations.pop() || '';
        return `${totalChange} if ${explanations.join(', ')}, and ${lastExplanation}`
    }

    const { prescriptions } = prediction.predictions[0];

    return (
        <div>
            {prescriptions.map((prescription, idx) => (
                <div key={`${idx}.${prescription.value}`}>
                    {prescriptionToNarrative(prescription)}
                </div>
            ))}
        </div>
    )

    // return (
    //     <table
    //         css={css`
    //             width: 90%;
    //             border-collapse: collapse;
    //             & > * td {
    //                 font-size: ${prefs.explain.textBodySizeInPx}px;
    //                 font-weight: ${prefs.explain.textBodyWeight};
    //                 color: ${prefs.global.textColor};
    //             }
    //             & > * th {
    //                 font-size: ${prefs.explain.textHeaderSizeInPx}px;
    //                 font-weight: ${prefs.explain.textHeaderWeight};
    //                 color: ${prefs.global.textColor};
    //             }
    //         `}
    //     >
    //         <thead>
    //             <tr
    //                 css={css`
    //                     & > th {border-bottom: 2px solid ${prefs.global.textColor}};
    //                 `}
    //             >
    //                 <th
    //                     css={css`
    //                         width: 25%;
    //                     `}
    //                 >
    //                     Value
    //                 </th>
    //                 <th>Explanation</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {middleValues.map((mv, idx) => (
    //                 <tr 
    //                     css={idx < middleValues.length - 1 
    //                         ? css`
    //                             & > td {border-bottom: 1px dotted ${prefs.global.textColor}};
    //                         `
    //                         : null
    //                     }
    //                     key={`pred.mv.${idx}`}
    //                 >
    //                     <td>
    //                         {mv.value > 0 ? upArrow : mv.value < 0 ? downArrow : '&nbsp;'}
    //                     </td>
    //                     <td
    //                         css={css`
    //                             text-align: center;

    //                         `}
    //                     >
    //                         {mv.value > 0 ? '+' : ''}{numeral(mv.value).format(prefs.explain.valueNumberFormatting)}
    //                     </td>
    //                     <td>
    //                         <table>
    //                             <tbody>
    //                                 {mv.columns.map((col, idx) => (
    //                                     <tr key={`pred.mv.col.${idx}`}>
    //                                         <td>
    //                                             {middleValueColToExplanation(col, idx < mv.columns.length - 1)}
    //                                         </td>
    //                                     </tr>
    //                                 ))}
    //                             </tbody>
    //                         </table>
    //                     </td>
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </table>
    // )

}