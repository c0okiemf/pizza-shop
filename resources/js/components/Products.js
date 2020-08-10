import React, {Component} from "react";
import Product from "./Product";
import styled from "styled-components"

const ProductWrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

class Products extends Component {

    render = () => (
        <ProductWrapper>
            {this.props.products.length > 0 &&
                this.props.products.map((product, i) => (
                    <Product
                        key={i}
                        product={product}
                    />
                ))
            }
        </ProductWrapper>
    )

}

export default Products
