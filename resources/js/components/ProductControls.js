import React, {Component} from "react"
import {connect} from "react-redux"
import {addQuantity, addToCart, removeFromCart, subtractQuantity} from "./actions/actions"

class ProductControls extends Component {

    render = () => (
        <div>
            {this.props.cartProducts.find(cartProduct => this.props.product.id === cartProduct.id) === undefined
                ? <div onClick={() => this.props.addToCart(this.props.product)}>
                    Add to cart
                </div>
                : <>
                    <div onClick={() => this.props.subtractQuantity(this.props.product.id)}>-</div>
                    <div>{this.props.quantity}</div>
                    <div onClick={() => this.props.addQuantity(this.props.product.id)}>+</div>
                    <div onClick={() => this.props.removeFromCart(this.props.product.id)}>Remove</div>
                </>
            }
        </div>
    )

}

const mapStateToProps = state => {
    return {
        cartProducts: state.cart.products
    }
};

export default connect(mapStateToProps, {addToCart, subtractQuantity, addQuantity, removeFromCart})(ProductControls)
