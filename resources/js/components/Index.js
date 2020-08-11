import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Router from './Router'
import {Provider} from "react-redux";
import appStore from "./reducers/reducer";
import DeliveryPriceRequester from "./DeliveryPriceRequester"
import UserAddressesRequester from "./UserAddressesRequester"
import {NotificationContainer} from "react-notifications"

import 'react-notifications/lib/notifications.css';

class Index extends Component {
    render = () => (
        <Provider store={appStore}>
            <DeliveryPriceRequester/>
            <UserAddressesRequester/>
            <BrowserRouter>
                <Route component={Router}/>
            </BrowserRouter>
            <NotificationContainer/>
        </Provider>
    )
}

ReactDOM.render(<Index />, document.getElementById('index'))

