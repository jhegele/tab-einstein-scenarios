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
import merge from 'lodash/merge'

export const Extension: React.FC = () => {

    const { extensions } = window.tableau;

    const { auth, preferences, extension: { initialized, setupComplete }, prediction } = useSelector(
        (state: RootState) => state,
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
            const settingsAuth: Auth = JSON.parse(settings.auth!);
            // merge in any new settings that may have been added and use default values
            // to minimize the chance of breaking existing integrations
            merge(auth, settingsAuth,);
            dispatch(authUpdate(auth));
            settingsState.auth = true;
        }
        if (settings.prediction) {
            const settingsPrediction: Prediction = JSON.parse(settings.prediction!);
            merge(prediction, settingsPrediction);
            dispatch(predictionUpdateAll(prediction));
            settingsState.prediction = true;
        }
        if (settings.preferences) {
            const settingsPreferences: Preferences = JSON.parse(settings.preferences);
            merge(preferences, settingsPreferences);
            dispatch(preferencesUpdateAll(preferences));
            settingsState.preferences = true;
        }
        if (settings.auth && settings.prediction) dispatch(extensionSetSetupComplete(true));
        return settingsState;
    }

    const loadPrefsToSettings = async () => {
        extensions.settings.set('preferences', JSON.stringify(preferences));
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