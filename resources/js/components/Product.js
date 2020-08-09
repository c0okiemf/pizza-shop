import React, {Component} from "react";
import {connect} from "react-redux";
import {currencyGlyph} from "../helpers/money";
import {commaSeparateIngredients} from "../helpers/products";
import {addQuantity, addToCart, removeFromCart, subtractQuantity} from "./actions/actions";
import ProductControls from "./ProductControls";


class Product extends Component {

    formatPrice = (price) =>
        price[this.props.selectedCurrency] + " " + currencyGlyph(this.props.selectedCurrency)

    yankQuantity = () =>
        this.props.cartProducts.reduce((quantity, product) => {
            if (product.id === this.props.product.id) {
                quantity += product.quantity
            }
            return quantity
        }, 0)

    render = () => (
        <div>
            <img width="200px" src={this.props.product.image_url} alt=""/>
            <div>{this.props.product.name}</div>
            <div>{commaSeparateIngredients(this.props.product.ingredients)}</div>
            <div>{this.props.product.description}</div>
            <div>{this.formatPrice(this.props.product.price)}</div>
            <ProductControls product={this.props.product} quantity={this.yankQuantity()} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedCurrency: state.cart.selectedCurrency,
        cartProducts:  state.cart.products
    }
};

export default connect(mapStateToProps)(Product)
