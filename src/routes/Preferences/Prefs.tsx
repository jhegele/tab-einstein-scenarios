import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { Preferences, PreferencesTextWeights } from '../../store/types';
import { Loading } from '../../components';
import { TextField, DropdownSelect, Button } from '@tableau/tableau-ui';
import { ColorPicker } from '../../components';

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

const cssExampleOuterContainer = css`
    flex: 3;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 350px;
    min-height: 350px;
`;

const cssExampleContainer = (prefs: Preferences) => css`
    min-width: 300px;
    min-height: 300px;
    display: flex;
    background-color: ${prefs.uiColors.background};
    color: ${prefs.textPrimary.color};
    font-size: ${prefs.textPrimary.sizeInPx}px;
    font-weight: ${prefs.textPrimary.weight};
    border: 1px solid black;
    justify-content: center;
    align-items: center;
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

export const Prefs: React.FC = () => {

    const { extensions } = window.tableau;

    const [ prefs, setPrefs ] = useState<Preferences>();
    const [ sampleText, setSampleText ] = useState<string>('0.5');

    useEffect(() => {
        extensions.initializeDialogAsync()
            .then(initPrefs => {
                setPrefs(JSON.parse(initPrefs))
            })
    }, [])

    const handleDone = () => {
        extensions.ui.closeDialog(JSON.stringify(prefs));
    }

    if (!prefs) return <Loading />

    return (
        <div css={cssOuterContainer}>
            <div css={cssHeaderContainer}>
                <div css={cssHeaderTitleContainer}>
                    Configure Preferences
                </div>
                <div css={cssHeaderControlsContainer}>
                    <Button
                        kind='primary'
                        onClick={handleDone}
                    >
                        Done
                    </Button>
                </div>
            </div>
            <div css={cssContentContainer}>
                <div css={cssExampleOuterContainer}>
                    <div css={cssExampleContainer(prefs)}>
                        {prefs.textPrimary.prefix}{sampleText}{prefs.textPrimary.suffix}
                    </div>
                </div>
                <div css={cssControlsContainer}>
                    <TextField
                        kind='line'
                        label='Sample Text'
                        value={sampleText}
                        onChange={({ target: { value } }) => setSampleText(value)}
                        css={css`
                            width: 100%;
                        `}
                    />
                    <ColorPicker
                        initColor={prefs.uiColors.background}
                        onColorPicked={color => setPrefs((curr) => ({...curr!, uiColors: { ...curr!.uiColors, background: color}}))}
                    >
                        <div css={cssColorPickLauncher(prefs.uiColors.background)}>
                            <div css={cssColorPickLauncherText}>
                                Background Color
                            </div>
                        </div>
                    </ColorPicker>
                    <ColorPicker
                        initColor={prefs.textPrimary.color}
                        onColorPicked={color => setPrefs((curr) => ({...curr!, textPrimary: { ...curr!.textPrimary, color: color}}))}
                    >
                        <div css={cssColorPickLauncher(prefs.textPrimary.color)}>
                            <div css={cssColorPickLauncherText}>
                                Text Color
                            </div>
                        </div>
                    </ColorPicker>
                    <TextField
                        kind='line'
                        label='Text Size (pixels)'
                        value={prefs.textPrimary.sizeInPx.toString()}
                        onChange={({ target: { value }}) => setPrefs((curr) => ({...curr!, textPrimary: { ...curr!.textPrimary, sizeInPx: parseInt(value)}}))}
                    />
                    <DropdownSelect
                        kind='line'
                        value={prefs.textPrimary.weight}
                        onChange={({ target: { value }}) => setPrefs((curr) => ({...curr!, textPrimary: { ...curr!.textPrimary, weight: (value as PreferencesTextWeights) }}))}
                        label='Text Weight'
                    >
                        <option value='bold'>Bold</option>
                        <option value='normal'>Normal</option>
                    </DropdownSelect>
                    <TextField
                        kind='line'
                        label='Prefix'
                        value={prefs.textPrimary.prefix || ''}
                        onChange={({ target: { value }}) => setPrefs((curr) => ({...curr!, textPrimary: { ...curr!.textPrimary, prefix: value }}))}
                    />
                    <TextField
                        kind='line'
                        label='Suffix'
                        value={prefs.textPrimary.suffix || ''}
                        onChange={({ target: { value }}) => setPrefs((curr) => ({...curr!, textPrimary: { ...curr!.textPrimary, suffix: value }}))}
                    />    
                </div>
            </div>
        </div>
    )

}