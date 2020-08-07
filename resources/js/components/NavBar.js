import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {fetchUserFromLocalStorage} from "../helpers/componentHelpers";

class NavBar extends Component {

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
        let appSate = {
            isLoggedIn: false,
            user: {}
        }
        localStorage["appState"] = JSON.stringify(appSate)
        this.setState({
            ...this.state,
            ...appSate
        })
        const {prevLocation} = this.state.location.state || {prevLocation: {pathname: '/'}}
        this.props.history.push(prevLocation)
    }

    render = () => (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Index</Link>
                </li>
                {this.state.isLoggedIn && <>
                    <li className="has-sub">
                        <Link to="/history">Order History</Link>
                    </li>
                    <li className="has-sub">
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
        </nav>
    )
}

export default withRouter(NavBar)
