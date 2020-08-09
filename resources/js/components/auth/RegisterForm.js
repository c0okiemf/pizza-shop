import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {
    fetchUserFromLocalStorage,
    makeUserStateFromResponse,
    register,
    storeUserInLocalStorage
} from "../../helpers/user";
import {REGISTER_ROUTE} from "../../helpers/routes"
import {addCatch, DEFAULT_ERROR_MESSAGE, notifyError, notifySuccess} from "../../helpers/notifications"

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
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
        addCatch(
            axios.post(REGISTER_ROUTE, userData)
                .then(response => response)
                .then(json => {
                    if (json.data.success) {
                        let userState = makeUserStateFromResponse(json)
                        storeUserInLocalStorage(userState)
                        notifySuccess("You registered successfully.")
                        this.setState({
                            isRegistered: userState.isRegistered,
                            isLoggedIn: userState.isLoggedIn,
                            user: userState.user
                        })
                        location.reload()
                    } else {
                        throw new Error()
                    }
                })
        )
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

    render = () => (
        <div className="container">
            <div className="row">
                <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                    <h2>Create Your Account</h2>
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
