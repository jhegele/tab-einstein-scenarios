import axios from 'axios';
import { APIGetPredictionDefsReq, SFDCPredictionDefsResponse, APIGetModelDefsReq, SFDCModelDefsResponse } from './types';

export const getPredictionDefs = (req: APIGetPredictionDefsReq) => {
    const url = `${window.location.origin}/api/get-prediction-defs`;
    return axios.post<SFDCPredictionDefsResponse>(url, req);
}

export const getModelDefs = (req: APIGetModelDefsReq) => {
    const url = `${window.location.origin}/api/get-model-defs`;
    return axios.post<SFDCModelDefsResponse>(url, req);
}