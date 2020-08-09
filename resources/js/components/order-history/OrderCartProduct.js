import React, {Component} from "react";
import {connect} from "react-redux";
import {currencyGlyph} from "../../helpers/money";
import {commaSeparateIngredients} from "../../helpers/products";
import {addQuantity, addToCart, removeFromCart, subtractQuantity} from "../actions/actions";
import ProductControls from "../ProductControls";


class OrderCartProduct extends Component {

    renderPrice = () =>
        this.props.product.cart.price + " " + currencyGlyph(this.props.currencyCode)

    render = () => (
        <div>
            <img width="200px" src={this.props.product.image_url} alt=""/>
            <div>{this.props.product.name}</div>
            <div>{commaSeparateIngredients(this.props.product.ingredients)}</div>
            <div>{this.props.product.description}</div>
            <div>{this.renderPrice()}</div>
            <div>Quantity: {this.props.product.cart.quantity}</div>
        </div>
    )
}

export default OrderCartProduct
