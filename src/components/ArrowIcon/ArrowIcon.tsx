import React from 'react';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi'
import { css, SerializedStyles } from '@emotion/core';

const cssArrowStyle = (color: string, width: number, height: number): SerializedStyles => css`
    color: ${color};
    width: ${width}px;
    height: ${height}px;
`;

interface ArrowIconProps {
    variant: 'up' | 'down';
    color: string;
    widthInPx?: number;
    heightInPx?: number;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({
    variant,
    color,
    widthInPx = 25,
    heightInPx = 25
}) => {

    const style = cssArrowStyle(color, widthInPx, heightInPx);

    if (variant === 'up') return (
        <FiArrowUpCircle css={style} />
    )
    return (
        <FiArrowDownCircle css={style} />
    )

}