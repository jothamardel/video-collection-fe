import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';


import 'font-awesome/css/font-awesome.min.css'
import MessengerCustomerChat from 'react-messenger-customer-chat';

import App from './App';

import { store, persistor }  from './redux/store.js';
import { Provider } from 'react-redux';
// import store  from './jsx/app/store.js';

// import Custom Css
import "./jsx/assets/css/style.css"
import "./jsx/assets/css/color.css"
import "./jsx/assets/css/responsive.css"
import "./jsx/assets/css/animate.min.css"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MessengerCustomerChat pageId="383273655072064" appId="940218140171982" />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
