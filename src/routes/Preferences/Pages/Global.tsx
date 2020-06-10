import React from 'react';
import { PreferencesGlobal } from '../../../store/types';
import { css } from '@emotion/core';
import { ColorPicker } from '../../../components';
import { Checkbox } from '@tableau/tableau-ui';

const cssExampleContainer = css`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const GlobalPrefsContent: React.FC = () => {

    return (
        <div css={cssExampleContainer}>
            <div
                css={css`
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 12px;
                `}
            >
                24px Bold Text
            </div>
            <div
                css={css`
                    font-size: 24px;
                    font-weight: normal;
                    margin-bottom: 12px;
                `}
            >
                24px Normal Text
            </div>
            <div
                css={css`
                    font-size: 12px;
                    font-weight: bold;
                    margin-bottom: 12px;
                `}
            >
                12px Bold Text
            </div>
            <div
                css={css`
                    font-size: 12px;
                    font-weight: normal;
                    margin-bottom: 12px;
                `}
            >
                12px Normal Text
            </div>
        </div>
    )

}

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
    onSettingChanged
}) => {

    return (
        <React.Fragment>
            <ColorPicker
                initColor={globalPrefs.backgroundColor}
                onColorPicked={color => onSettingChanged({...globalPrefs, backgroundColor: color})}
            >
                <div css={cssColorPickLauncher(globalPrefs.backgroundColor)}>
                    <div css={cssColorPickLauncherText}>
                        Background Color
                    </div>
                </div>
            </ColorPicker>
            <ColorPicker
                initColor={globalPrefs.textColor}
                onColorPicked={color => onSettingChanged({...globalPrefs, textColor: color})}
            >
                <div css={cssColorPickLauncher(globalPrefs.textColor)}>
                    <div css={cssColorPickLauncherText}>
                        Text Color
                    </div>
                </div>
            </ColorPicker>
            <ColorPicker
                initColor={globalPrefs.accentColor}
                onColorPicked={color => onSettingChanged({...globalPrefs, accentColor: color})}
            >
                <div css={cssColorPickLauncher(globalPrefs.accentColor)}>
                    <div css={cssColorPickLauncherText}>
                        Accent Color
                    </div>
                </div>
            </ColorPicker>
            <Checkbox
                checked={globalPrefs.showPredictPage}
                onChange={({ target: { checked } }) => onSettingChanged({...globalPrefs, showPredictPage: checked})}
            >
                Show Predict Page
            </Checkbox>
            <Checkbox
                checked={globalPrefs.showExplainPage}
                onChange={({ target: { checked } }) => onSettingChanged({...globalPrefs, showExplainPage: checked})}
            >
                Show Explain Page
            </Checkbox>
            <Checkbox
                checked={globalPrefs.showActionPage}
                onChange={({ target: { checked } }) => onSettingChanged({...globalPrefs, showActionPage: checked})}
            >
                Show Action Page
            </Checkbox>
        </React.Fragment>
    )

}