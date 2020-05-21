import axios from 'axios';
import { APIGetPredictionDefsReq, SFDCPredictionDefsResponse, APIGetModelDefsReq, SFDCModelDefsResponse, APIGetPredictionReq, SFDCPredictionResponse } from './types';

export const getPredictionDefs = (req: APIGetPredictionDefsReq) => {
    const url = `${window.location.origin}/api/get-prediction-defs`;
    return axios.post<SFDCPredictionDefsResponse>(url, req);
}

export const getModelDefs = (req: APIGetModelDefsReq) => {
    const url = `${window.location.origin}/api/get-model-defs`;
    return axios.post<SFDCModelDefsResponse>(url, req);
}

export const getPrediction = (req: APIGetPredictionReq) => {
    const url = `${window.location.origin}/api/get-prediction`;
    return axios.post<SFDCPredictionResponse>(url, req);
}