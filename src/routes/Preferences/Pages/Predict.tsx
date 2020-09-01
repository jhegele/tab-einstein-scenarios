import React from 'react';
import { Prediction } from '../../Extension/Pages/Prediction';
import { SFDCPredictionResponse } from '../../../api/types';
import { Preferences, PreferencesPredict } from '../../../store/types';
import { TextField } from '@tableau/tableau-ui';
import { TextFormatter, NumberFormatter } from '../../../components';
import { StringsLanguages } from '../../../strings';
import { getStringsByLanguageCode } from '../../../strings/utils';

interface PredictPrefsContentProps {
  prediction: SFDCPredictionResponse;
  prefs: Preferences;
}

export const PredictPrefsContent: React.FC<PredictPrefsContentProps> = ({
  prediction,
  prefs,
}) => {
  return <Prediction prediction={prediction} prefsOverride={prefs} />;
};

interface PredictPrefsControlsProps {
  predictPrefs: PreferencesPredict;
  onSettingChanged: (newPrefs: PreferencesPredict) => void;
  language: StringsLanguages;
}

export const PredictPrefsControls: React.FC<PredictPrefsControlsProps> = ({
  predictPrefs,
  onSettingChanged,
  language,
}) => {
  const { components } = getStringsByLanguageCode(
    language
  ).strings.preferences.predict;

  return (
    <React.Fragment>
      <TextField
        label={components.inputs.pageName.label}
        kind="line"
        // TODO: Figure out how to override default page name from redux in cases where the language is not English
        value={predictPrefs.pageName}
        onChange={({ target: { value } }) =>
          onSettingChanged({ ...predictPrefs, pageName: value })
        }
      />
      <TextFormatter
        label={components.inputs.textSizeNumber.label}
        textOptions={predictPrefs.text}
        onOptionUpdate={(updatedTextPrefs) =>
          onSettingChanged({ ...predictPrefs, text: updatedTextPrefs })
        }
      />
      <TextField
        kind="line"
        label={components.inputs.prefix.label}
        onChange={({ target: { value } }) =>
          onSettingChanged({ ...predictPrefs, prefix: value })
        }
        value={predictPrefs.prefix ? predictPrefs.prefix : ''}
      />
      <TextField
        kind="line"
        label={components.inputs.suffix.label}
        onChange={({ target: { value } }) =>
          onSettingChanged({ ...predictPrefs, suffix: value })
        }
        value={predictPrefs.suffix ? predictPrefs.suffix : ''}
      />
      <NumberFormatter
        numberFormat={predictPrefs.numberFormatting}
        label={components.selects.numberFormatting.label}
        onFormatUpdate={(updatedNumberFormat: string) =>
          onSettingChanged({
            ...predictPrefs,
            numberFormatting: updatedNumberFormat,
          })
        }
      />
    </React.Fragment>
  );
};
