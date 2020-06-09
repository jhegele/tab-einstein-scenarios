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
`;

const cssControlsContainer = css`
    display: flex;
    flex-direction: row;
`;

const cssControlContainer = css`
    display: flex;
    flex: 1;
    align-items: center;
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
                    />
                </div>
                <div css={cssControlContainer}>
                    <DropdownSelect
                        kind='line'
                        value={textOptions.unit}
                        onChange={({ target: { value } }) => handleOptionUpdate({...textOptions, unit: value as PreferencesTextUnit })}
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