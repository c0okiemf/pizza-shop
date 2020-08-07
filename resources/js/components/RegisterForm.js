import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import FlashMessage from 'react-flash-message';
import {
    fetchUserFromLocalStorage,
    makeUserStateFromResponse,
    register,
    storeUserInLocalStorage
} from "../helpers/componentHelpers";

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            error: '',
            errorMessage: '',
            formSubmitting: false,
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            location: props.location
        }
    }

    componentDidMount(prevProps) {
        let newState = fetchUserFromLocalStorage(this.state)
        if (newState.isLoggedIn) {
            this.props.history.push("/")
        }
        this.setState(newState)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            formSubmitting: true
        })
        ReactDOM.findDOMNode(this).scrollIntoView()
        let userData = this.state.user
        register(userData)
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
                    alert('Unable to register your account.')
                }
            })
            .catch(error => {
                if (error.response) {
                    let err = error.response.data
                    this.setState({
                        error: {
                            0: err.message
                        },
                        errorMessage: err.errors,
                        formSubmitting: false
                    })
                } else {
                    let err = error.message
                    this.setState({
                        error: {
                            0: err
                        },
                        errorMessage: err,
                        formSubmitting: false
                    })
                }
            })
    }

    handleName = (e) => {
        let val = e.target.value
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                name: val
            }
        }))
    }

    handleEmail = (e) => {
        let val = e.target.value
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: val
            }
        }))
    }

    handlePassword = (e) => {
        let val = e.target.value
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password: val
            }
        }))
    }

    handlePasswordConfirm = (e) => {
        let val = e.target.value
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password_confirmation: val
            }
        }))
    }

    errorMessages = () =>
        Object.values(this.state.errorMessage).reduce((messages, message) => {
            messages.push(message);
            return messages
        }, [])

    render = () => (
        <div className="container">
            <div className="row">
                <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                    <h2>Create Your Account</h2>
                    {this.state.isRegistered &&
                    <FlashMessage duration={60000} persistOnHover={true}>
                        <h5 className={"alert alert-success"}>You registered successfully...</h5>
                    </FlashMessage>
                    }
                    {this.state.error &&
                    <FlashMessage duration={900000} persistOnHover={true}>
                        <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5>
                        <ul>
                            {
                                this.errorMessages().map((item, i) => (
                                    <li key={i}><h5 style={{color: 'red'}}>{item}</h5></li>
                                ))
                            }
                        </ul>
                    </FlashMessage>
                    }
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                id="name"
                                type="text"
                                placeholder="Name"
                                className="form-control"
                                required
                                onChange={this.handleName}
                            />
                        </div>
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
                        <div className="form-group">
                            <input
                                id="password_confirm"
                                type="password"
                                name="password_confirm"
                                placeholder="Confirm Password"
                                className="form-control"
                                required
                                onChange={this.handlePasswordConfirm}
                            />
                        </div>
                        <button type="submit" name="singlebutton" className="btn btn-default btn-lg  btn-block mb10"
                                disabled={this.state.formSubmitting ? "disabled" : ""}>Create Account
                        </button>
                    </form>
                    <p className="text-white">Already have an account?
                        <Link to="/login" className="text-yellow"> Log In</Link>
                        <span className="pull-right">
                                <Link to="/" className="text-white">Back to Home</Link>
                            </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(RegisterForm);
