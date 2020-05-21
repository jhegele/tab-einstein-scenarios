import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MappedField, Prediction } from '../types';
import { remove, isEqual } from 'lodash';

const initPrediction: Prediction = {};

const slicePrediction = createSlice({
    name: 'fields',
    initialState: initPrediction,
    reducers: {
        predictionUpdateAll: (_state, action: PayloadAction<Prediction>) => {
            return action.payload;
        },
        predictionUpdateId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
            return state;
        },
        predictionUpdateMappedFields: (state, action: PayloadAction<MappedField[]>) => {
            state.mappedFields = action.payload;
            return state;
        },
        predictionAddMappedField: (state, action: PayloadAction<MappedField>) => {
            if (!state.mappedFields) state.mappedFields = [];
            state.mappedFields.push(action.payload);
            return state;
        },
        predictionRemoveMappedField: (state, action: PayloadAction<MappedField>) => {
            if (!state.mappedFields) return state;
            remove(state.mappedFields, fields => (
                isEqual(fields, action.payload)
            ));
            return state;
        }
    }
})

export const { predictionUpdateAll, predictionUpdateId, predictionUpdateMappedFields, predictionAddMappedField, predictionRemoveMappedField } = slicePrediction.actions;

export default slicePrediction.reducer;