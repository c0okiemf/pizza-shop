import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import {fetchUserFromLocalStorage, makeAuthorizedHeader} from "../helpers/user"
import appStore from "./reducers/reducer"
import {switchCurrency} from "./actions/actions"
import {connect} from "react-redux"
import {LOGOUT_ROUTE} from "../helpers/routes"
import styled, {keyframes, css} from "styled-components"
import Switch from "react-switch";
import {MOBILE_WIDTH} from "../app"

const HeaderDiv = styled.div`
  padding: 2vh 2vw 4vh 2vw;
  grid-column: 1 / 4;
  display: grid;
  grid-template: auto auto / minmax(0, 1fr) minmax(200px, 700px) minmax(200px, 1fr);
  grid-gap: 2vh 1vw;
  background: black;
  @media screen and (max-width: ${MOBILE_WIDTH}px) {
    & {
      position: fixed;
      z-index: 100;
      padding: 2vh 2vw;
    }
  }
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

const MobileMenuButton = styled.div`
  width: 40px;
  grid-row: 2;
  grid-column: 2;
  place-self: end start;
  margin-left: 20px;
  margin-top: 10px;
`

const expand = keyframes`
  0% {
    transform: scaleY(0);
    transform-origin: top;
  }
  100% {
    transform: scaleY(100%);
    transform-origin: top;
  }
`

const MobileMenuContainer = styled.div`
  position: absolute;
  display: grid;
  grid-gap: 2rem;
  background: black;
  padding: 40px 10px;
  left: 0;
  place-items: center;
  border-radius: 0 0 30px 0;
  animation: ${expand} .2s forwards;
`

const StyledLink = styled(Link)`
  color: white;
  font-weight: bold;
  border-radius: 25px;
  padding: 10px;
  border: 1px solid white;
  background: ${props => props.selected ? "#ffffff6e" : "initial"};
  text-transform: uppercase;
  transition: .4s;
  &:hover {
    text-decoration: none;
    color: black;
    background: white;
    transition: .4s;
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
  top: -21px;
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
  top: 22px;
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
            },
            windowWidth: window.innerWidth,
            mobileMenuOpened: false
        }
    }

    componentDidMount() {
        let newState = fetchUserFromLocalStorage(this.state)
        this.setState(newState)
        window.addEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({
            ...this.state,
            windowWidth: window.innerWidth
        });
    };

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

    renderLinks = () => (<>
            <div>
                <StyledLink to="/"
                            selected={this.linkSelected("/")}
                >
                    Menu
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
        </>
    )

    toggleMenu = () =>
        this.setState({
            ...this.state,
            mobileMenuOpened: !this.state.mobileMenuOpened,
        })

    render = () => (
        <HeaderDiv>
            <ImageWrapper>
                <StyledImage src="/storage/logo.png" alt=""/>
            </ImageWrapper>
            {this.state.windowWidth > MOBILE_WIDTH
                ? <MenuItems>
                    {this.renderLinks()}
                </MenuItems>
                : <MobileMenuButton onClick={this.toggleMenu}>
                    <img src="/storage/menu.svg" alt=""/>
                    {this.state.mobileMenuOpened &&
                        <MobileMenuContainer>
                            {this.renderLinks()}
                        </MobileMenuContainer>
                    }
                </MobileMenuButton>
            }

            {this.props.canSwitchCurrency &&
                <CurrencyLabel>
                    <CurrencyLabelText>currency</CurrencyLabelText>
                    <Switch onChange={this.toggleCurrency} checked={this.props.selectedCurrency === "usd"}
                            onColor={"#000"}
                            offColor={"#000"}
                            uncheckedIcon={currencyEl("€")}
                            checkedIcon={currencyEl("$")}
                            activeBoxShadow="0 0 2px 3px #FFF"
                            handleDiameter={20}
                    />
                </CurrencyLabel>
            }
        </HeaderDiv>
    )
}

export const mapStateToProps = (state) => (
    {
        selectedCurrency: state.cart.selectedCurrency
    }
)


export default withRouter(connect(mapStateToProps, {switchCurrency})(Header))
