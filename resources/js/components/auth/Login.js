import React, {Component} from 'react';
import LoginForm from './LoginForm';
import {withRouter} from "react-router-dom";

class Login extends Component {

    render = () => (
        <div className="content">
            <LoginForm location={this.props.location}/>
        </div>
    )
}

export default withRouter(Login)
