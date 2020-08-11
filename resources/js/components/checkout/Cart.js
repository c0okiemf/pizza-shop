import React, {Component} from "react";
import {connect} from "react-redux";
import {calculateTotal, currencyGlyph} from "../../helpers/money"
import CartProducts from "./CartProducts"
import {Redirect} from "react-router"
import styled from "styled-components"
import {MOBILE_WIDTH} from "../../app"

const SummaryContainer = styled.div`
  display: grid;
  grid-template: repeat(3, 33.3333%) / repeat(2, 50%);
  padding-top: 40px;
  margin-top: 40px;
  border-top: 2px solid #0000008c;
`

export const MainGridElementCentered = styled.div`
  place-self: center;
  padding: 15px 0;
  font-size: 25px;
  font-weight: bold;
  @media screen and (max-width: ${MOBILE_WIDTH}px) {
    & {
      font-size: 13px;
    }
  }
`

export const MainGridElementAtStart = styled(MainGridElementCentered)`
  place-self: center start;
  padding-left: 20px;
`

export const ContinueButton = styled.div`
  grid-column: 2;
  place-self: center;
  font-size: 25px;
  border: 1px solid black;
  border-radius: 50px;
  padding: 10px 25px;
  color: white;
  background: black;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: .4s;

  &:hover {
    color: black;
    background: white;
    font-weight: bold;
    transition: .4s;
  }
`

class Cart extends Component {

    calculateTotal = () =>
        calculateTotal(
            this.props.products,
            this.props.deliveryCost,
            this.props.selectedCurrency
        )

    render = () => (
        <div>
            <CartProducts products={this.props.products} selectedCurrency={this.props.selectedCurrency}/>
            {this.props.products.length > 0
                ? <SummaryContainer>
                    <MainGridElementAtStart>Delivery cost:</MainGridElementAtStart>
                    <MainGridElementCentered>
                        {this.props.deliveryCost[this.props.selectedCurrency]}&nbsp;
                        {currencyGlyph(this.props.selectedCurrency)}
                    </MainGridElementCentered>
                    <MainGridElementAtStart>Total:</MainGridElementAtStart>
                    <MainGridElementCentered>
                        {this.calculateTotal()}&nbsp;
                        {currencyGlyph(this.props.selectedCurrency)}
                    </MainGridElementCentered>
                    <ContinueButton onClick={this.props.confirmCart}>Continue</ContinueButton>
                </SummaryContainer>
                : <Redirect to="/"/>
            }
        </div>
    )

}

const mapStateToProps = state => {
    return {
        products: state.cart.products,
        selectedCurrency: state.cart.selectedCurrency,
        deliveryCost: state.deliveryCost
    }
};

export default connect(mapStateToProps)(Cart)
