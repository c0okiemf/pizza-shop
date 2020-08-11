import React, {Component} from "react";
import {connect} from "react-redux";
import {calculateTotal, currencyGlyph} from "../../helpers/money"
import MiniCartProducts from "./MiniCartProducts";
import {Link} from "react-router-dom"
import styled from "styled-components"
import {fetchUserFromLocalStorage} from "../../helpers/user"
import {MOBILE_WIDTH} from "../../app"

const MiniCartContainer = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-right: 20px;
`

const MiniCartFixed = styled.div`
  border-radius: 20px;
  box-shadow: 0 0 20px black;
  position: fixed;
  width: 280px;
`

const MobileMiniCart = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 15px;
  background: black;
  border-radius: 0 0 0 20px;
  height: 200px;
  place-content: end;
  display: grid;
`

const CartImage = styled.img`
  width: 20px;
  height: 20px;
`

const MobileCartSum = styled.div`
  display: block;
`

const MiniCartSummary = styled.div`
  display: grid;
  grid-template: repeat(3, 33.3333%) / repeat(2, 50%);
`

const MiniCartSummaryRow = styled.div`
  place-self: center;
  padding: 15px 0;
`

const MiniCartSummaryRowAtStart = styled.div`
  place-self: center start;
  padding-left: 20px;
`

const CheckoutLink = styled(Link)`
  display: grid;
  place-items: center;
  background: black;
  border-radius: 0 0 20px 20px;
  width: 100%;
  grid-column: span 2;
  color: white;
  border: 1px solid black;
  transition: .4s;

  &:hover {
    text-decoration: none;
    color: black;
    background: white;
    font-weight: bold;
    transition: .4s;
  }
`

const MobileCheckoutLink = styled(CheckoutLink)`
  grid-gap: 10px;
`

class MiniCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({
            ...this.state,
            windowWidth: window.innerWidth
        });
    };

    calculateTotal = () =>
        calculateTotal(
            this.props.products,
            this.props.deliveryCost,
            this.props.selectedCurrency
        )

    render = () => (<>
        {this.props.products.length > 0 && <>
            {this.state.windowWidth > MOBILE_WIDTH
                ? <MiniCartContainer>
                    <MiniCartFixed>
                        <MiniCartProducts products={this.props.products}
                                          selectedCurrency={this.props.selectedCurrency}
                        />
                        <MiniCartSummary>
                            <MiniCartSummaryRowAtStart>Delivery cost:</MiniCartSummaryRowAtStart>
                            <MiniCartSummaryRow>
                                {this.props.deliveryCost[this.props.selectedCurrency]}&nbsp;
                                {currencyGlyph(this.props.selectedCurrency)}
                            </MiniCartSummaryRow>
                            <MiniCartSummaryRowAtStart>Total:</MiniCartSummaryRowAtStart>
                            <MiniCartSummaryRow>
                                {this.calculateTotal()}&nbsp;
                                {currencyGlyph(this.props.selectedCurrency)}
                            </MiniCartSummaryRow>
                            <CheckoutLink to="/checkout">Checkout</CheckoutLink>
                        </MiniCartSummary>
                    </MiniCartFixed>
                </MiniCartContainer>
                : <MobileMiniCart>
                    <MobileCheckoutLink to="/checkout">
                        <MobileCartSum>
                            {this.calculateTotal()}&nbsp;
                            {currencyGlyph(this.props.selectedCurrency)}
                        </MobileCartSum>
                        <CartImage src="/storage/cart.svg" alt=""/>
                    </MobileCheckoutLink>
                </MobileMiniCart>
            }
        </>}
    </>)

}

const mapStateToProps = state => {
    return {
        products: state.cart.products,
        selectedCurrency: state.cart.selectedCurrency,
        deliveryCost: state.deliveryCost
    }
};

export default connect(mapStateToProps)(MiniCart)
