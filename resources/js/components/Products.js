import React, {Component} from "react";
import Product from "./Product";


class Products extends Component {

    render = () => (
        <div>
            {this.props.products.length > 0 &&
                this.props.products.map((product, i) => (
                    <Product
                        key={i}
                        product={product}
                    />
                ))
            }
        </div>
    )

}

export default Products
