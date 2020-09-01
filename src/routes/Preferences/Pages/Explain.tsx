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
import { StringsLanguages } from '../../../strings';
import { getStringsByLanguageCode } from '../../../strings/utils';

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
  language: StringsLanguages;
}

export const ExplainPrefsControls: React.FC<ExplainPrefsControlsProps> = ({
  explainPrefs,
  onSettingChanged,
  language,
}) => {
  const { components } = getStringsByLanguageCode(
    language
  ).strings.preferences.explain;

  return (
    <React.Fragment>
      <TextField
        label={components.inputs.pageName.label}
        kind="line"
        // TODO: Figure out how to override defaults from Redux in cases where language is not English
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
          {components.colorPickers.arrowColors.label}
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
        label={components.inputs.headerTextFormattingNumber.label}
        onOptionUpdate={(updatedTextOpts) =>
          onSettingChanged({ ...explainPrefs, textHeader: updatedTextOpts })
        }
      />
      <TextFormatter
        textOptions={explainPrefs.textBody}
        label={components.inputs.bodyTextFormattingNumber.label}
        onOptionUpdate={(updatedTextOpts) =>
          onSettingChanged({ ...explainPrefs, textBody: updatedTextOpts })
        }
      />
      <NumberFormatter
        numberFormat={explainPrefs.valueNumberFormatting}
        label={components.selects.valueFieldNumberFormat.label}
        onFormatUpdate={(updatedNumFormat) =>
          onSettingChanged({
            ...explainPrefs,
            valueNumberFormatting: updatedNumFormat,
          })
        }
      />
      <NumberFormatter
        numberFormat={explainPrefs.explanationNumberFormatting}
        label={components.selects.explanationFieldNumberFormat.label}
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
