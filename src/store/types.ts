import { SFDCPredictionResponse } from "../api/types";

export type Auth = {
    refreshToken?: string,
    accessToken?: string,
    id?: string,
    idToken?: string,
    instanceUrl?: string,
    issuedAt?: string,
    scope?: string,
    signature?: string,
    tokenType?: string
}

export type MappedField = {
    tabParamName: string,
    einFieldName: string
}

export type Prediction = {
    id?: string,
    label?: string,
    mappedFields?: MappedField[]
}

export type MappedFields = MappedField[];

export type Extension = {
    initialized: boolean,
    setupComplete: boolean,
    predictionResponse?: SFDCPredictionResponse
}

export type PreferencesTextWeight = 
    | 'bold'
    | 'normal'

// export type PreferencesText = {
//     sizeInPx: number,
//     weight: PreferencesTextWeight,
//     color: string,
//     prefix?: string,
//     suffix?: string,
//     numberFormatting: string
// }

// export type PreferencesUiColors = {
//     background: string,
//     spinner: string
// }

export type PreferencesGlobal = {
    showExplainPage: boolean,
    showActionPage: boolean,
    backgroundColor: string,
    textColor: string
}

export type PreferencesPredict = {
    numberFormatting: string,
    textSizeInPx: number,
    textWeight: PreferencesTextWeight,
    prefix?: string,
    suffix?: string
}

export type PreferencesExplain = {
    textHeaderSizeInPx: number,
    textHeaderWeight: PreferencesTextWeight,
    textBodySizeInPx: number,
    textBodyWeight: PreferencesTextWeight,
    arrowUpColor: string,
    arrowDownColor: string,
    valueNumberFormatting: string,
    explanationNumberFormatting: string
}

export type Preferences = {
    global: PreferencesGlobal,
    predict: PreferencesPredict,
    explain: PreferencesExplain
}