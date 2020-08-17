import { SFDCPredictionResponse } from '../api/types';
import { StringsLanguages } from '../strings';

export type Auth = {
  refreshToken?: string;
  accessToken?: string;
  id?: string;
  idToken?: string;
  instanceUrl?: string;
  issuedAt?: string;
  scope?: string;
  signature?: string;
  tokenType?: string;
};

export type MappedField = {
  tabParamName: string;
  einFieldName: string;
};

export type Prediction = {
  id?: string;
  label?: string;
  mappedFields?: MappedField[];
};

export type MappedFields = MappedField[];

export type Extension = {
  initialized: boolean;
  setupComplete: boolean;
  password: string;
  predictionResponse?: SFDCPredictionResponse;
};

export type PreferencesTextWeight = 'bold' | 'normal';

export type PreferencesTextUnit = 'px' | 'pt' | 'em' | 'rem';

export type PreferencesTextOptions = {
  size: number;
  unit: PreferencesTextUnit;
  weight: PreferencesTextWeight;
};

export type PreferencesGlobal = {
  showPredictPage: boolean;
  showExplainPage: boolean;
  showActionPage: boolean;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  language: StringsLanguages;
};

export type PreferencesPredict = {
  pageName: string;
  text: PreferencesTextOptions;
  numberFormatting: string;
  prefix?: string;
  suffix?: string;
};

export type PreferencesExplain = {
  pageName: string;
  textHeader: PreferencesTextOptions;
  textBody: PreferencesTextOptions;
  arrowUpColor: string;
  arrowDownColor: string;
  valueNumberFormatting: string;
  explanationNumberFormatting: string;
};

export type PreferencesAction = {
  pageName: string;
  textPrimary: PreferencesTextOptions;
  textSecondary: PreferencesTextOptions;
  maxRecommendations?: number;
  primaryNumberFormatting: string;
  secondaryNumberFormatting: string;
};

export type Preferences = {
  global: PreferencesGlobal;
  predict: PreferencesPredict;
  explain: PreferencesExplain;
  action: PreferencesAction;
};
