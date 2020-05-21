import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Extension } from '../types';

const initExtension: Extension = {
    initialized: false,
    setupComplete: false
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
        }
    }
});

export const { extensionSetInitialized, extensionSetSetupComplete } = sliceExtension.actions;

export default sliceExtension.reducer;