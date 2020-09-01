import React from 'react';
import { Action } from '../../Extension/Pages/Action';
import { SFDCPredictionResponse } from '../../../api/types';
import { Preferences, PreferencesAction } from '../../../store/types';
import { TextFormatter, NumberFormatter } from '../../../components';
import { TextField } from '@tableau/tableau-ui';
import { StringsLanguages } from '../../../strings';
import { getStringsByLanguageCode } from '../../../strings/utils';

interface ActionPrefsContentProps {
  prediction: SFDCPredictionResponse;
  prefs: Preferences;
}

export const ActionPrefsContent: React.FC<ActionPrefsContentProps> = ({
  prediction,
  prefs,
}) => {
  return <Action prediction={prediction} prefsOverride={prefs} />;
};

interface ActionPrefsControlsProps {
  actionPrefs: PreferencesAction;
  onSettingChanged: (newPrefs: PreferencesAction) => void;
  language: StringsLanguages;
}

export const ActionPrefsControls: React.FC<ActionPrefsControlsProps> = ({
  actionPrefs,
  onSettingChanged,
  language,
}) => {
  const { components } = getStringsByLanguageCode(
    language
  ).strings.preferences.action;

  return (
    <React.Fragment>
      <TextField
        label={components.inputs.pageName.label}
        kind="line"
        value={actionPrefs.pageName}
        onChange={({ target: { value } }) =>
          onSettingChanged({ ...actionPrefs, pageName: value })
        }
      />
      <TextFormatter
        label={components.inputs.primaryTextFormatting.label}
        textOptions={actionPrefs.textPrimary}
        onOptionUpdate={(updatedTextPrefs) =>
          onSettingChanged({ ...actionPrefs, textPrimary: updatedTextPrefs })
        }
      />
      <NumberFormatter
        numberFormat={actionPrefs.primaryNumberFormatting}
        label={components.inputs.primaryNumberFormatting.label}
        onFormatUpdate={(updatedNumberFormat: string) =>
          onSettingChanged({
            ...actionPrefs,
            primaryNumberFormatting: updatedNumberFormat,
          })
        }
      />
      <TextFormatter
        label={components.inputs.secondaryTextFormatting.label}
        textOptions={actionPrefs.textSecondary}
        onOptionUpdate={(updatedTextPrefs) =>
          onSettingChanged({ ...actionPrefs, textSecondary: updatedTextPrefs })
        }
      />
      <NumberFormatter
        numberFormat={actionPrefs.secondaryNumberFormatting}
        label={components.inputs.secondaryNumberFormatting.label}
        onFormatUpdate={(updatedNumberFormat: string) =>
          onSettingChanged({
            ...actionPrefs,
            secondaryNumberFormatting: updatedNumberFormat,
          })
        }
      />
    </React.Fragment>
  );
};
