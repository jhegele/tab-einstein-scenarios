export type ExtensionSettings = {
    auth?: string,
    prediction?: string,
    preferences?: string,
}

export type PredictionExplanation = 
    | { type: 'categorical', columnName: string, value: string }
    | { type: 'range', columnName: string, minValue: number, maxValue: number }