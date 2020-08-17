import React from 'react';
import { Prediction } from '../../Extension/Pages/Prediction';
import { SFDCPredictionResponse } from '../../../api/types';
import { Preferences, PreferencesPredict } from '../../../store/types';
import { TextField } from '@tableau/tableau-ui';
import { TextFormatter, NumberFormatter } from '../../../components';

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
}

export const PredictPrefsControls: React.FC<PredictPrefsControlsProps> = ({
  predictPrefs,
  onSettingChanged,
}) => {
  return (
    <React.Fragment>
      <TextField
        label="Page Name"
        kind="line"
        value={predictPrefs.pageName}
        onChange={({ target: { value } }) =>
          onSettingChanged({ ...predictPrefs, pageName: value })
        }
      />
      <TextFormatter
        label="Text Size"
        textOptions={predictPrefs.text}
        onOptionUpdate={(updatedTextPrefs) =>
          onSettingChanged({ ...predictPrefs, text: updatedTextPrefs })
        }
      />
      <TextField
        kind="line"
        label="Prefix"
        onChange={({ target: { value } }) =>
          onSettingChanged({ ...predictPrefs, prefix: value })
        }
        value={predictPrefs.prefix ? predictPrefs.prefix : ''}
      />
      <TextField
        kind="line"
        label="Suffix"
        onChange={({ target: { value } }) =>
          onSettingChanged({ ...predictPrefs, suffix: value })
        }
        value={predictPrefs.suffix ? predictPrefs.suffix : ''}
      />
      <NumberFormatter
        numberFormat={predictPrefs.numberFormatting}
        label="Number Formatting"
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
