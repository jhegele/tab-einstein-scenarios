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
    setupComplete: boolean
}

export type PreferencesText = {
    sizeInPx: number,
    weight: 'bolder' | 'bold' | 'normal' | 'lighter',
    color: string,
    prefix?: string,
    suffix?: string
}

export type Preferences = {
    showExplanatory: boolean,
    showPrescriptive: boolean,
    backgroundColor: string,
    textPrimary: PreferencesText
}