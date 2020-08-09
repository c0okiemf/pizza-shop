import React, {Component} from "react"
import OrderAddress from "./OrderAddress"
import OrderCart from "./OrderCart"
import {currencyGlyph} from "../../helpers/money"


class Order extends Component {

    renderDeliveryCost = () =>
        this.props.order.cart.delivery_cost + " " + currencyGlyph(this.props.order.cart.currency_code)

    renderTotal = () =>
        (this.calculateProductTotal() + this.props.order.cart.delivery_cost)
        + " "
        + currencyGlyph(this.props.order.cart.currency_code)

    calculateProductTotal = () =>
        this.props.order.cart.pizzas.reduce(
            (total, pizza) =>
                total + pizza.cart.price * pizza.cart.quantity
            , 0)

    render = () => (
        <div>
            <OrderAddress address={this.props.order.address} />
            <OrderCart cart={this.props.order.cart} />
            <div>Delivery cost: {this.renderDeliveryCost()}</div>
            <div>Total: {this.renderTotal()}</div>
        </div>
    )

}

export default Order
