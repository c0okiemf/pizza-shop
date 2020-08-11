import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import ReactDOM from "react-dom"
import {
    fetchUserFromLocalStorage,
    makeUserStateFromResponse,
    storeUserInLocalStorage
} from "../../helpers/user"
import {REGISTER_ROUTE} from "../../helpers/routes"
import {addCatch, DEFAULT_ERROR_MESSAGE, notifyError, notifySuccess} from "../../helpers/notifications"
import {EqualColumnsContainer, RowGrid, StyledInput} from "../checkout/Address"
import {ContinueButton} from "../checkout/Cart"
import styled from "styled-components"

export const StyledH2 = styled.h2`
  text-align: center;
`

export const StyledQuestion = styled.p`
  font-size: 1.5rem;
  grid-row: 1;
  place-self: center start;
`

class RegisterForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isRegistered: false,
            formSubmitting: false,
            user: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            location: props.location
        }
    }

    componentDidMount() {
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
        <RowGrid>
            <StyledH2>Create Your Account</StyledH2>
            <StyledInput
                type="text"
                placeholder="Name"
                onChange={this.handleName}
            />
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
            <StyledInput
                type="password"
                name="password_confirm"
                placeholder="Confirm Password"
                onChange={this.handlePasswordConfirm}
            />
            <EqualColumnsContainer>
                <StyledQuestion>Already have an account?
                    <Link to="/login" className="text-yellow"> Log In</Link>
                </StyledQuestion>
                <ContinueButton onClick={this.handleSubmit}
                                disabled={this.state.formSubmitting ? "disabled" : ""}
                >
                    Register
                </ContinueButton>
            </EqualColumnsContainer>
        </RowGrid>
    )
}

export default withRouter(RegisterForm)
