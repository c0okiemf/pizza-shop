import React, {Component} from "react";
import {connect} from "react-redux";
import {currencyGlyph} from "../../helpers/money";
import styled from "styled-components"
import MiniCartProductControls from "./MiniCartProductControls"

const NamePriceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  place-items: center;
  height: 40px;
`

const ProductContainer = styled.div`
  margin-bottom: 10px;
`

class MiniCartProduct extends Component {

    formatPrice = (price) =>
        price + " " + currencyGlyph(this.props.selectedCurrency)

    calculatePrice = () =>
        this.props.product.price[this.props.selectedCurrency] * this.props.product.quantity

    render = () => (
        <ProductContainer>
            <NamePriceContainer>
                <div>{this.props.product.name}</div>
                <div>{this.formatPrice(this.calculatePrice())}</div>
            </NamePriceContainer>
            <div>
                <MiniCartProductControls product={this.props.product} quantity={this.props.product.quantity} />
            </div>
        </ProductContainer>
    )
}

const mapStateToProps = state => {
    return { selectedCurrency: state.cart.selectedCurrency }
};

export default connect(mapStateToProps)(MiniCartProduct)
