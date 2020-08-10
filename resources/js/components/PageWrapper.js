import React from "react"
import Footer from "./Footer"
import {fetchUserFromLocalStorage} from "../helpers/user"
import Header from "./Header"
import styled from "styled-components"
import Products from "./Products"
import MiniCart from "./cart/MiniCart"

const Page = styled.div`
  display: grid;
  grid-template: auto 1fr auto / minmax(300px, 1fr) minmax(200px,1000px) minmax(300px, 1fr);
  min-height: 100vh;
  grid-gap: 2vh 2vw;
  @media screen and (max-width: 769px) {
    & {
      grid-template: auto 1fr auto / 1fr minmax(200px,1000px) 1fr;
    }
  }
`

const Container = styled.div`
  grid-column: 2;
`

const MiniCartContainer = styled.div`
  grid-column: 3;
  grid-row: 2;
`

export default function wrapInPage(WrappedComponent, componentProps) {



    return class extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                isLoggedIn: false,
                user: {}
            }
        }

        componentDidMount() {
            let newState = fetchUserFromLocalStorage(this.state)
            this.setState(newState)
        }

        makeHeaderProps = () => {
            return {
                ...componentProps,
                userData: this.state.user,
                userIsLoggedIn: this.state.isLoggedIn
            }
        }

        render = () => (
            <Page>
                <Header {...this.makeHeaderProps()} />
                <Container>
                    <WrappedComponent {...componentProps}/>
                </Container>
                {componentProps.withMiniCart === true &&
                    <MiniCartContainer>
                        <MiniCart/>
                    </MiniCartContainer>
                }
                <Footer/>
            </Page>
        )
    }
}
