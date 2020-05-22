import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Preferences, PreferencesText, PreferencesUiColors } from '../types';

const initPreferences: Preferences = {
    showPrescriptive: false,
    showExplanatory: false,
    uiColors: {
        background: '#fff',
        spinner: 'rgb(97, 101, 112)'
    },
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
        preferencesSetUiColors: (state, action: PayloadAction<PreferencesUiColors>) => {
            return {
                ...state,
                uiColors: action.payload
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
    preferencesSetUiColors,
    preferencesSetTextPrimary 
} = slicePreferences.actions;

export default slicePreferences.reducer;