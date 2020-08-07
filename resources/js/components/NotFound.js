import React, {Component} from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"

class Home extends Component {

    render = () => (
        <div>
            <NavBar userDate={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
            <span>
               Where ya going fam?
            </span>
            <Footer/>
        </div>
    )
}

export default Home
