import React, {Component} from "react"
import Product from "../Product"
import OrderCartProduct from "./OrderCartProduct"
import styled from "styled-components"

const CartProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));
  grid-gap: 1rem;
  place-self: normal;
  padding: 2rem;
`

class OrderCart extends Component {

    render = () => (
        <CartProductsContainer>
            {this.props.cart.pizzas.length > 0 &&
                this.props.cart.pizzas.map((product, i) => (
                    <OrderCartProduct
                        key={i}
                        product={product}
                        currencyCode={this.props.cart.currency_code}
                    />
                ))
            }
        </CartProductsContainer>
    )

}

export default OrderCart
