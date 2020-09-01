import React, { useEffect, useState } from 'react';
import { PreferencesLayout } from '../../components/Layouts/Preferences';
import { GlobalPrefsContent, GlobalPrefsControls } from './Pages/Global';
import { PredictPrefsContent, PredictPrefsControls } from './Pages/Predict';
import { ExplainPrefsContent, ExplainPrefsControls } from './Pages/Explain';
import { ActionPrefsContent, ActionPrefsControls } from './Pages/Action';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { Preferences } from '../../store/types';
import { SFDCPredictionResponse } from '../../api/types';
import { Loading } from '../../components';

type InitPayload = {
  preferences: Preferences;
  prediction?: SFDCPredictionResponse;
};

export const Prefs: React.FC = () => {
  const { extensions } = window.tableau;

  const [prefs, setPrefs] = useState<Preferences>();
  const [prediction, setPrediction] = useState<SFDCPredictionResponse>();
  const [prefsType, setPrefsType] = useState<keyof Preferences>();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    extensions.initializeDialogAsync().then((initPayload) => {
      const init: InitPayload = JSON.parse(initPayload);
      setPrefs(init.preferences);
      setPrediction(init.prediction);
      setPrefsType('global');
    });
  }, []);

  useEffect(() => {
    if (prefsType) {
      const path = `/prefs${prefsType === 'global' ? '' : '/' + prefsType}`;
      if (path !== location.pathname) history.push(path);
    }
  }, [prefsType]);

  if (!prefs || !prediction || !prefsType) return <Loading />;

  const handleDone = () => {
    extensions.ui.closeDialog(JSON.stringify(prefs));
  };

  const {
    global: globalPrefs,
    predict: predictPrefs,
    explain: explainPrefs,
    action: actionPrefs,
  } = prefs;

  const sharedPropsLayout = {
    onDone: handleDone,
    settingsType: prefsType,
    onSettingsTypeChange: (settingsType: keyof Preferences) =>
      setPrefsType(settingsType),
    globalPrefs: globalPrefs,
  };

  return (
    <Switch>
      <Route path="/prefs" exact>
        <PreferencesLayout
          controls={
            <GlobalPrefsControls
              globalPrefs={globalPrefs}
              onSettingChanged={(newGlobalPrefs) =>
                setPrefs((curr) => ({ ...curr!, global: newGlobalPrefs }))
              }
            />
          }
          {...sharedPropsLayout}
        >
          <GlobalPrefsContent language={globalPrefs.language} />
        </PreferencesLayout>
      </Route>
      <Route path="/prefs/predict">
        <PreferencesLayout
          controls={
            <PredictPrefsControls
              predictPrefs={predictPrefs}
              onSettingChanged={(newPredictPrefs) =>
                setPrefs((curr) => ({ ...curr!, predict: newPredictPrefs }))
              }
              language={globalPrefs.language}
            />
          }
          {...sharedPropsLayout}
        >
          <PredictPrefsContent prediction={prediction} prefs={prefs} />
        </PreferencesLayout>
      </Route>
      <Route path="/prefs/explain">
        <PreferencesLayout
          controls={
            <ExplainPrefsControls
              explainPrefs={explainPrefs}
              onSettingChanged={(newPredictPrefs) =>
                setPrefs((curr) => ({ ...curr!, explain: newPredictPrefs }))
              }
              language={globalPrefs.language}
            />
          }
          {...sharedPropsLayout}
        >
          <ExplainPrefsContent prediction={prediction} prefs={prefs} />
        </PreferencesLayout>
      </Route>
      <Route path="/prefs/action">
        <PreferencesLayout
          controls={
            <ActionPrefsControls
              actionPrefs={actionPrefs}
              onSettingChanged={(newActionPrefs) =>
                setPrefs((curr) => ({ ...curr!, action: newActionPrefs }))
              }
              language={globalPrefs.language}
            />
          }
          {...sharedPropsLayout}
        >
          <ActionPrefsContent prediction={prediction} prefs={prefs} />
        </PreferencesLayout>
      </Route>
    </Switch>
  );
};
