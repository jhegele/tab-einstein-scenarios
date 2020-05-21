import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { extensionSetInitialized, extensionSetSetupComplete } from '../../store/slices/extension';
import { authUpdate } from '../../store/slices/auth';
import { RootState } from '../../store';
import { ExtensionSettings } from './types';
import { Auth, Prediction } from '../../store/types';
import { useHistory } from 'react-router-dom';
import { predictionUpdateAll } from '../../store/slices/prediction';
import { Loading } from '../../components';
import { Predict } from './Predict';

export const Extension: React.FC = () => {

    const { extensions } = window.tableau;

    const { initialized, setupComplete } = useSelector(
        (state: RootState) => state.extension,
        shallowEqual
    )
    const dispatch = useDispatch();

    const history = useHistory();

    const syncSettingsWithRedux = (settings: ExtensionSettings): { [key in keyof ExtensionSettings]: boolean } => {
        let settingsState: { [key in keyof ExtensionSettings]: boolean } = {
            auth: false,
            prediction: false
        }
        if (settings.auth) {
            const auth: Auth = JSON.parse(settings.auth!);
            dispatch(authUpdate(auth));
            settingsState.auth = true;
        }
        if (settings.prediction) {
            const prediction: Prediction = JSON.parse(settings.prediction!);
            dispatch(predictionUpdateAll(prediction));
            settingsState.prediction = true;
        }
        if (settings.auth && settings.prediction) dispatch(extensionSetSetupComplete(true));
        return settingsState;
    }

    useEffect(() => {
        if (!initialized) {
            console.log('NOT INITIALIZED');
            extensions.initializeAsync()
                .then(() => {
                    console.log('JUST INITIALIZED')
                    dispatch(extensionSetInitialized(true));
                    const settings: ExtensionSettings = extensions.settings.getAll();
                    const { auth, prediction } = syncSettingsWithRedux(settings)
                    if (!auth || !prediction) history.push('/setup');
                    else console.log('EXTENSION INITIALIZED AND SETTINGS LOADED!');
                })
        } else {
            console.log('PREVIOUSLY INITIALIZED')
            const settings: ExtensionSettings = extensions.settings.getAll();
            const { auth, prediction } = syncSettingsWithRedux(settings);
            if (!auth || !prediction) history.push('/setup');
            else console.log('EXTENSION INITIALIZED AND SETTINGS LOADED!');
        }
    }, []);

    if (!initialized || !setupComplete) return <Loading />

    return <Predict />

}