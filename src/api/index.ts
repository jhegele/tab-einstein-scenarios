import axios from 'axios';
import { 
    APIGetPredictionDefsReq, 
    SFDCPredictionDefsResponse, 
    APIGetModelDefsReq, 
    SFDCModelDefsResponse, 
    APIGetPredictionReq, 
    SFDCPredictionResponse, 
    SDFCResponseError, 
    SFDCAuthRefreshResponse,
    SFDCResponse
} from './types';
import { store } from '../store';
import { authSetAccessToken } from '../store/slices/auth';

const isResponseError = <T>(response: SFDCResponse<T>): response is SDFCResponseError[] => {
    if (!Array.isArray(response)) return false;
    return (response[0] as SDFCResponseError).errorCode !== undefined;
}

const refreshAccessToken = async (refreshToken: string): Promise<SFDCAuthRefreshResponse> => {
    console.log('REFRESHING AUTHENTICATION!')
    const url = `${window.location.origin}/auth/refresh`;
    const { data: updatedAuth } = await axios.post<SFDCResponse<SFDCAuthRefreshResponse>>(url, {
        auth: {
            refreshToken: refreshToken
        }
    })
    if (isResponseError<SFDCAuthRefreshResponse>(updatedAuth)) {
        throw `SFDC error(s) when refreshing authentication: ${updatedAuth}`;
    }
    store.dispatch(authSetAccessToken(updatedAuth.access_token));
    return updatedAuth;
}

export const getPredictionDefs = (req: APIGetPredictionDefsReq) => {
    const url = `${window.location.origin}/api/get-prediction-defs`;
    return axios.post<SFDCPredictionDefsResponse>(url, req);
}

export const getModelDefs = (req: APIGetModelDefsReq) => {
    const url = `${window.location.origin}/api/get-model-defs`;
    return axios.post<SFDCModelDefsResponse>(url, req);
}

export const getPrediction = async (req: APIGetPredictionReq): Promise<SFDCPredictionResponse> => {
    const url = `${window.location.origin}/api/get-prediction`;
    const { data: predictionResponse } = await axios.post<SFDCResponse<SFDCPredictionResponse>>(url, req);
    if (isResponseError<SFDCPredictionResponse>(predictionResponse)) {
        const updatedAuth = await refreshAccessToken(req.auth.refreshToken);
        return await getPrediction({
            ...req,
            auth: {
                ...req.auth,
                accessToken: updatedAuth.access_token
            }
        });
    } else {
        return predictionResponse;
    }
}