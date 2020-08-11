import React, {Component} from "react"
import {fetchUserFromLocalStorage} from "../helpers/user"
import {EqualColumnsContainer, RowGrid} from "./checkout/Address"
import {CenteredContainer} from "./checkout/Checkout"
import {MainGridElementAtStart, MainGridElementCentered} from "./checkout/Cart"
import styled from "styled-components"

const GridTable = styled(RowGrid)`
  border: 2px solid #00000069;
  border-radius: 30px;
  color: white;
  background: black;
`

class Personal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {
                id: '',
                name: '',
                email: ''
            }
        }
    }

    componentDidMount() {
        let newState = fetchUserFromLocalStorage(this.state)
        this.setState(newState)
    }

    render = () => (
        <CenteredContainer>
            <GridTable>
                <EqualColumnsContainer>
                    <MainGridElementAtStart>Full Name</MainGridElementAtStart>
                    <MainGridElementAtStart>{this.state.user.name}</MainGridElementAtStart>
                </EqualColumnsContainer>
                <EqualColumnsContainer>
                    <MainGridElementAtStart>Email</MainGridElementAtStart>
                    <MainGridElementAtStart>{this.state.user.email}</MainGridElementAtStart>
                </EqualColumnsContainer>
            </GridTable>
        </CenteredContainer>
    )

}

export default Personal
