import React, {Component} from "react";
import MiniCartProduct from "./MiniCartProduct";


class MiniCartProducts extends Component {

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

export default MiniCartProducts;
