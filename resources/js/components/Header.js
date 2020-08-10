import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import {fetchUserFromLocalStorage, makeAuthorizedHeader} from "../helpers/user"
import appStore from "./reducers/reducer"
import {switchCurrency} from "./actions/actions"
import {connect} from "react-redux"
import {LOGOUT_ROUTE} from "../helpers/routes"
import styled from "styled-components"
import Switch from "react-switch";

const HeaderDiv = styled.div`
  padding: 2vh 2vw 4vh 2vw;
  grid-column: 1 / 4;
  display: grid;
  grid-template: auto auto / minmax(0,1fr) minmax(200px,700px) minmax(200px,700px);
  grid-gap: 2vh 1vw;
  background: black;
`

const ImageWrapper = styled.div`
  grid-column: 2;
`

const MenuItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  grid-row: 2;
  grid-column: 2;
`

const StyledLink = styled(Link)`
  color: white;
  font-weight: bold;
  border-radius: 25px;
  padding: 10px;
  border: 1px solid white;
  background: ${props => props.selected ? "#ffffff6e" : "initial"};
  text-transform: uppercase;
  &:hover {
    text-decoration: none;
    color: black;
    background: white;
  }
`

const CurrencyWrapper = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`

const StyledCurrency = styled.div`
  font-size: 1em;
  color: white;
`

const CurrencyLabelText = styled.label`
  color: white;
  position: absolute;
  top: -17px;
  transform: translateX(-26px);
  text-transform: uppercase;
  font-size: 71%;
  width: auto;
  text-align: center;
  margin: 0;
  left: 28px;
`

const CurrencyLabel = styled.label`
  position: relative;
  place-self: center;
  grid-row: span 2;
  grid-column: 3;
  margin: 0;
  width: auto;
  top: 26px;
  transform: scale(2)
`

export const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const currencyEl = (currency) => (
    <CurrencyWrapper>
        <StyledCurrency>
            {currency}
        </StyledCurrency>
    </CurrencyWrapper>
)

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            isLoggedIn: false,
            location: {
                state: {
                    prevLocation: "/"
                }
            }
        }
    }

    componentDidMount() {
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
                const {prevLocation} = this.state.location.state || {prevLocation: {pathname: "/"}}
                this.props.history.push(prevLocation)
            })
    }

    toggleCurrency = () =>
        appStore.getState().cart.selectedCurrency === "usd"
            ? this.props.switchCurrency("eur")
            : this.props.switchCurrency("usd")

    linkSelected = (path) =>
        this.props.location.pathname === path

    render = () => (
        <HeaderDiv>
            <ImageWrapper>
                <StyledImage src="/storage/logo.png" alt=""/>
            </ImageWrapper>
            <MenuItems>
                <div>
                    <StyledLink to="/"
                                selected={this.linkSelected("/")}
                    >
                        Index
                    </StyledLink>
                </div>
                {this.state.isLoggedIn && <>
                    <div>
                        <StyledLink to="/history"
                                    selected={this.linkSelected("/history")}
                        >
                            Order History
                        </StyledLink>
                    </div>
                    <div>
                        <StyledLink to="/personal"
                                    selected={this.linkSelected("/personal")}
                        >
                            My account
                        </StyledLink>
                    </div>
                    <div>
                        <StyledLink to="#" onClick={this.logOut}>Log Out</StyledLink>
                    </div>
                </>}
                {!this.state.isLoggedIn
                && <>
                    <div>
                        <StyledLink to="/login"
                                    selected={this.linkSelected("/login")}
                        >
                            Login
                        </StyledLink>
                    </div>
                    <div>
                        <StyledLink to="/register"
                                    selected={this.linkSelected("/register")}
                        >
                            Register
                        </StyledLink>
                    </div>
                </>}
            </MenuItems>
            <CurrencyLabel>
                <CurrencyLabelText>currency</CurrencyLabelText>
                <Switch onChange={this.toggleCurrency} checked={this.props.selectedCurrency === "usd"}
                        onColor={"#000"}
                        offColor={"#000"}
                        uncheckedIcon={currencyEl("€")}
                        checkedIcon={currencyEl("$")}
                        activeBoxShadow="0 0 2px 3px #FFF"
                />
            </CurrencyLabel>
        </HeaderDiv>
    )
}

export const mapStateToProps = (state) => (
    {
        selectedCurrency: state.cart.selectedCurrency
    }
)


export default withRouter(connect(mapStateToProps, {switchCurrency})(Header))
