import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import loadable from './jsx/component/Common/loader/loadable';
import pMinDelay from 'p-min-delay';
import Loading from './jsx/component/Common/loader';

import Index from './jsx';
import routes from './utils/Routes';
import VideoUpload from './jsx/page/vendor/video-upload';

// All Page Lazy Import
const Vendor = loadable(() => pMinDelay(import ('./jsx/page/vendor/'), 250), { fallback: <Loading />});
const AllProducts = loadable(() => pMinDelay (import ('./jsx/page/vendor/all-product'), 250), { fallback: <Loading />});
const AllOrders = loadable(() => pMinDelay (import ('./jsx/page/vendor/all-order'), 250), { fallback: <Loading />});
const VendorProfile = loadable(() => pMinDelay (import ('./jsx/page/vendor/vendor-profile'), 250), { fallback: <Loading />});
const AddProducts = loadable(() => pMinDelay(import ('./jsx/page/vendor/add-products'), 250), { fallback: <Loading />});
const VendorSetting = loadable(() => pMinDelay(import ('./jsx/page/vendor/vendor-setting'), 250), { fallback: <Loading />});
const MyAccounts = loadable(() => pMinDelay(import ('./jsx/page/my-account'), 250), { fallback: <Loading />});
const CustomerOrder = loadable(() => pMinDelay(import ('./jsx/page/my-account/customer-order'), 250), { fallback: <Loading />});
const CustomerDownloads = loadable(() => pMinDelay(import ('./jsx/page/my-account/customer-downloads'), 250), { fallback: <Loading />});
const CustomerAddress = loadable(() => pMinDelay(import ('./jsx/page/my-account/customer-address'), 250), { fallback: <Loading />});
const CustomerAccountDetails = loadable(() => pMinDelay(import ('./jsx/page/my-account/customer-account-details'), 250), { fallback: <Loading />});
const AccountEdit = loadable(() => pMinDelay(import ('./jsx/page/vendor/account-edit'), 250), { fallback: <Loading />});
const Error = loadable(() => pMinDelay(import ('./jsx/page/error'), 250), { fallback: <Loading />});
const ScrollToTop = loadable(() => pMinDelay(import ('./jsx/component/Common/ScrollToTop'), 250), { fallback: <Loading />});


const App = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <ProtectedRoute path={routes.home} exact component={Vendor} />
        <ProtectedRoute path={routes.vendorAllProduct} exact component={AllProducts} />
        <ProtectedRoute path={routes.vendorAllOrder} exact component={AllOrders} />
        <ProtectedRoute path={routes.vendorProfile} exact component={VendorProfile} />
        <ProtectedRoute path={routes.vendorAddProducts} exact component={AddProducts} />
        <ProtectedRoute path={routes.vendorSetting} exact component={VendorSetting} />
        <ProtectedRoute path={routes.myAccount} exact component={MyAccounts} />
        <ProtectedRoute path={routes.myAccountCustomerOrder} exact component={CustomerOrder} />
        <ProtectedRoute path={routes.myAccountCustomerDownload} exact component={CustomerDownloads} />
        <ProtectedRoute path={routes.myAccountCustomerAddress} exact component={CustomerAddress} />
        <ProtectedRoute path={routes.myAccountCustomerAccountDetails} exact component={CustomerAccountDetails} />
        <ProtectedRoute path={routes.accountEdit} exact component={VideoUpload} />
        <Index />
        <Route exact component={Error} />
      </Switch>
    </>
  );
}

export default App;