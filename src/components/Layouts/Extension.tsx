import React from 'react';
import { css } from '@emotion/core';
import { FiSettings } from 'react-icons/fi';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { preferencesUpdateAll } from '../../store/slices/preferences';
import { RootState } from '../../store';

const cssOuterContainer = (bgColor: string, textColor: string) => css`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: ${bgColor};
    color: ${textColor};
    flex-direction: column;
`;

const cssDisplayMenu = css`
    height: 30px;
    display: flex;
    flex-direction: row;
`;

const cssContent = css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const cssDisplayMenuItem = (pageBorderBottomColor: string, isActive: boolean) => css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    & span {
        position: relative;
        z-index: 1;
        font-family: BentonSansMedium, Arial, Helvetica, sans-serif;
    } 
    &${!isActive ? ':hover span::after' : ' span::after'} {
        content: '';
        position: absolute;
        width: calc(100% + 6px);
        height: 0;
        left: -3px;
        bottom: 0px;
        border-bottom: 6px solid ${pageBorderBottomColor};
        z-index: -1;
    }
`;

const cssToolbar = css`
    position: absolute;
    bottom: 0;
    right: 0;
`;

export interface LayoutExtensionProps {
    showToolbar?: boolean;
    loading?: boolean;
    pages?: {
        name: string,
        onClick: () => void,
        active: boolean
    }[];
}

export const LayoutExtension: React.FC<LayoutExtensionProps> = ({ 
    showToolbar, 
    pages,
    children 
}) => {

    const { extensions: { ui, settings }} = window.tableau;
    const { preferences, extension: { predictionResponse }} = useSelector(
        (state: RootState) => state,
        shallowEqual
    )
    const dispatch = useDispatch();

    const handleClickToolbar = () => {
        const url = `${window.location.origin}/v${env_APP_VERSION}/prefs`;
        const payload = {
            preferences: preferences,
            prediction: predictionResponse
        }
        ui.displayDialogAsync(url, JSON.stringify(payload), { width: 800, height: 600 })
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

    const getPageMenu = (): React.ReactNode => {
        if (!pages || pages.length === 0) return null;
        return (
            <div css={cssDisplayMenu}>
                {pages.map(page => (
                    <div
                        key={`page.name.${page.name}`}
                        css={cssDisplayMenuItem(preferences.global.accentColor, page.active)}
                        onClick={() => page.onClick()}
                    >
                        <span>{page.name}</span>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <React.Fragment>
            <div css={cssOuterContainer(preferences.global.backgroundColor, preferences.global.textColor)}>
                {getPageMenu()}
                <div css={cssContent}>
                    {children}
                </div>
            </div>
            {toolbar}
        </React.Fragment>
    )

}