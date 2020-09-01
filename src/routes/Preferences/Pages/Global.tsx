import React from 'react';
import { PreferencesGlobal } from '../../../store/types';
import { css } from '@emotion/core';
import { ColorPicker } from '../../../components';
import { getStringsByLanguageCode } from '../../../strings/utils';
import { StringsLanguages } from '../../../strings';

const cssExampleContainer = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GlobalPrefsContent: React.FC<{ language: StringsLanguages }> = ({
  language,
}) => {
  const { messages } = getStringsByLanguageCode(
    language
  ).strings.preferences.global;

  return (
    <div css={cssExampleContainer}>
      <div
        css={css`
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 12px;
        `}
      >
        24px {messages.boldText}
      </div>
      <div
        css={css`
          font-size: 24px;
          font-weight: normal;
          margin-bottom: 12px;
        `}
      >
        24px {messages.normalText}
      </div>
      <div
        css={css`
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 12px;
        `}
      >
        12px {messages.boldText}
      </div>
      <div
        css={css`
          font-size: 12px;
          font-weight: normal;
          margin-bottom: 12px;
        `}
      >
        12px {messages.normalText}
      </div>
    </div>
  );
};

const cssColorPickLauncher = (color: string) => css`
  height: 25px;
  border: 1px solid #4f4f4f;
  background-color: ${color};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const cssColorPickLauncherText = css`
  color: #fff;
  mix-blend-mode: difference;
`;

interface GlobalPrefsMenuProps {
  globalPrefs: PreferencesGlobal;
  onSettingChanged: (newPrefs: PreferencesGlobal) => void;
}

export const GlobalPrefsControls: React.FC<GlobalPrefsMenuProps> = ({
  globalPrefs,
  onSettingChanged,
}) => {
  const { components } = getStringsByLanguageCode(
    globalPrefs.language
  ).strings.preferences.global;

  return (
    <React.Fragment>
      <ColorPicker
        initColor={globalPrefs.backgroundColor}
        onColorPicked={(color) =>
          onSettingChanged({ ...globalPrefs, backgroundColor: color })
        }
      >
        <div css={cssColorPickLauncher(globalPrefs.backgroundColor)}>
          <div css={cssColorPickLauncherText}>
            {components.colorPickers.backgroundColor.label}
          </div>
        </div>
      </ColorPicker>
      <ColorPicker
        initColor={globalPrefs.textColor}
        onColorPicked={(color) =>
          onSettingChanged({ ...globalPrefs, textColor: color })
        }
      >
        <div css={cssColorPickLauncher(globalPrefs.textColor)}>
          <div css={cssColorPickLauncherText}>
            {components.colorPickers.textColor.label}
          </div>
        </div>
      </ColorPicker>
      <ColorPicker
        initColor={globalPrefs.accentColor}
        onColorPicked={(color) =>
          onSettingChanged({ ...globalPrefs, accentColor: color })
        }
      >
        <div css={cssColorPickLauncher(globalPrefs.accentColor)}>
          <div css={cssColorPickLauncherText}>
            {components.colorPickers.accentColor.label}
          </div>
        </div>
      </ColorPicker>
    </React.Fragment>
  );
};
