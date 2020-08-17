import React from 'react';
import { Explain } from '../../Extension/Pages/Explain';
import { SFDCPredictionResponse } from '../../../api/types';
import { Preferences, PreferencesExplain } from '../../../store/types';
import {
  ColorPicker,
  ArrowIcon,
  TextFormatter,
  NumberFormatter,
} from '../../../components';
import { css } from '@emotion/core';
import { TextField } from '@tableau/tableau-ui';

interface ExplainPrefsContentProps {
  prediction: SFDCPredictionResponse;
  prefs: Preferences;
}

export const ExplainPrefsContent: React.FC<ExplainPrefsContentProps> = ({
  prediction,
  prefs,
}) => {
  return <Explain prediction={prediction} prefsOverride={prefs} />;
};

interface ExplainPrefsControlsProps {
  explainPrefs: PreferencesExplain;
  onSettingChanged: (newPrefs: PreferencesExplain) => void;
}

export const ExplainPrefsControls: React.FC<ExplainPrefsControlsProps> = ({
  explainPrefs,
  onSettingChanged,
}) => {
  return (
    <React.Fragment>
      <TextField
        label="Page Name"
        kind="line"
        value={explainPrefs.pageName}
        onChange={({ target: { value } }) =>
          onSettingChanged({ ...explainPrefs, pageName: value })
        }
      />
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
          onColorPicked={(color) =>
            onSettingChanged({ ...explainPrefs, arrowUpColor: color })
          }
        >
          <ArrowIcon variant="up" color={explainPrefs.arrowUpColor} />
        </ColorPicker>
        <ColorPicker
          initColor={explainPrefs.arrowDownColor}
          onColorPicked={(color) =>
            onSettingChanged({ ...explainPrefs, arrowDownColor: color })
          }
        >
          <ArrowIcon variant="down" color={explainPrefs.arrowDownColor} />
        </ColorPicker>
      </div>
      <TextFormatter
        textOptions={explainPrefs.textHeader}
        label="Header Text Formatting"
        onOptionUpdate={(updatedTextOpts) =>
          onSettingChanged({ ...explainPrefs, textHeader: updatedTextOpts })
        }
      />
      <TextFormatter
        textOptions={explainPrefs.textBody}
        label="Body Text Formatting"
        onOptionUpdate={(updatedTextOpts) =>
          onSettingChanged({ ...explainPrefs, textBody: updatedTextOpts })
        }
      />
      <NumberFormatter
        numberFormat={explainPrefs.valueNumberFormatting}
        label="Value Field - Number Format"
        onFormatUpdate={(updatedNumFormat) =>
          onSettingChanged({
            ...explainPrefs,
            valueNumberFormatting: updatedNumFormat,
          })
        }
      />
      <NumberFormatter
        numberFormat={explainPrefs.explanationNumberFormatting}
        label="Explanation Field - Number Format"
        onFormatUpdate={(updatedNumFormat) =>
          onSettingChanged({
            ...explainPrefs,
            explanationNumberFormatting: updatedNumFormat,
          })
        }
      />
    </React.Fragment>
  );
};
