import React from 'react';
import { LayoutSetup } from '../../components';
import { Button } from '@tableau/tableau-ui';
import { css } from '@emotion/core';
import { SFDCAuthResponse, PredictionDef } from './types';
import { MappedFields } from '../../store/types';
import { StringsLanguages } from '../../strings';
import { getStringsByLanguageCode } from '../../strings/utils';

const cssConfirmRow = css`
  display: flex;
  flex-direction: row;
  height: 25px;
  justify-content: center;
`;

const cssConfirmCategory = css`
  width: 200px;
  font-weight: bold;
`;

const cssConfirmValue = css`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface ConfirmProps {
  auth: SFDCAuthResponse;
  predictionDef: PredictionDef;
  mappedFields: MappedFields;
  onDone: () => void;
  onBack: () => void;
  language?: StringsLanguages;
}

export const Confirm: React.FC<ConfirmProps> = ({
  auth,
  predictionDef,
  mappedFields,
  onDone,
  onBack,
  language = 'en',
}) => {
  const { messages, components } = getStringsByLanguageCode(
    language
  ).strings.setup.confirm;

  return (
    <LayoutSetup
      header={{
        title: messages.header,
      }}
      navFooter={{
        align: 'right',
        content: (
          <React.Fragment>
            <Button
              kind="primary"
              onClick={onDone}
              css={css`
                margin-right: 20px;
              `}
            >
              {components.buttons.done}
            </Button>
            <Button
              kind="outline"
              onClick={onBack}
              css={css`
                margin-right: 20px;
              `}
            >
              {components.buttons.back}
            </Button>
          </React.Fragment>
        ),
      }}
    >
      <div css={cssConfirmRow}>
        <div css={cssConfirmCategory}>
          {components.labels.salesforceInstance}:
        </div>
        <div css={cssConfirmValue}>{auth.instance_url}</div>
      </div>
      <div css={cssConfirmRow}>
        <div css={cssConfirmCategory}>
          {components.labels.predictionDefinition}:
        </div>
        <div css={cssConfirmValue}>{predictionDef.label}</div>
      </div>
      <div css={cssConfirmRow}>
        <div css={cssConfirmCategory}>{components.labels.fieldMapping}:</div>
        <div css={cssConfirmValue}>
          <div
            css={css`
              margin-bottom: 10px;
            `}
          >
            <strong>
              {components.labels.einsteinParam} &lt;---&gt;{' '}
              {components.labels.tableauParam}
            </strong>
          </div>
          {mappedFields.map((field) => (
            <div key={`${field.einFieldName}<->${field.tabParamName}`}>
              {field.einFieldName} &lt;---&gt; {field.tabParamName}
            </div>
          ))}
        </div>
      </div>
    </LayoutSetup>
  );
};
