import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import {
    fetchUserFromLocalStorage,
    login,
    makeUserStateFromResponse,
    storeUserInLocalStorage
} from "../helpers/componentHelpers";

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            error: '',
            formSubmitting: false,
            user: {
                email: '',
                password: '',
            },
            location: props.location,
        }
    }

    componentDidMount(prevProps) {
        let newState = fetchUserFromLocalStorage(this.state)
        const { prevLocation } = this.state.location.state || { prevLocation: { pathname: '/' } }
        if (newState.isLoggedIn) {
            this.props.history.push(prevLocation)
        }
        this.setState(newState)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            formSubmitting: true
        })
        let userData = this.state.user
        login(userData)
            .then(json => {
                if (json.data.success) {
                    let userState = makeUserStateFromResponse(json)
                    storeUserInLocalStorage(userState)
                    this.setState({
                        isRegistered: userState.isRegistered,
                        isLoggedIn: userState.isLoggedIn,
                        user: userState.user,
                        error: ""
                    })
                    location.reload()
                } else {
                    alert(`Our System Failed To Register Your Account!`)
                }
            })
            .catch(error => {
                if (error.response) {
                    let err = error.response.data
                    this.setState({
                        error: err.message,
                        errorMessage: err.errors,
                        formSubmitting: false
                    })
                } else {
                    let err = error.message
                    this.setState({
                        error: {
                            0: err
                        },
                        formSubmitting: false
                    })
                }
            })
            .finally(() =>
                this.setState({error: ''})
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

    stateError = () => {
        const { state = {} } = this.state.location
        const { error } = state
        return error
    }

    render = () => (
        <div className="container">
            <div className="row">
                <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                    <h2 className="text-center mb30">Log In To Your Account</h2>
                    {this.state.isLoggedIn &&
                    <FlashMessage duration={60000} persistOnHover={true}>
                        <h5 className={"alert alert-success"}>Login successful, redirecting...</h5>
                    </FlashMessage>
                    }
                    {this.state.error &&
                    <FlashMessage duration={100000} persistOnHover={true}>
                        <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5>
                    </FlashMessage>
                    }
                    {this.stateError() && !this.state.isLoggedIn &&
                    <FlashMessage duration={100000} persistOnHover={true}>
                        <h5 className={"alert alert-danger"}>Error: {this.stateError()}</h5>
                    </FlashMessage>
                    }
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
