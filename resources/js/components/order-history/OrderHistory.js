import React, {Component} from 'react'
import {fetchUserFromLocalStorage, makeAuthorizedHeader} from "../../helpers/user"
import {addCatch} from "../../helpers/notifications"
import {SHOW_USER_ORDERS_ROUTE} from "../../helpers/routes"
import Orders from "./Orders"

class OrderHistory extends Component {
    _isMounted = false

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: {
                id: '',
                name: '',
                email: ''
            },
            orders: []
        }
    }

    componentDidMount(prevProps) {
        this._isMounted = true
        let newState = fetchUserFromLocalStorage(this.state)
        this.setState(newState)
        this.fetchUserOrders()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    fetchUserOrders = () =>
        addCatch(
            axios.get(SHOW_USER_ORDERS_ROUTE, makeAuthorizedHeader())
                .then(response => response)
                .then(json => {
                    if (this._isMounted) {
                        this.setState({
                            ...this.state,
                            orders: json.data.items
                        })
                    }
                })
        )

    render = () => (
        <div>
            <Orders orders={this.state.orders} />
        </div>
    )
}

export default OrderHistory
