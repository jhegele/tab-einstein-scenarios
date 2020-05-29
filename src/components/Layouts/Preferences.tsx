import React from 'react';
import { css } from '@emotion/core';
import { Button, DropdownSelect } from '@tableau/tableau-ui';
import { Preferences, PreferencesGlobal } from '../../store/types';

const cssOuterContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const cssHeaderContainer = css`
    display: flex;
    flex-direction: row;
    background-color: #d7ecf9;
    color: #2a79af;
    height: 50px;
    line-height: 50px;
`;

const cssHeaderTitleContainer = css`
    padding-left: 20px;
    font-size: 30px;
    font-family: BentonSansMedium, Arial, Helvetica, sans-serif;
    display: flex;
    flex: 1;
`;

const cssHeaderControlsContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;

const cssContentContainer = css`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

const cssControlsContainer = css`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: calc(100% - 20px);
    background-color: #f5f5f5;
    min-width: 200px;
    overflow: auto;
    padding: 10px;
    > div {
        margin-bottom: 15px;
    }
    > input {
        width: 100%;
    }
`;

interface PreferencesLayoutProps {
    onDone: () => void;
    controls: React.ReactNode;
    settingsType: keyof Preferences;
    onSettingsTypeChange: (settingsType: keyof Preferences) => void;
    globalPrefs: PreferencesGlobal;
}

export const PreferencesLayout: React.FC<PreferencesLayoutProps> = ({
    onDone,
    controls,
    settingsType,
    onSettingsTypeChange,
    globalPrefs,
    children
}) => {

    return (
        <div css={cssOuterContainer}>
            <div css={cssHeaderContainer}>
                <div css={cssHeaderTitleContainer}>
                    Configure Preferences
                </div>
                <div css={cssHeaderControlsContainer}>
                    <div
                        css={css`
                            line-height: 12px;
                            margin-right: 20px;
                        `}
                    >
                        <DropdownSelect
                            kind='line'
                            value={settingsType}
                            onChange={({ target: { value }}) => onSettingsTypeChange(value as keyof Preferences)}
                        >
                            <option value='global'>Global</option>
                            <option value='predict'>Predict</option>
                            <option value='explain'>Explain</option>
                        </DropdownSelect>
                    </div>
                    <Button
                        kind='primary'
                        onClick={onDone}
                    >
                        Done
                    </Button>
                </div>
            </div>
            <div css={cssContentContainer}>
                <div
                    css={css`
                        flex: 3;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: ${globalPrefs.backgroundColor};
                        color: ${globalPrefs.textColor}
                    `}
                >
                    { children }
                </div>
                <div css={cssControlsContainer}>
                    {controls}
                </div>
            </div>
        </div>
    )

}