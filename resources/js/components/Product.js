import React, {Component} from "react";
import {connect} from "react-redux";
import {currencyGlyph} from "../helpers/money";
import {commaSeparateIngredients} from "../helpers/products";
import {addQuantity, addToCart, removeFromCart, subtractQuantity} from "./actions/actions";
import ProductControls from "./ProductControls";
import styled from "styled-components"
import {StyledImage} from "./Header"

export const ProductCard = styled.div`
  display: grid;
  grid-template-rows: 40% 10% 10% 15% 10% 15%;
  border-radius: 20px;
  box-shadow: 1px 1px 14px #00000073;
  height: 370px;
`

export const ProductImage = styled(StyledImage)`
  border-radius: 20px 20px 0 0;
`

export const ProductName = styled.div`
  place-self: center;
  font-size: 1.3rem;
  font-weight: bold;
`

export const ProductIngredients = styled.div`
  font-size: 0.7rem;
  place-self: center;
  text-align: center;
  padding: 0 20px;
  color: #00000091;
`

export const ProductDescription = styled.div`
  font-style: italic;
  place-self: center;
  text-align: center;
  padding: 0 20px;
`

export const ProductPrice = styled.div`
  padding-left: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 6px black;
`

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
        <ProductCard>
            <div>
                <ProductImage width="200px" src={this.props.product.image_url} alt=""/>
            </div>
            <ProductName>{this.props.product.name}</ProductName>
            <ProductIngredients>
                {commaSeparateIngredients(this.props.product.ingredients)}
            </ProductIngredients>
            <ProductDescription>{this.props.product.description}</ProductDescription>
            <ProductPrice>{this.formatPrice(this.props.product.price)}</ProductPrice>
            <ProductControls product={this.props.product} quantity={this.yankQuantity()} />
        </ProductCard>
    )
}

const mapStateToProps = state => {
    return {
        selectedCurrency: state.cart.selectedCurrency,
        cartProducts:  state.cart.products
    }
};

export default connect(mapStateToProps)(Product)
