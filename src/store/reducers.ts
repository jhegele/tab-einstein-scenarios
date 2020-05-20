import { combineReducers } from '@reduxjs/toolkit';
import auth from './slices/auth';
import fields from './slices/fields';
import extension from './slices/extension';

const rootReducer = combineReducers({
    auth,
    fields,
    extension
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;