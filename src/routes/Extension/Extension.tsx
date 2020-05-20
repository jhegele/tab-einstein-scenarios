import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { extensionSetInitialized } from '../../store/slices/extension';
import { authUpdate } from '../../store/slices/auth';
import { fieldsOverwrite } from '../../store/slices/fields';
import { RootState } from '../../store';
import { ExtensionSettings } from './types';
import { Auth, MappedFields } from '../../store/types';
import { useHistory } from 'react-router-dom';

export const Extension: React.FC = () => {

    const { extensions } = window.tableau;

    const { initialized } = useSelector(
        (state: RootState) => state.extension,
        shallowEqual
    )
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        if (!initialized) {
            extensions.initializeAsync()
                .then(() => {
                    dispatch(extensionSetInitialized(true));
                    const settings: ExtensionSettings = extensions.settings.getAll();
                    if (!settings.auth || !settings.fields) {
                        history.push('/setup');
                    }
                    if (settings.auth) {
                        const auth: Auth = JSON.parse(settings.auth);
                        dispatch(authUpdate(auth));
                    }
                    if (settings.fields) {
                        const fields: MappedFields = JSON.parse(settings.fields);
                        dispatch(fieldsOverwrite(fields))
                    }
                })
        }
    })

    return <div>Extension</div>

}