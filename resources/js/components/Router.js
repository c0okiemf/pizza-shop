import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {CSSTransitionGroup} from "react-transition-group"

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
    <CSSTransitionGroup
        transitionName='fade'
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}
    >
        <Switch key={location.pathname} location={location} className="page">
            <Route exact path="/"
                   component={wrapInPage(
                       Menu,
                       {canSwitchCurrency: true, withMiniCart: true}
                       )}
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
    </CSSTransitionGroup>
)

export default Router
