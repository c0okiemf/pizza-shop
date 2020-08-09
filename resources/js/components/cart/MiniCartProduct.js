import React, {Component} from "react";
import {connect} from "react-redux";
import {currencyGlyph} from "../../helpers/money";
import {commaSeparateIngredients} from "../../helpers/products";
import ProductControls from "../ProductControls";


class MiniCartProduct extends Component {

    formatPrice = (price) =>
        price + " " + currencyGlyph(this.props.selectedCurrency)

    calculatePrice = () =>
        this.props.product.price[this.props.selectedCurrency] * this.props.product.quantity

    render = () => (
        <div>
            <img width="200px" src={this.props.product.image_url} alt=""/>
            <div>{this.props.product.name}</div>
            <div>{commaSeparateIngredients(this.props.product.ingredients)}</div>
            <div>{this.props.product.description}</div>
            <div>{this.formatPrice(this.calculatePrice())}</div>
            <div>
                <ProductControls product={this.props.product} quantity={this.props.product.quantity} />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { selectedCurrency: state.cart.selectedCurrency }
};

export default connect(mapStateToProps)(MiniCartProduct)
