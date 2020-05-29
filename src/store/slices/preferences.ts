import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Preferences, PreferencesGlobal, PreferencesPredict, PreferencesExplain } from '../types';

const initPreferences: Preferences = {
    global: {
        showExplainPage: true,
        showActionPage: true,
        backgroundColor: '#FFFFFF',
        textColor: '#333333'
    },
    predict: {
        textSizeInPx: 24,
        textWeight: 'bold',
        numberFormatting: '0,0.00'
    },
    explain: {
        textHeaderSizeInPx: 14,
        textHeaderWeight: 'bold',
        textBodySizeInPx: 12,
        textBodyWeight: 'normal',
        arrowUpColor: '',
        arrowDownColor: '',
        valueNumberFormatting: '0,0.00',
        explanationNumberFormatting: '0,0.00'
    }
    // showPrescriptive: false,
    // showExplanatory: false,
    // uiColors: {
    //     background: '#fff',
    //     spinner: 'rgb(97, 101, 112)'
    // },
    // textPrimary: {
    //     sizeInPx: 24,
    //     weight: 'bold',
    //     color: '#333',
    //     numberFormatting: '0,0.00'
    // }
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
        }

        // preferencesSetShowPrescriptive: (state, action: PayloadAction<boolean>) => {
        //     return {
        //         ...state,
        //         showPrescriptive: action.payload
        //     }
        // },
        // preferencesSetShowExplanatory: (state, action: PayloadAction<boolean>) => {
        //     return {
        //         ...state,
        //         showExplanatory: action.payload
        //     }
        // },
        // preferencesSetUiColors: (state, action: PayloadAction<PreferencesUiColors>) => {
        //     return {
        //         ...state,
        //         uiColors: action.payload
        //     }
        // },
        // preferencesSetTextPrimary: (state, action: PayloadAction<PreferencesText>) => {
        //     return {
        //         ...state,
        //         textPrimary: action.payload
        //     }
        // }
    }
});

export const { 
    preferencesUpdateAll, 
    preferencesUpdateGlobal,
    preferencesUpdatePredict,
    preferencesUpdateExplain 
} = slicePreferences.actions;

export default slicePreferences.reducer;