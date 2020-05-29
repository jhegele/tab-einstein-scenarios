import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { extensionSetInitialized, extensionSetSetupComplete } from '../../store/slices/extension';
import { authUpdate } from '../../store/slices/auth';
import { RootState } from '../../store';
import { ExtensionSettings } from './types';
import { Auth, Prediction, Preferences } from '../../store/types';
import { useHistory } from 'react-router-dom';
import { predictionUpdateAll } from '../../store/slices/prediction';
import { Loading } from '../../components';
import { Predict } from './Predict';
import { preferencesUpdateAll } from '../../store/slices/preferences';

export const Extension: React.FC = () => {

    const { extensions } = window.tableau;

    const { initialized, setupComplete } = useSelector(
        (state: RootState) => state.extension,
        shallowEqual
    )
    const prefs = useSelector(
        (state: RootState) => state.preferences,
        shallowEqual
    )
    const dispatch = useDispatch();

    const history = useHistory();

    const syncSettingsWithRedux = (settings: ExtensionSettings): { [key in keyof ExtensionSettings]: boolean } => {
        // initialize settings states to false and set to true only if the
        // object exists
        let settingsState: { [key in keyof ExtensionSettings]: boolean } = {
            auth: false,
            prediction: false,
            preferences: false
        }
        // for each object in settings, if it exists, parse it to JSON and load to redux
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
        if (settings.preferences) {
            const preferences: Preferences = JSON.parse(settings.preferences);
            dispatch(preferencesUpdateAll(preferences));
            settingsState.preferences = true;
        }
        if (settings.auth && settings.prediction) dispatch(extensionSetSetupComplete(true));
        return settingsState;
    }

    const loadPrefsToSettings = async () => {
        extensions.settings.set('preferences', JSON.stringify(prefs));
        await extensions.settings.saveAsync()
    }

    const handleLoadSettings = (): void => {
        // get existing settings from extension object and load them to redux
        const settings: ExtensionSettings = extensions.settings.getAll();
        const { auth, prediction } = syncSettingsWithRedux(settings);
        // if we don't already have preferences set, add them using defaults
        if (!settings.preferences) {
            loadPrefsToSettings()
                .then(() => {
                    // the auth or prediction objects don't exist in settings,
                    // we need to send the user through the setup flow
                    if (!auth || !prediction) history.push('/setup');
                    else console.log('EXTENSION INITIALIZED AND SETTINGS LOADED!');
                })
        } else {
            if (!auth || !prediction) history.push('/setup');
            else console.log('EXTENSION INITIALIZED AND SETTINGS LOADED!');
        }
    }

    useEffect(() => {
        // make sure the extension is properly initialized
        if (!initialized) {
            extensions.initializeAsync()
                .then(() => {
                    dispatch(extensionSetInitialized(true));
                    // get existing settings from extension object and load them to redux
                    handleLoadSettings();
                })
        } else {
            handleLoadSettings();
        }
    }, []);

    if (!initialized || !setupComplete) return <Loading />

    return <Predict />

}