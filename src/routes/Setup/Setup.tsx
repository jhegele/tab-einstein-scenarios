import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Authenticate } from './Authenticate';
import { PredictionDefs } from './PredictionDefs';
import { MapFields } from './MapFields';
import { Confirm } from './Confirm';
import { useLocation, useHistory } from 'react-router-dom';
import { Dashboard } from '@tableau/extensions-api-types';
import {
  DashboardParams,
  DashboardParam,
  SFDCAuthResponse,
  PredictionDef,
  SetupPayload,
} from './types';
import { MappedFields } from '../../store/types';
import { SetupDisplay } from './SetupDisplay';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store';
import { StringsLanguages } from '../../strings';

export const Setup: React.FC = () => {
  const [auth, setAuth] = useState<SFDCAuthResponse>();
  const [params, setParams] = useState<DashboardParams>();
  const [predictionDef, setPredictionDef] = useState<PredictionDef>();
  const [mappedFields, setMappedFields] = useState<MappedFields>();
  const [selectedLanguage, setSelectedLanguage] = useState<StringsLanguages>(
    'en'
  );

  const {
    extensions: { ui, dashboardContent, settings, environment },
  } = window.tableau;
  let dashboard: Dashboard;
  if (dashboardContent) dashboard = dashboardContent.dashboard;
  const location = useLocation();
  const history = useHistory();
  const { preferences } = useSelector(
    (state: RootState) => state,
    shallowEqual
  );

  const urlParams: URLSearchParams = new URLSearchParams(location.search);
  const language: StringsLanguages =
    (urlParams.get('language') as StringsLanguages) || 'en';

  const openSetupDialog = () => {
    const url = `${window.location.origin}/setup/authenticate?language=${preferences.global.language}`;
    dashboard.getParametersAsync().then((params) => {
      const initPayload: SetupPayload = {
        params: params.map(
          (p) =>
            ({
              name: p.name,
              dataType: p.dataType,
            } as DashboardParam)
        ),
      };
      if (initPayload.params.length === 0) {
        const msg =
          'This extension requires that you have at least one Tableau parameter that can be ' +
          'be mapped to a corresponding Einstein model parameter. Your dashboard contains ' +
          'no Tableau parameters. Please create at least one parameter, then try again.';
        alert(msg);
      } else {
        ui.displayDialogAsync(url, JSON.stringify(initPayload), {
          width: 800,
          height: 600,
        })
          .then(() => history.push('/'))
          .catch(() => console.log('Setup manually cancelled by user!'));
      }
    });
  };

  const handleAuthenticated = (
    auth: SFDCAuthResponse,
    params: DashboardParams
  ) => {
    console.log('AUTH: ', auth);
    setAuth(auth);
    setParams(params);
  };

  const handleFieldsMapped = (mappedFields: MappedFields) => {
    setMappedFields(mappedFields);
  };

  const handleSetupDone = () => {
    if (auth && predictionDef && mappedFields && mappedFields.length > 0) {
      const authSettings = {
        refreshToken: auth.refresh_token,
        accessToken: auth.access_token,
        id: auth.id,
        idToken: auth.id_token,
        instanceUrl: auth.instance_url,
        issuedAt: auth.issued_at,
        scope: auth.scope,
        signature: auth.signature,
        tokenType: auth.token_type,
      };
      const predictionSettings = {
        id: predictionDef.id,
        label: predictionDef.label,
        mappedFields: mappedFields,
      };
      settings.set('auth', JSON.stringify(authSettings));
      settings.set('prediction', JSON.stringify(predictionSettings));
      settings
        .saveAsync()
        .then((result) => {
          console.log('SAVED SETTINGS: ', result);
          ui.closeDialog('');
        })
        .catch((error) => console.log('ERROR SAVING SETTINGS: ', error));
    }
  };

  useEffect(() => {
    // Only open setup dialog if we're at the root setup path
    if (location.pathname === '/setup') {
      //   openSetupDialog();
    }
  }, []);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  useEffect(() => {
    if (auth)
      history.push(`/setup/prediction-defs?language=${selectedLanguage}`);
  }, [auth]);

  useEffect(() => {
    if (predictionDef)
      history.push(`/setup/map-fields?language=${selectedLanguage}`);
  }, [predictionDef]);

  useEffect(() => {
    if (mappedFields)
      history.push(`/setup/confirm?language=${selectedLanguage}`);
  }, [mappedFields]);

  // environment does not exist in the dialog context, so make sure
  // it's available before setting the mode
  const mode = environment ? environment.mode : undefined;

  console.log('LANGUAGE: ', selectedLanguage);

  return (
    <Switch>
      <Route path="/setup" exact>
        <SetupDisplay
          isAuthoring={mode === 'authoring'}
          onOpenSetupDialog={openSetupDialog}
        />
      </Route>
      <Route path="/setup/authenticate">
        <Authenticate
          onAuthenticated={handleAuthenticated}
          language={selectedLanguage}
        />
      </Route>
      <Route path="/setup/prediction-defs">
        <PredictionDefs
          auth={auth!}
          onPredictionDefSelected={(def) => setPredictionDef(def)}
          onBack={() =>
            history.push(`/setup/authenticate?language=${selectedLanguage}`)
          }
          language={selectedLanguage}
        />
      </Route>
      <Route path="/setup/map-fields">
        <MapFields
          auth={auth!}
          predictionDef={predictionDef!}
          params={params!}
          onFieldsMapped={handleFieldsMapped}
          onBack={() =>
            history.push(`/setup/prediction-defs?language=${selectedLanguage}`)
          }
          language={selectedLanguage}
        />
      </Route>
      <Route path="/setup/confirm">
        <Confirm
          auth={auth!}
          predictionDef={predictionDef!}
          mappedFields={mappedFields!}
          onDone={handleSetupDone}
          onBack={() =>
            history.push(`/setup/map-fields?language=${selectedLanguage}`)
          }
          language={selectedLanguage}
        />
      </Route>
    </Switch>
  );
};
