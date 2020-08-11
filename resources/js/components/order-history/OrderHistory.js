import React, {Component} from 'react'
import {fetchUserFromLocalStorage, makeAuthorizedHeader} from "../../helpers/user"
import {addCatch} from "../../helpers/notifications"
import {SHOW_USER_ORDERS_ROUTE} from "../../helpers/routes"
import Orders from "./Orders"
import {MainGridElementCentered} from "../checkout/Cart"
import {RowGrid} from "../checkout/Address"

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

    componentDidMount() {
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
        <RowGrid>
            {this.state.orders.length > 0
                ? <Orders orders={this.state.orders} />
                : <MainGridElementCentered>Seems like you haven't made any orders yet...</MainGridElementCentered>
            }
        </RowGrid>
    )
}

export default OrderHistory
