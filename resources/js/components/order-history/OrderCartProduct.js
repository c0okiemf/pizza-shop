import React, {Component} from "react";
import {currencyGlyph} from "../../helpers/money";


class OrderCartProduct extends Component {

    renderPrice = () =>
        this.props.product.cart.price * this.props.product.cart.quantity
        + " "
        + currencyGlyph(this.props.currencyCode)

    render = () => (
        <div>
            <div>{this.props.product.name}</div>
            <div>{this.renderPrice()}</div>
            <div>Quantity: {this.props.product.cart.quantity}</div>
        </div>
    )
}

export default OrderCartProduct
