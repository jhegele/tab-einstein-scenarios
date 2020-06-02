export type APIAuthReq = {
    instanceUrl: string,
    tokenType: string,
    accessToken: string,
    refreshToken: string
}

export type APIPredictionDef = {
    id: string,
    url?: string,
    modelsUrl?: string
}

export type APIGetPredictionDefsReq = {
    auth: APIAuthReq
}

export type APIGetModelDefsReq = {
    auth: APIAuthReq,
    predictionDef: APIPredictionDef
}

export type APIGetPredictionReq = {
    auth: APIAuthReq,
    predictionDef: APIPredictionDef,
    data: {
        columnNames: string[],
        rows: string[][]
    }
}

export type SDFCResponseError = {
    errorCode: string,
    message: string
}

export type SFDCUser = {
    id: string,
    name: string,
    profilePhotoUrl: string
}

export type SFDCPredictionDef = {
    countOfModels: number,
    createdBy: SFDCUser,
    createdDate: string,
    id: string,
    label: string,
    lastModifiedBy: SFDCUser,
    lastModifiedDate: string,
    modelsUrl: string,
    name: string,
    outcome: {
        goal: 'Minimize' | 'Maximize',
        label: string,
        name: string
    },
    status: string,
    url: string
}

export type SFDCModelDef = {
    actionableFields: any[],
    analysis: { id: string },
    createdBy: SFDCUser,
    createdDate: string,
    fieldMap: { [key: string]: string | null },
    filters: any[],
    id: string,
    label: string,
    lastModifiedBy: SFDCUser,
    name: string,
    predictionDefinitionUrl: string,
    sortOrder: number,
    status: string,
    url: string
}

export type SFDCPredictionDefsResponse = {
    predictionDefinitions: SFDCPredictionDef[],
    totalSize: number,
    url: string
}

export type SFDCModelDefsResponse = {
    models: SFDCModelDef[],
    totalSize: string,
    url: string
}

export type SFDCColumn = {
    columnName: string,
    columnValue: string
}

export type SFDCPrescription = {
    value: number,
    columns: SFDCColumn[]
}

export type SFDCPrediction = {
    prediction: {
        baseLine: number,
        importWarnings: {
            mismatchedColumns: string[],
            missingColumns: string[],
            outOfBoundsColumns: SFDCColumn[]
        },
        middleValues: { columns: SFDCColumn[], value: number }[],
        other: number,
        smallTermCount: number,
        total: number;
    },
    prescriptions: SFDCPrescription[],
    status: string
}

export type SFDCPredictionResponse = {
    predictionDefinition: string,
    predictions: SFDCPrediction[],
    settings: {
        maxPrescriptions: number
    }
}

export type SFDCAuthRefreshResponse = {
    access_token: string,
    id: string,
    instance_url: string,
    issued_at: string,
    scope: string,
    signature: string,
    token_type: string
}

export type SFDCResponse<T> = T | SDFCResponseError[]