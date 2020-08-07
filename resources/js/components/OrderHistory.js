import React, {Component} from 'react'
import NavBar from "./NavBar";
import Footer from "./Footer";
import {fetchUserFromLocalStorage} from "../helpers/componentHelpers";

class OrderHistory extends Component {

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

    componentDidMount(prevProps) {
        let newState = fetchUserFromLocalStorage(this.state)
        this.setState(newState)
    }

    render = () => (
        <div>
            <span>Whatever normally goes into the user dasboard page; the table below for instance</span> <br/>
            <table className="table table-striped">
                <tbody>
                <tr>
                    <th scope="row ">User Id</th>
                    <td>{this.state.user.id}</td>
                </tr>
                <tr>
                    <th scope="row ">Full Name</th>
                    <td>{this.state.user.name}</td>
                </tr>
                <tr>
                    <th scope="row ">Email</th>
                    <td>{this.state.user.email}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
