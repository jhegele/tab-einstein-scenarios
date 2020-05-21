import { combineReducers } from '@reduxjs/toolkit';
import auth from './slices/auth';
import extension from './slices/extension';
import prediction from './slices/prediction';
import preferences from './slices/preferences';

const rootReducer = combineReducers({
    auth,
    extension,
    prediction,
    preferences
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;