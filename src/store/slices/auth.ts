import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth } from '../types';

const initAuth: Auth = {}

const sliceAuth = createSlice({
    name: 'auth',
    initialState: initAuth,
    reducers: {
        authUpdate: (_state, action: PayloadAction<Auth>) => {
            return action.payload;
        },
        authSetRefreshToken: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                refreshToken: action.payload
            }
        },
        authSetAccessToken: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                accessToken: action.payload
            }
        }
    }
});

export const { authUpdate, authSetRefreshToken, authSetAccessToken } = sliceAuth.actions;

export default sliceAuth.reducer;