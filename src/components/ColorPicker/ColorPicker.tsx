import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import { ChromePicker } from 'react-color';
import { css } from '@emotion/core';

interface ColorPickerProps {
    initColor: string;
    onColorPicked: (newColor: string) => any;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ children, initColor, onColorPicked }) => {

    const [ pickedColor, setPickedColor ] = useState<string>();

    useEffect(() => {
        setPickedColor(initColor);
    }, [])

    const tippyContent: React.ReactElement = (
        <ChromePicker
            color={pickedColor}
            onChangeComplete={color => setPickedColor(color.hex)}
        />
    )

    return (
        <Tippy
            content={tippyContent}
            trigger='click'
            interactive
            onHide={() => onColorPicked(pickedColor || initColor)}
        >
            <div css={css`cursor: pointer;`}>
                {children}
            </div>
        </Tippy>
    )

}