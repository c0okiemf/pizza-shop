import React, {Component} from "react";
import {ProductWrapper} from "../Products"
import CartProduct from "./CartProduct"
import styled from "styled-components"
import {MOBILE_WIDTH} from "../../app"

const CartProductWrapper = styled(ProductWrapper)`
  grid-template-columns: repeat(auto-fit,226px);

  @media screen and (max-width: ${MOBILE_WIDTH}px) {
    & {
      grid-template-columns: repeat(auto-fit,100%);
    }
  }
`

class CartProducts extends Component {

    render = () => (
        <CartProductWrapper>
            {this.props.products &&
                this.props.products.map((product, i) => (
                    <CartProduct
                        key={i}
                        product={product}
                    />
                ))
            }
        </CartProductWrapper>
    )

}

export default CartProducts;
