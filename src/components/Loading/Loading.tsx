import React from 'react';
import { css } from '@emotion/core';
import { Spinner } from '@tableau/tableau-ui';

const cssOuterContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Loading: React.FC = () => {

    return (
        <div
            css={cssOuterContainer}
        >
            <Spinner />
        </div>
    )

}