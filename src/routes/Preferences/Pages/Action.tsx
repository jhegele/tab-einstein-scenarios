import React from 'react';
import { Action } from '../../Extension/Pages/Action';
import { SFDCPredictionResponse } from '../../../api/types';
import { Preferences, PreferencesAction } from '../../../store/types';
import { TextFormatter, NumberFormatter } from '../../../components'

interface ActionPrefsContentProps {
    prediction: SFDCPredictionResponse;
    prefs: Preferences;
}

export const ActionPrefsContent: React.FC<ActionPrefsContentProps> = ({
    prediction,
    prefs
}) => {

    return (
        <Action
            prediction={prediction}
            prefsOverride={prefs}
        />
    )

}

interface ActionPrefsControlsProps {
    actionPrefs: PreferencesAction,
    onSettingChanged: (newPrefs: PreferencesAction) => void;
}

export const ActionPrefsControls: React.FC<ActionPrefsControlsProps> = ({
    actionPrefs,
    onSettingChanged
}) => {

    return (
        <React.Fragment>
            <TextFormatter
                label='Primary Text Formatting'
                textOptions={actionPrefs.textPrimary}
                onOptionUpdate={(updatedTextPrefs) => onSettingChanged({...actionPrefs, textPrimary: updatedTextPrefs})}
            />
            <TextFormatter
                label='Secondary Text Formatting'
                textOptions={actionPrefs.textSecondary}
                onOptionUpdate={(updatedTextPrefs) => onSettingChanged({...actionPrefs, textSecondary: updatedTextPrefs})}
            />
            <NumberFormatter
                numberFormat={actionPrefs.primaryNumberFormatting}
                label='Number Formatting'
                onFormatUpdate={(updatedNumberFormat: string) => onSettingChanged({...actionPrefs, primaryNumberFormatting: updatedNumberFormat})}
            />
            <NumberFormatter
                numberFormat={actionPrefs.secondaryNumberFormatting}
                label='Number Formatting'
                onFormatUpdate={(updatedNumberFormat: string) => onSettingChanged({...actionPrefs, secondaryNumberFormatting: updatedNumberFormat})}
            />
        </React.Fragment>
    )

}