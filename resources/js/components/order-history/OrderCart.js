import React, {Component} from "react"
import Product from "../Product"
import OrderCartProduct from "./OrderCartProduct"


class OrderCart extends Component {

    renderAddressString = () =>
        this.props.address.zip + " " + this.props.address.street_address + " " + this.props.address.apartment

    render = () => (
        <div>
            {this.props.cart.pizzas.length > 0 &&
                this.props.cart.pizzas.map((product, i) => (
                    <OrderCartProduct
                        key={i}
                        product={product}
                        currencyCode={this.props.cart.currency_code}
                    />
                ))
            }
        </div>
    )

}

export default OrderCart
