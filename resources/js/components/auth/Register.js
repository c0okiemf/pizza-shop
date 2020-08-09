import React, {Component} from 'react'
import RegisterForm from "./RegisterForm";
import {withRouter} from "react-router-dom";

class Register extends Component {

    render = () => (
        <div className="content">
            <RegisterForm location={this.props.location} />
        </div>
    )
}

export default withRouter(Register)
