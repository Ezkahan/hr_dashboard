import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './common/locales/i18next';
import WebRoutes from './router/WebRoutes';
import { client } from './common/configs/apolloClient';
import '../src/assets/css/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <WebRoutes />
        </BrowserRouter>
      </ApolloProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
