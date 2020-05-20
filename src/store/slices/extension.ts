import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Extension } from '../types';

const initExtension: Extension = {
    initialized: false
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
        }
    }
});

export const { extensionSetInitialized } = sliceExtension.actions;

export default sliceExtension.reducer;