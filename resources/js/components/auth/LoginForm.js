import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {
    fetchUserFromLocalStorage,
    login,
    makeUserStateFromResponse,
    storeUserInLocalStorage
} from "../../helpers/user";
import {LOGIN_ROUTE} from "../../helpers/routes"
import {addCatch, DEFAULT_ERROR_MESSAGE, notifyError, notifySuccess} from "../../helpers/notifications"

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            formSubmitting: false,
            user: {
                email: '',
                password: '',
            },
            location: props.location,
        }
    }

    componentDidMount() {
        let newState = fetchUserFromLocalStorage(this.state)
        const { prevLocation } = this.state.location.state || { prevLocation: { pathname: '/' } }
        this.redirectIfLoggedIn(newState.isLoggedIn)
        this.setState(newState)
    }

    redirectIfLoggedIn = (isLoggedIn) => {
        const { prevLocation } = this.state.location.state || { prevLocation: { pathname: '/' } }
        if (isLoggedIn) {
            this.props.history.push(prevLocation)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            formSubmitting: true
        })
        let userData = this.state.user
        addCatch(
            axios.post(LOGIN_ROUTE, userData)
                .then(response => response)
                .then(json => {
                    if (json.data.success) {
                        let userState = makeUserStateFromResponse(json)
                        storeUserInLocalStorage(userState)
                        notifySuccess("You logged in successfully.")
                        this.setState({
                            isRegistered: userState.isRegistered,
                            isLoggedIn: userState.isLoggedIn,
                            user: userState.user
                        })
                        this.redirectIfLoggedIn(userState.isLoggedIn)
                    } else {
                        throw new Error()
                    }
                })
        )
    }

    handleEmail = (e) => {
        let value = e.target.value
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: value
            }
        }))
    }

    handlePassword = (e) => {
        let value = e.target.value
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password: value
            }
        }))
    }

    render = () => (
        <div className="container">
            <div className="row">
                <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                    <h2 className="text-center mb30">Log In To Your Account</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                className="form-control"
                                required
                                onChange={this.handleEmail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                required
                                onChange={this.handlePassword}
                            />
                        </div>
                        <button
                            disabled={this.state.formSubmitting}
                            type="submit"
                            name="single-button"
                            className="btn btn-default btn-lg  btn-block mb10"
                        >
                            {this.state.formSubmitting ? "Logging You In..." : "Log In"}
                        </button>
                    </form>
                </div>
                <p className="text-white">Don't have an account?
                    <Link to="/register" className="text-yellow">Register</Link>
                    <span className="pull-right">
                            <Link to="/" className="text-white">Back to Index</Link>
                        </span>
                </p>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);
