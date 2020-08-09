import React, {Component} from "react";
import Product from "../Product";
import MiniCartProduct from "../cart/MiniCartProduct";


class CartProducts extends Component {

    render = () => (
        <div>
            {this.props.products &&
                this.props.products.map((product, i) => (
                    <MiniCartProduct
                        key={i}
                        product={product}
                    />
                ))
            }
        </div>
    )

}

export default CartProducts;
