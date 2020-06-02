import React, { useEffect, useState } from 'react';
import { Button } from '@tableau/tableau-ui';
import Pusher from 'pusher-js';
import type { SFDCAuthResponse, DashboardParams } from './types';
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

const pusher = new Pusher('d3f79d8864d956248414', {
    cluster: 'us2',
    forceTLS: true
});

const channelId = uuid();

interface AuthenticateProps {
    onAuthenticated: (authResponse: SFDCAuthResponse, dashboardParams: DashboardParams) => any;
}

export const Authenticate: React.FC<AuthenticateProps> = ({ onAuthenticated }) => {

    const [ auth, setAuth ] = useState<SFDCAuthResponse>();
    const [ params, setParams ] = useState<DashboardParams>()

    const { extensions } = window.tableau;

    useEffect(() => {
        const channel = pusher.subscribe('sfdc-auth');
        channel.bind(channelId, (authResponse: SFDCAuthResponse) => {
            setAuth(authResponse);
        })
        extensions.initializeDialogAsync()
            .then((initPayloadString: string) => {
                const initPayload: DashboardParams = JSON.parse(initPayloadString);
                setParams(initPayload);
            });
    }, [])

    useEffect(() => {
        if (auth && params) {
            onAuthenticated(auth, params);
        }
    }, [auth, params])

    const ejectToBrowserForAuth = () => {
        window.open(`${window.location.origin}/auth/${channelId}`, '_blank');
    }

    return (
        <LayoutSetup
            header={{
                title: 'Login to Salesforce',
                logo: {
                    url: sfdcLogo,
                    widthInPx: 75
                }
            }}
            navFooter={{
                align: 'right',
                content: (
                    <Button 
                        kind='primary'
                        onClick={() => ejectToBrowserForAuth()}
                        css={css`
                            margin-right: 20px;
                        `}
                    >
                        Authenticate
                    </Button>
                )
            }}
        >
            <div css={cssDescription}>
                In order to setup this extension, you'll need to login to your Salesforce account. After you click the
                Authenticate button below, you'll be taken outside of Tableau and and the Salesforce authentication
                page will open in your default browser. Once you complete authentication, you can return to Tableau
                and continue the setup process.
            </div>
        </LayoutSetup>
    )

}