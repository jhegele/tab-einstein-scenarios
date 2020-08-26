import React, { useEffect, useState } from 'react';
import { Button } from '@tableau/tableau-ui';
import Pusher from 'pusher-js';
import type { SFDCAuthResponse, DashboardParams, SetupPayload } from './types';
import { LayoutSetup } from '../../components';
import { css } from '@emotion/core';
import { v4 as uuid } from 'uuid';

const cssDescription = css`
  width: calc(100% - 40px);
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  padding: 20px;
`;

import sfdcLogo from '../../static/img/sfdc-logo.png';
import { getStringsByLanguageCode } from '../../strings/utils';
import { StringsLanguages } from '../../strings';

const pusher = new Pusher('d3f79d8864d956248414', {
  cluster: 'us2',
  forceTLS: true,
});

const channelId = uuid();

interface AuthenticateProps {
  onAuthenticated: (
    authResponse: SFDCAuthResponse,
    dashboardParams: DashboardParams
  ) => any;
  language?: StringsLanguages;
}

export const Authenticate: React.FC<AuthenticateProps> = ({
  onAuthenticated,
  language = 'en',
}) => {
  const [auth, setAuth] = useState<SFDCAuthResponse>();
  const [params, setParams] = useState<DashboardParams>();

  const { extensions } = window.tableau;
  // const location = useLocation();

  // const urlParams: URLSearchParams = new URLSearchParams(location.search);
  // const language: StringsLanguages =
  //   (urlParams.get('language') as StringsLanguages) || 'en';

  useEffect(() => {
    const channel = pusher.subscribe('sfdc-auth');
    channel.bind(channelId, (authResponse: SFDCAuthResponse) => {
      // TODO: Handle error responses more gracefully. Error response from SFDC
      // should have the form {error: string, error_description: string}
      setAuth(authResponse);
    });
    extensions.initializeDialogAsync().then((initPayloadString: string) => {
      const initPayload: SetupPayload = JSON.parse(initPayloadString);
      setParams(initPayload.params);
    });
  }, []);

  useEffect(() => {
    if (auth && params) {
      onAuthenticated(auth, params);
    }
  }, [auth, params]);

  const getAuthUrl = () => {
    return `${window.location.origin}/auth/${channelId}`;
  };

  const ejectToBrowserForAuth = () => {
    window.open(getAuthUrl(), '_blank');
  };

  const { messages, components } = getStringsByLanguageCode(
    language
  ).strings.setup.authenticate;

  return (
    <LayoutSetup
      header={{
        title: messages.header,
        logo: {
          url: sfdcLogo,
          widthInPx: 75,
        },
      }}
      navFooter={{
        align: 'right',
        content: (
          <Button
            kind="primary"
            onClick={() => ejectToBrowserForAuth()}
            css={css`
              margin-right: 20px;
            `}
          >
            {components.buttons.authenticate}
          </Button>
        ),
      }}
    >
      <div css={cssDescription}>{messages.explanation}</div>
    </LayoutSetup>
  );
};
