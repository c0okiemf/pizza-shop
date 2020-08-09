import React from "react"
import Footer from "./Footer"
import {fetchUserFromLocalStorage} from "../helpers/user"
import Header from "./Header"

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
            <div>
                <Header {...this.makeHeaderProps()} />
                <WrappedComponent {...componentProps}/>
                <Footer/>
            </div>
        )
    }
}
