import React, {Component} from "react"
import Order from "./Order"


class Orders extends Component {

    render = () => (
        <div>
            {this.props.orders.length > 0 &&
                this.props.orders.map((order, i) => (
                        <Order key={i} order={order} />
                    )
            )}
        </div>
    )

}

export default Orders
