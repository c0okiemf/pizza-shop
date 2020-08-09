import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute'
import Menu from "./Menu";
import Register from "./auth/Register";
import OrderHistory from "./order-history/OrderHistory";
import Login from "./auth/Login";
import NotFound from "./NotFound";
import wrapInPage from "./PageWrapper";
import Checkout from "./checkout/Checkout"
import Personal from "./Personal"

const Router = props => (
    <Switch>
        <Route exact path="/"
               component={wrapInPage(Menu, {canSwitchCurrency: true})}
        />
        <Route path="/login"
               component={wrapInPage(Login)}
        />
        <Route path="/register"
               component={wrapInPage(Register)}
        />
        <Route path="/checkout"
               component={wrapInPage(Checkout)}
        />
        <Route path="/personal"
               component={wrapInPage(Personal)}
        />

        <PrivateRoute  path="/history"
                       component={wrapInPage(OrderHistory)}
        />

        <Route component={wrapInPage(NotFound)}/>
    </Switch>
)

export default Router
