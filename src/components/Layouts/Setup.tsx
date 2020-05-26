import React from 'react';
import { css } from '@emotion/core';

const cssOuterContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
`;

const cssHeaderContainer = css`
    display: flex;
    flex-direction: row;
`;

const cssHeaderLogoContainer = (width?: number, height?: number) => css`
    width: ${width ? width + 'px' : 'unset'};
    height: ${height ? height + 'px': 'unset'};
`;

const cssContentContainer = css`
    flex: 1;
    padding-bottom: 40px;
    margin-top: 20px;
`;

const cssNavContainer = (align: 'left' | 'right') => css`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: ${align === 'right' ? 'flex-end' : 'flex-start'};
    align-items: center;
    background-color: #f5f5f5;
    width: 100%;
`;

const cssVersion = css`
    position: absolute;
    left: 0;
    bottom: 0;
    color: #a0a0a0;
    padding: 12px;
`;

interface SetupLayoutProps {
    navFooter?: {
        align?: 'left' | 'right';
        content: React.ReactNode;
    },
    header?: {
        title: string;
        logo?: {
            url: string;
            widthInPx?: number;
            heightInPx?: number;
        }
    }
}

export const LayoutSetup: React.FC<SetupLayoutProps> = ({ children, navFooter, header }) => {

    return (
        <div css={cssOuterContainer}>
            {header
                ? (
                    <div css={cssHeaderContainer}>
                        {header.logo
                            ? (
                                <div>
                                    <img src={header.logo.url} css={cssHeaderLogoContainer(header.logo.widthInPx, header.logo.heightInPx)} />
                                </div>
                            )
                            : null
                        }
                        <div
                            css={css`
                                flex: 1;
                                font-family: BentonSansMedium, Arial, Helvetica, sans-serif;
                                font-size: 30px;
                                display: flex;
                                align-items: center;
                                padding-left: 20px;
                            `}
                        >
                            {header.title}
                        </div>
                    </div>
                )
                : null
            }
            <div css={cssContentContainer}>
                {children}
            </div>
            {navFooter
                ? (
                    <div css={cssNavContainer(navFooter.align ? navFooter.align : 'right')}>
                        {navFooter.content}
                    </div>
                )
                : null
            }
            <div css={cssVersion}>
                Version {env_APP_VERSION} (ALPHA)
            </div>
        </div>
    )

}