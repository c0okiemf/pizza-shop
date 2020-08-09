import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {fetchUserFromLocalStorage, makeAuthorizedHeader} from "../helpers/user"
import appStore from "./reducers/reducer";
import {switchCurrency} from "./actions/actions";
import {connect} from "react-redux";
import {LOGOUT_ROUTE} from "../helpers/routes"

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            isLoggedIn: false,
            location: {
                state: {
                    prevLocation: '/'
                }
            }
        }
    }

    componentDidMount(prevProps) {
        let newState = fetchUserFromLocalStorage(this.state)
        this.setState(newState)
    }

    logOut = () => {
        axios.get(LOGOUT_ROUTE, makeAuthorizedHeader())
            .then(response => response)
            .then(json => {
                let appSate = {
                    isLoggedIn: false,
                    user: {}
                }
                localStorage["appState"] = JSON.stringify(appSate)
                const {prevLocation} = this.state.location.state || {prevLocation: {pathname: '/'}}
                this.props.history.push(prevLocation)
            })
    }

    toggleCurrency = () =>
        appStore.getState().cart.selectedCurrency === "usd"
            ? this.props.switchCurrency("eur")
            : this.props.switchCurrency("usd")

    render = () => (
        <nav>
            <ul>
                <li>
                    <Link to="/">Index</Link>
                </li>
                {this.state.isLoggedIn && <>
                    <li>
                        <Link to="/history">Order History</Link>
                    </li>
                    <li>
                        <Link to="/personal">My account</Link>
                    </li>
                    <li>
                        <a href="#" onClick={this.logOut}>Log Out</a>
                    </li>
                </>}
                {!this.state.isLoggedIn
                && <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </>}
            </ul>
            {this.props.canSwitchCurrency === true &&
                <div onClick={this.toggleCurrency}>Switch currency</div>
            }
        </nav>
    )
}

export default withRouter(connect(null, {switchCurrency})(Header))
