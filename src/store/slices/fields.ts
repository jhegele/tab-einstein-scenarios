import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MappedFields, MappedField } from '../types';

const initFields: MappedFields = [];

const sliceFields = createSlice({
    name: 'fields',
    initialState: initFields,
    reducers: {
        fieldsOverwrite: (state, action: PayloadAction<MappedFields>) => {
            return action.payload;
        },
        fieldsAdd: (state, action: PayloadAction<MappedField>) => {
            state.push(action.payload);
            return state;
        },
        fieldsRemove: (state, action: PayloadAction<{key: keyof MappedField, value: string }>) => {
            const idxRemove = state.map((f: MappedField) => f[action.payload.key]).indexOf(action.payload.value);
            if (idxRemove !== -1) {
                state.splice(idxRemove, 1);
            }
            return state;
        }
    }
})

export const { fieldsOverwrite, fieldsAdd, fieldsRemove } = sliceFields.actions;

export default sliceFields.reducer;