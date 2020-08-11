import React, {Component} from "react";
import {connect} from "react-redux";
import {currencyGlyph} from "../../helpers/money";
import {commaSeparateIngredients} from "../../helpers/products";
import ProductControls from "../ProductControls";
import {ProductCard, ProductDescription, ProductImage, ProductIngredients, ProductName, ProductPrice} from "../Product"
import styled from "styled-components"

const CartProductWrap = styled.div`
  height: 100%;
`

class CartProduct extends Component {

    formatPrice = (price) =>
        price + " " + currencyGlyph(this.props.selectedCurrency)

    calculatePrice = () =>
        this.props.product.price[this.props.selectedCurrency] * this.props.product.quantity

    render = () => (
        <ProductCard>
            <ProductImage width="200px" src={this.props.product.image_url} alt=""/>
            <ProductName>{this.props.product.name}</ProductName>
            <ProductIngredients>
                {commaSeparateIngredients(this.props.product.ingredients)}
            </ProductIngredients>
            <ProductDescription>{this.props.product.description}</ProductDescription>
            <ProductPrice>{this.formatPrice(this.calculatePrice())}</ProductPrice>
            <CartProductWrap>
                <ProductControls product={this.props.product} quantity={this.props.product.quantity} />
            </CartProductWrap>
        </ProductCard>
    )
}

const mapStateToProps = state => {
    return { selectedCurrency: state.cart.selectedCurrency }
};

export default connect(mapStateToProps)(CartProduct)
