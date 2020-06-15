import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Extension } from '../types';
import { SFDCPredictionResponse } from '../../api/types';

const initExtension: Extension = {
    initialized: false,
    setupComplete: false,
    // TODO: Need to add ability to edit setup config and, optionally, password
    // protect those settings.
    password: ''
}

const sliceExtension = createSlice({
    name: 'extension',
    initialState: initExtension,
    reducers: {
        extensionSetInitialized: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                initialized: action.payload
            }
        },
        extensionSetSetupComplete: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                setupComplete: action.payload
            }
        },
        extensionSetPredictionResponse: (state, action: PayloadAction<SFDCPredictionResponse>) => {
            return {
                ...state,
                predictionResponse: action.payload
            }
        }
    }
});

export const { extensionSetInitialized, extensionSetSetupComplete, extensionSetPredictionResponse } = sliceExtension.actions;

export default sliceExtension.reducer;