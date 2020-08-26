import { DataType } from '@tableau/extensions-api-types/ExternalContract/Namespaces/Tableau';
import { StringsLanguages } from '../../strings';

export type SFDCAuthResponse = {
  access_token: string;
  refresh_token: string;
  signature: string;
  scope: string;
  id_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
};

export type PredictionDef = {
  id: string;
  createdBy: string;
  createdDate: Date;
  label: string;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  url: string;
  modelsUrl: string;
};

export type DashboardParam = {
  name: string;
  dataType: DataType;
};

export type DashboardParams = DashboardParam[];

export type SetupPayload = {
  params: DashboardParams;
};
