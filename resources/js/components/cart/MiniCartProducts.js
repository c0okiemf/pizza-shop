import React, {Component} from "react";
import MiniCartProduct from "./MiniCartProduct";
import styled from "styled-components"

const ProductsContainer = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  grid-row: 2;
`

class MiniCartProducts extends Component {

    render = () => (
        <ProductsContainer>
            {this.props.products &&
                this.props.products.map((product, i) => (
                    <MiniCartProduct
                        key={i}
                        product={product}
                    />
                ))
            }
        </ProductsContainer>
    )

}

export default MiniCartProducts;
