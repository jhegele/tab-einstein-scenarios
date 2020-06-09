import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { DropdownSelect, Checkbox } from '@tableau/tableau-ui';

const cssOuterContainer = css`
    display: flex;
    flex-direction: column;
`;

const cssLabelContainer = css`
    display: flex;
    color: #4f4f4f;
    line-height: 21px;
    font-size: 12px;
`;

const cssControlsContainer = css`
    display: flex;
    flex-direction: row;
`;

const cssControlContainer = css`
    display: flex;
    flex: 1;
    align-items: center;
    & :not(:last-child) {
        margin-right: 4px;
    }
`;

export interface NumberFormatterProps {
    numberFormat: string;
    label?: string;
    onFormatUpdate: (updatedNumberFormat: string) => void;
}

export const NumberFormatter: React.FC<NumberFormatterProps> = ({
    numberFormat,
    label,
    onFormatUpdate
}) => {

    const [ decimalPlaces, setDecimalPlaces ] = useState<number>();
    const [ useThousandsSeparator, setUseThousandsSeparator ] = useState<boolean>();
    const [ isPercentage, setIsPercentage ] = useState<boolean>();

    const numberFormatToComponents = (fmt: string): { dec: number, thous: boolean, pct: boolean } => {
        const pct = fmt[fmt.length - 1] === '%';
        const thous = fmt.indexOf('0,0') !== -1;
        let dec = 0;
        if (fmt.indexOf('0.0') !== -1) {
            const parts = fmt.split('.');
            dec = parts[1].split('0').length - 1;
        }
        return {
            dec: dec,
            thous: thous,
            pct: pct
        }
    }

    const componentsToNumberFormat = (dec: number, thous: boolean, pct: boolean): string => {
        let fmt = '0';
        if (thous) fmt += ',0';
        if (dec > 0) {
            fmt += '.'
            for (let i = 0; i < dec; i++) fmt += '0';
        }
        if (pct) fmt += '%';
        return fmt;
    }

    useEffect(() => {
        const { dec, thous, pct } = numberFormatToComponents(numberFormat);
        setDecimalPlaces(dec);
        setUseThousandsSeparator(thous);
        setIsPercentage(pct);
    }, [])

    useEffect(() => {
        if (ready()) {
            const updatedFormat = componentsToNumberFormat(decimalPlaces!, useThousandsSeparator!, isPercentage!)
            onFormatUpdate(updatedFormat);
        }
    }, [decimalPlaces, useThousandsSeparator, isPercentage])

    const ready = (): boolean => {
        return decimalPlaces !== undefined && useThousandsSeparator !== undefined && isPercentage !== undefined;
    }

    if (!ready()) return null;

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
                    <DropdownSelect
                        kind='line'
                        value={decimalPlaces}
                        onChange={({ target: { value } }) => setDecimalPlaces(parseInt(value))}
                    >
                        <option value='0'>1</option>
                        <option value='1'>1.0</option>
                        <option value='2'>1.00</option>
                        <option value='3'>1.000</option>
                        <option value='4'>1.0000</option>
                        <option value='5'>1.00000</option>
                        <option value='6'>1.000000</option>
                    </DropdownSelect>
                </div>
                <div css={cssControlContainer}>
                    <Checkbox
                        checked={useThousandsSeparator}
                        onChange={({ target: { checked } }) => setUseThousandsSeparator(checked)}
                    >
                        {useThousandsSeparator ? '1,000' : '1000'}
                    </Checkbox>
                </div>
                <div css={cssControlContainer}>
                    <Checkbox
                        checked={isPercentage}
                        onChange={({ target: { checked } }) => setIsPercentage(checked)}
                    >
                        %
                    </Checkbox>
                </div>
            </div>
        </div>
    )

}