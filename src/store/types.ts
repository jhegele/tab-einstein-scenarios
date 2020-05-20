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

export type MappedFields = MappedField[];

export type Extension = {
    initialized: boolean
}