import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {fetchUserFromLocalStorage} from "../helpers/componentHelpers";

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

        makeNavBarProps = () => {
            return {
                ...componentProps,
                userData: this.state.user,
                userIsLoggedIn: this.state.isLoggedIn
            }
        }

        render = () => (
            <div>
                <NavBar {...this.makeNavBarProps()} />
                <WrappedComponent {...componentProps}/>
                <Footer/>
            </div>
        )
    }
}
