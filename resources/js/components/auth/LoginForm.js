import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import {
    fetchUserAddressesAndStoreThem,
    fetchUserFromLocalStorage,
    makeUserStateFromResponse,
    storeUserInLocalStorage
} from "../../helpers/user"
import {LOGIN_ROUTE} from "../../helpers/routes"
import {addCatch, notifySuccess} from "../../helpers/notifications"
import {EqualColumnsContainer, RowGrid, StyledInput} from "../checkout/Address"
import {StyledH2, StyledQuestion} from "./RegisterForm"
import {ContinueButton} from "../checkout/Cart"

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            user: {
                email: "",
                password: "",
            },
            location: props.location,
        }
    }

    componentDidMount() {
        let newState = fetchUserFromLocalStorage(this.state)
        this.redirectIfLoggedIn(newState.isLoggedIn)
        this.setState(newState)
    }

    redirectIfLoggedIn = (isLoggedIn) => {
        const {prevLocation} = this.state.location.state || {prevLocation: {pathname: "/"}}
        if (isLoggedIn) {
            this.props.history.push(prevLocation)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let userData = this.state.user
        addCatch(
            axios.post(LOGIN_ROUTE, userData)
                .then(response => response)
                .then(json => {
                    if (json.data.success) {
                        let userState = makeUserStateFromResponse(json)
                        storeUserInLocalStorage(userState)
                        fetchUserAddressesAndStoreThem()
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
        <RowGrid>
            <StyledH2>Log In To Your Account</StyledH2>
            <StyledInput
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={this.handleEmail}
            />
            <StyledInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handlePassword}
            />
            <EqualColumnsContainer>
                <StyledQuestion>Don't have an account?
                    <Link to="/register"> Register</Link>
                </StyledQuestion>
                <ContinueButton
                    onClick={this.handleSubmit}
                    disabled={this.state.formSubmitting}
                >
                    Log In
                </ContinueButton>
            </EqualColumnsContainer>
        </RowGrid>
    )
}

export default withRouter(LoginForm)
