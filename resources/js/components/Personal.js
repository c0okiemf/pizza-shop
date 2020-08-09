import React, {Component} from "react"
import {fetchUserFromLocalStorage} from "../helpers/user"


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

    componentDidMount(prevProps) {
        let newState = fetchUserFromLocalStorage(this.state)
        this.setState(newState)
    }

    render = () => (
        <table className="table table-striped">
            <tbody>
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
    )

}

export default Personal
