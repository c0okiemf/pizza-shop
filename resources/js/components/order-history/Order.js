import React, {Component} from "react"
import OrderAddress from "./OrderAddress"
import OrderCart from "./OrderCart"
import {currencyGlyph} from "../../helpers/money"
import styled from "styled-components"
import {EqualColumnsContainer, RowGrid} from "../checkout/Address"
import {MainGridElementAtStart, MainGridElementCentered} from "../checkout/Cart"

const OrderContainer = styled.div`
  background: black;
  border-radius: 20px;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 20px 0;
  color: white;
  grid-gap: 1rem;
`

const FullWidthEqualColumnsContainer = styled(EqualColumnsContainer)`
  width: 100%;
`

const ColumnGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  place-self: center;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
`

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
        <OrderContainer>
            <FullWidthEqualColumnsContainer>
                <OrderAddress address={this.props.order.address}/>
                <MainGridElementCentered>{this.props.order.created_at}</MainGridElementCentered>
            </FullWidthEqualColumnsContainer>
            <OrderCart cart={this.props.order.cart}/>
            <ColumnGrid>
                <MainGridElementAtStart>Delivery cost:</MainGridElementAtStart>
                <MainGridElementCentered>{this.renderDeliveryCost()}</MainGridElementCentered>
            </ColumnGrid>
            <ColumnGrid>
                <MainGridElementAtStart>Total:</MainGridElementAtStart>
                <MainGridElementCentered>{this.renderTotal()}</MainGridElementCentered>
            </ColumnGrid>
        </OrderContainer>
    )

}

export default Order
