import React from 'react';
import { css } from '@emotion/core';
import { Preferences } from '../../store/types';
import { FiSettings } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { preferencesUpdateAll } from '../../store/slices/preferences';

const cssOuterContainer = (bgColor: string) => css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${bgColor};
`;

const cssTextContainer = (sizeInPx: number, color: string, weight: string) => css`
    font-size: ${sizeInPx}px;
    color: ${color};
    font-weight: ${weight};
`;

const cssToolbar = css`
    position: absolute;
    bottom: 0;
    right: 0;
`;

interface LayoutExtensionProps {
    prefs: Preferences;
    showToolbar?: boolean;
}

export const LayoutExtension: React.FC<LayoutExtensionProps> = ({ prefs, showToolbar, children }) => {

    const { extensions: { ui, settings }} = window.tableau;
    const dispatch = useDispatch();

    const handleClickToolbar = () => {
        const url = `${window.location.origin}/prefs`;
        ui.displayDialogAsync(url, JSON.stringify(prefs), { width: 800, height: 600 })
            .then((prefsJson: string) => {
                dispatch(preferencesUpdateAll(JSON.parse(prefsJson)));
                settings.set('preferences', prefsJson);
                settings.saveAsync();
            })
            .catch(err => {
                console.log('A dialog display error occurred. It\'s likely that this is simply the user closing the dialog manually. The reported error is logged below.');
                console.log(err);
            })
    }

    let toolbar: React.ReactNode = null;
    if (showToolbar) {
        toolbar = (
            <div 
                css={cssToolbar}
                onClick={handleClickToolbar}
            >
                <FiSettings
                    css={css`
                        color: #fff;
                        mix-blend-mode: difference;
                        width: 25px;
                        height: 25px;
                        margin: 8px;
                        cursor: pointer;
                    `}
                />
            </div>
        )
    }

    return (
        <React.Fragment>
            <div css={cssOuterContainer(prefs.uiColors.background)}>
                <div css={cssTextContainer(prefs.textPrimary.sizeInPx, prefs.textPrimary.color, prefs.textPrimary.weight)}>
                    {prefs.textPrimary.prefix}{children}{prefs.textPrimary.suffix}
                </div>
            </div>
            {toolbar}
        </React.Fragment>
    )

}