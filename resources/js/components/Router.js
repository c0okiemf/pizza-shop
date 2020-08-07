import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute'
import Home from "./Home";
import Register from "./Register";
import OrderHistory from "./OrderHistory";
import Login from "./Login";
import NotFound from "./NotFound";
import wrapInPage from "./PageWrapper";

const Router = props => (
    <Switch>
        <Route exact path="/"
               component={wrapInPage(Home)}
        />
        <Route path="/login"
               component={wrapInPage(Login)}
        />
        <Route path="/register"
               component={wrapInPage(Register)}
        />

        <PrivateRoute  path="/history"
                       component={wrapInPage(OrderHistory)}
        />

        <Route component={wrapInPage(NotFound)}/>
    </Switch>
)

export default Router
