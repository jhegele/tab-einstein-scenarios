export type APIAuthReq = {
    instanceUrl: string,
    tokenType: string,
    accessToken: string
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
    prescriptions: any[],
    status: string
}

export type SFDCPredictionResponse = {
    predictionDefinition: string,
    predictions: SFDCPrediction[],
    settings: {
        maxPrescriptions: number
    }
}