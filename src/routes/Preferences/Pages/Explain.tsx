import React, { useState, useEffect } from 'react';
import { Explain } from '../../Extension/Pages/Explain';
import { SFDCPredictionResponse } from '../../../api/types';
import { Preferences, PreferencesExplain, PreferencesTextWeight } from '../../../store/types';
import { TextField, DropdownSelect, Checkbox } from '@tableau/tableau-ui';
import { ColorPicker, ArrowIcon, TextFormatter, NumberFormatter } from '../../../components';
import { css } from '@emotion/core';

interface ExplainPrefsContentProps {
    prediction: SFDCPredictionResponse,
    prefs: Preferences
}

export const ExplainPrefsContent: React.FC<ExplainPrefsContentProps> = ({
    prediction,
    prefs
}) => {

    return (
        <Explain
            prediction={prediction}
            prefsOverride={prefs}
        />
    )

}

interface ExplainPrefsControlsProps {
    explainPrefs: PreferencesExplain;
    onSettingChanged: (newPrefs: PreferencesExplain) => void;
}

export const ExplainPrefsControls: React.FC<ExplainPrefsControlsProps> = ({
    explainPrefs,
    onSettingChanged
}) => {

    const [ valueUseThousandsSeparator, setValueUseThousandsSeparator ] = useState<boolean>(true);
    const [ valueDecimalPlaces, setValueDecimalPlaces ] = useState<number>(2);
    const [ valueIsPercentage, setValueIsPercentage ] = useState<boolean>(false);
    const [ explanationUseThousandsSeparator, setExplanationUseThousandsSeparator ] = useState<boolean>(true);
    const [ explanationDecimalPlaces, setExplanationDecimalPlaces ] = useState<number>(2);
    const [ explanationIsPercentage, setExplanationIsPercentage ] = useState<boolean>(false);

    useEffect(() => {
        updateValueNumberFormat();
    }, [valueUseThousandsSeparator, valueDecimalPlaces, valueIsPercentage])

    useEffect(() => {
        updateExplanationNumberFormat();
    }, [explanationUseThousandsSeparator, explanationDecimalPlaces, explanationIsPercentage])

    const updateValueNumberFormat = () => {
        let numFormat: string = '0';
        if (valueUseThousandsSeparator) numFormat += ',0';
        if (valueDecimalPlaces > 0) {
            numFormat += '.';
            for (let i: number = 0; i < valueDecimalPlaces; i++) {
                numFormat += '0'
            }
        }
        if (valueIsPercentage) numFormat += '%';
        onSettingChanged({...explainPrefs, valueNumberFormatting: numFormat});
    }

    const updateExplanationNumberFormat = () => {
        let numFormat: string = '0';
        if (explanationUseThousandsSeparator) numFormat += ',0';
        if (explanationDecimalPlaces > 0) {
            numFormat += '.';
            for (let i: number = 0; i < explanationDecimalPlaces; i++) {
                numFormat += '0'
            }
        }
        if (explanationIsPercentage) numFormat += '%';
        onSettingChanged({...explainPrefs, explanationNumberFormatting: numFormat});
    }

    return (
        <React.Fragment>
            <div
                css={css`
                    display: flex;
                    flex-direction: row;
                `}
            >
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        margin-right: 6px;
                        color: #333;
                    `}
                >
                    Arrow Colors:
                </div>
                <ColorPicker
                    initColor={explainPrefs.arrowUpColor}
                    onColorPicked={color => onSettingChanged({...explainPrefs, arrowUpColor: color})}
                >
                    <ArrowIcon
                        variant='up'
                        color={explainPrefs.arrowUpColor}
                    />
                </ColorPicker>
                <ColorPicker
                    initColor={explainPrefs.arrowDownColor}
                    onColorPicked={color => onSettingChanged({...explainPrefs, arrowDownColor: color})}
                >
                    <ArrowIcon
                        variant='down'
                        color={explainPrefs.arrowDownColor}
                    />
                </ColorPicker>
            </div>
            <TextFormatter
                textOptions={explainPrefs.textHeader}
                label='Header Formatting'
                onOptionUpdate={(updatedTextOpts) => onSettingChanged({...explainPrefs, textHeader: updatedTextOpts})}
            />
            <TextFormatter
                textOptions={explainPrefs.textBody}
                label='Body Formatting'
                onOptionUpdate={(updatedTextOpts) => onSettingChanged({...explainPrefs, textBody: updatedTextOpts})}
            />
            <NumberFormatter
                numberFormat={explainPrefs.valueNumberFormatting}
                label='Value Field - Number Format'
                onFormatUpdate={(updatedNumFormat) => onSettingChanged({...explainPrefs, valueNumberFormatting: updatedNumFormat})}
            />
            <NumberFormatter
                numberFormat={explainPrefs.explanationNumberFormatting}
                label='Explanation Field - Number Format'
                onFormatUpdate={(updatedNumFormat) => onSettingChanged({...explainPrefs, explanationNumberFormatting: updatedNumFormat})}
            />
            {/* <TextField
                kind='line'
                label='Header Size (px)'
                value={explainPrefs.textHeaderSizeInPx}
                onChange={({ target: { value } }) => onSettingChanged({...explainPrefs, textHeaderSizeInPx: parseInt(value)})}
            />
            <DropdownSelect
                kind='line'
                label='Header Weight'
                value={explainPrefs.textHeaderWeight}
                onChange={({ target: { value } }) => onSettingChanged({...explainPrefs, textHeaderWeight: value as PreferencesTextWeight})}
            >
                <option value='normal'>Normal</option>
                <option value='bold'>Bold</option>
            </DropdownSelect>
            <TextField
                kind='line'
                label='Body Size (px)'
                value={explainPrefs.textBodySizeInPx}
                onChange={({ target: { value } }) => onSettingChanged({...explainPrefs, textBodySizeInPx: parseInt(value)})}
            />
            <DropdownSelect
                kind='line'
                label='Body Weight'
                value={explainPrefs.textBodyWeight}
                onChange={({ target: { value } }) => onSettingChanged({...explainPrefs, textBodyWeight: value as PreferencesTextWeight})}
            >
                <option value='normal'>Normal</option>
                <option value='bold'>Bold</option>
            </DropdownSelect>
            <DropdownSelect
                kind='line'
                label='Value - Decimal Places'
                value={valueDecimalPlaces.toString()}
                onChange={({ target: { value } }) => setValueDecimalPlaces(parseInt(value))}
            >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
            </DropdownSelect>
            <Checkbox
                checked={valueUseThousandsSeparator}
                onChange={({ target: { checked }}) => setValueUseThousandsSeparator(checked)}
            >
                Value - Use Thousands Separator
            </Checkbox>
            <Checkbox
                checked={valueIsPercentage}
                onChange={({ target: { checked } }) => setValueIsPercentage(checked)}
            >
                Value - Percentage
            </Checkbox>

            <DropdownSelect
                kind='line'
                label='Explanation - Decimal Places'
                value={explanationDecimalPlaces.toString()}
                onChange={({ target: { value } }) => setExplanationDecimalPlaces(parseInt(value))}
            >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
            </DropdownSelect>
            <Checkbox
                checked={explanationUseThousandsSeparator}
                onChange={({ target: { checked }}) => setExplanationUseThousandsSeparator(checked)}
            >
                Explanation - Use Thousands Separator
            </Checkbox>
            <Checkbox
                checked={explanationIsPercentage}
                onChange={({ target: { checked } }) => setExplanationIsPercentage(checked)}
            >
                Explanation - Percentage
            </Checkbox> */}
        </React.Fragment>
    )

}