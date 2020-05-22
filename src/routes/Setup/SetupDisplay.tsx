import React from 'react';
import { css } from '@emotion/core';
import { Button } from '@tableau/tableau-ui';

const cssOuterContainer = css`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`; 

const cssContent = css`
    margin: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
`;

interface SetupDisplayProps {
    isAuthoring?: boolean;
    onOpenSetupDialog: () => void;
}

export const SetupDisplay: React.FC<SetupDisplayProps> = ({ isAuthoring, onOpenSetupDialog }) => {

    let content: React.ReactNode = (
        <div css={cssContent}>
            This extension requires configuration. Please contact the creator/maintainer 
            of this dashboard and ask that they complete the setup process.
        </div>
    )

    if (isAuthoring) content = (
        <div css={cssContent}>
            <div>
                Please complete the setup process in order to start generating predictions
                from Einstein.
            </div>
            <div>
                <Button
                    kind='primary'
                    onClick={onOpenSetupDialog}
                >
                    Open Setup
                </Button>
            </div>
        </div>
    )

    return (
        <div css={cssOuterContainer}>
            {content}
        </div>
    )

}