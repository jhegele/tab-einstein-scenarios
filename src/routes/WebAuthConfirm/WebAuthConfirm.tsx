import React from 'react';
import { css } from '@emotion/core';

const cssOuterContainer = css`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const cssContent = css`
    background-color: #f5f5f5;
    border: 1px solid #4f4f4f;
    width: 600px;
    padding: 20px;
`;

export const WebAuthConfirm: React.FC = () => {

    return (
        <div css={cssOuterContainer}>
            <div css={cssContent}>
                <div
                    css={css`
                        font-size: 20px;
                        font-family: BentonSansMedium, Arial, Helvetica, sans-serif;
                    `}
                >
                    Authentication Complete!
                </div>
                <div
                    css={css`
                        margin-top: 20px;
                    `}
                >
                    You can close this window and return to Tableau now. Or you can keep it open but I promise,
                    you won't miss anything here. There's no post-credits scene or anything.
                </div>
            </div>
        </div>
    )

}