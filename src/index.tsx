import './static/js/tableau.extensions.1.latest.min.js';
import * as fonts from './fonts';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/perspective.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Extension, Setup, Prefs, WebAuthConfirm } from './routes';
import { css, Global } from '@emotion/core';
import type { Extensions } from '@tableau/extensions-api-types';

const resets = css`
    @font-face {
        font-family: 'BentonSansBook';
        src: url('${window.location.origin + fonts.BentonSansBook}');
    }

    @font-face {
        font-family: 'BentonSansMedium';
        src: url('${window.location.origin + fonts.BentonSansMedium}');
    }

    @font-face {
        font-family: 'BentonSansSemiDemi';
        src: url('${window.location.origin + fonts.BentonSansSemiDemi}');
    }

    @font-face {
        font-family: 'SalesforceSansRegular';
        src: url('${window.location.origin + fonts.SalesforceSansRegular}');
    }

    html, body {
        padding: 0;
        margin: 0;
        min-height: 100%;
        height: 100%
    }

    #root {
        min-height: 100%;
        height: 100%;
        font-family: BentonSansBook, Arial, Helvetica, sans-serif;
        font-size: 12px;
    }
`;

declare global {
    interface Window { tableau: { extensions: Extensions } }
}

const App: React.FC = () => {

    return (
        <Provider store={store}>
            <Global styles={resets} />
            <Router basename={`v${env_APP_VERSION}`}>
                <Switch>
                    <Route path='/setup'>
                        <Setup />
                    </Route>
                    <Route path='/prefs'>
                        <Prefs />
                    </Route>
                    <Route path='/auth/confirm'>
                        <WebAuthConfirm />
                    </Route>
                    <Route path='/'>
                        <Extension />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    )

}

ReactDOM.render(<App />, document.getElementById('root'));