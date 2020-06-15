import React from 'react';
import { css } from '@emotion/core';
import { PreferencesTextOptions, PreferencesTextUnit, PreferencesTextWeight } from '../../store/types';
import { TextField, DropdownSelect } from '@tableau/tableau-ui';

const cssOuterContainer = css`
    display: flex;
    flex-direction: column;
`;

const cssLabelContainer = css`
    display: flex;
    color: #4f4f4f;
    line-height: 21px;
    font-size: 12px;
`;

const cssControlsContainer = css`
    display: flex;
    flex-direction: row;
`;

const cssControlContainer = css`
    display: flex;
    flex: 1;
    align-items: center;
    & :not(:last-child) {
        margin-right: 4px;
    }
`;

export interface TextFormatterProps {
    textOptions: PreferencesTextOptions;
    label?: string,
    onOptionUpdate?: (updatedOptions: PreferencesTextOptions) => void;
}

export const TextFormatter: React.FC<TextFormatterProps> = ({
    textOptions,
    label,
    onOptionUpdate
}) => {

    const handleOptionUpdate = (updatedOpts: PreferencesTextOptions): void => {
        if (onOptionUpdate) {
            onOptionUpdate(updatedOpts);
        }
    }

    return (
        <div css={cssOuterContainer}>
            {label
                ? (
                    <div css={cssLabelContainer}>{label}</div>
                )
                : null
            }
            <div css={cssControlsContainer}>
                <div css={cssControlContainer}>
                    <TextField
                        kind='line'
                        value={textOptions.size}
                        onChange={({ target: { value } }) => handleOptionUpdate({...textOptions, size: parseInt(value) })}
                        css={css`
                            width: 100%;
                            & > * input {
                                width: 100%;
                            }
                        `}
                    />
                </div>
                <div css={cssControlContainer}>
                    <DropdownSelect
                        kind='line'
                        value={textOptions.unit}
                        onChange={({ target: { value } }) => handleOptionUpdate({...textOptions, unit: value as PreferencesTextUnit })}
                        css={css`
                            width: 100%;
                        `}
                    >
                        <option>px</option>
                        <option>pt</option>
                        <option>em</option>
                        <option>rem</option>
                    </DropdownSelect>
                </div>
                <div css={cssControlContainer}>
                    <DropdownSelect
                        kind='line'
                        value={textOptions.weight}
                        onChange={({ target: { value } }) => handleOptionUpdate({...textOptions, weight: value as PreferencesTextWeight })}
                    >
                        <option value='normal'>Normal</option>
                        <option value='bold'>Bold</option>
                    </DropdownSelect>
                </div>
            </div>
        </div>
    )

}