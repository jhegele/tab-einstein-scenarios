import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Preferences, PreferencesGlobal, PreferencesPredict, PreferencesExplain, PreferencesAction } from '../types';

const initPreferences: Preferences = {
    global: {
        showPredictPage: true,
        showExplainPage: true,
        showActionPage: true,
        backgroundColor: '#FFFFFF',
        textColor: '#333333',
        accentColor: '#ace5c8'
    },
    predict: {
        pageName: 'Predict',
        text: {
            size: 24,
            unit: 'px',
            weight: 'bold'
        },
        numberFormatting: '0,0.00'
    },
    explain: {
        pageName: 'Explain',
        textHeader: {
            size: 14,
            unit: 'px',
            weight: 'bold'
        },
        textBody: {
            size: 12,
            unit: 'px',
            weight: 'normal'
        },
        arrowUpColor: '#00a370',
        arrowDownColor: '#fb505e',
        valueNumberFormatting: '0,0.00',
        explanationNumberFormatting: '0,0.00'
    },
    action: {
        pageName: 'Action',
        textPrimary: {
            size: 24,
            unit: 'px',
            weight: 'bold'
        },
        textSecondary: {
            size: 12,
            unit: 'px',
            weight: 'normal'
        },
        primaryNumberFormatting: '0,0.00',
        secondaryNumberFormatting: '0,0.00'
    }
}

const slicePreferences = createSlice({
    name: 'preferences',
    initialState: initPreferences,
    reducers: {
        preferencesUpdateAll: (_state, action: PayloadAction<Preferences>) => {
            return action.payload;
        },
        preferencesUpdateGlobal: (state, action: PayloadAction<PreferencesGlobal>) => {
            state.global = action.payload;
            return state;
        },
        preferencesUpdatePredict: (state, action: PayloadAction<PreferencesPredict>) => {
            state.predict = action.payload;
            return state;
        },
        preferencesUpdateExplain: (state, action: PayloadAction<PreferencesExplain>) => {
            state.explain = action.payload;
            return state;
        },
        preferencesUpdateAction: (state, action: PayloadAction<PreferencesAction>) => {
            state.action = action.payload;
            return state;
        }
    }
});

export const { 
    preferencesUpdateAll, 
    preferencesUpdateGlobal,
    preferencesUpdatePredict,
    preferencesUpdateExplain,
    preferencesUpdateAction
} = slicePreferences.actions;

export default slicePreferences.reducer;