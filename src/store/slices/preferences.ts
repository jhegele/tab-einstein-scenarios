import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Preferences, PreferencesText } from '../types';

const initPreferences: Preferences = {
    showPrescriptive: false,
    showExplanatory: false,
    backgroundColor: '#fff',
    textPrimary: {
        sizeInPx: 24,
        weight: 'bold',
        color: '#333'
    }
}

const slicePreferences = createSlice({
    name: 'preferences',
    initialState: initPreferences,
    reducers: {
        preferencesUpdateAll: (_state, action: PayloadAction<Preferences>) => {
            return action.payload;
        },
        preferencesSetShowPrescriptive: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                showPrescriptive: action.payload
            }
        },
        preferencesSetShowExplanatory: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                showExplanatory: action.payload
            }
        },
        preferencesSetBackgroundColor: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                backgroundColor: action.payload
            }
        },
        preferencesSetTextPrimary: (state, action: PayloadAction<PreferencesText>) => {
            return {
                ...state,
                textPrimary: action.payload
            }
        }
    }
});

export const { 
    preferencesUpdateAll, 
    preferencesSetShowPrescriptive, 
    preferencesSetShowExplanatory, 
    preferencesSetBackgroundColor,
    preferencesSetTextPrimary 
} = slicePreferences.actions;

export default slicePreferences.reducer;