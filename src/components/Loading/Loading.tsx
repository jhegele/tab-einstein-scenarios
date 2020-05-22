import React from 'react';
import { css } from '@emotion/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const cssOuterContainer = (bgColor: string) => css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${bgColor};
`;

const cssSpinnerStyle = (color: string) => css`
    #tail { fill: url(#fade) };
    #head { fill: ${color} };
    stop { stop-color: ${color} };
    

    width: 50px;
    height: 50px;

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg)
        }
    }

    animation-name: rotate;
    animation-duration: 0.85s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;

export const Loading: React.FC = () => {

    const { textPrimary, uiColors } = useSelector(
        (state: RootState) => state.preferences
    )

    return (
        <div
            css={cssOuterContainer(uiColors.background)}
        >
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" css={cssSpinnerStyle(textPrimary.color)}>
                <linearGradient id="fade" x2="50" y1="25" y2="25" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopOpacity="0"/>
                    <stop offset=".15" stopOpacity=".04"/>
                    <stop offset=".3" stopOpacity=".16"/>
                    <stop offset=".45" stopOpacity=".36"/>
                    <stop offset=".61" stopOpacity=".64"/>
                    <stop offset=".76"/>
                </linearGradient>
                <path id="head" d="M0 25a25 25 0 1 0 50 0h-3.9a21.1 21.1 0 1 1-42.2 0" />
                <path id="tail" d="M50 25a25 25 0 0 0-50 0h3.9a21.1 21.1 0 1 1 42.2 0" />
            </svg>
        </div>
    )

}