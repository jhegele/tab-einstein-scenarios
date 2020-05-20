export type APIAuthReq = {
    instanceUrl: string,
    tokenType: string,
    accessToken: string
}

export type APIPredictionDef = {
    id: string,
    url: string,
    modelsUrl: string
}

export type APIGetPredictionDefsReq = {
    auth: APIAuthReq
}

export type APIGetModelDefsReq = {
    auth: APIAuthReq,
    predictionDef: APIPredictionDef
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