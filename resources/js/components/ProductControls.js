import React, {Component} from "react"
import {connect} from "react-redux"
import {addQuantity, addToCart, removeFromCart, subtractQuantity} from "./actions/actions"
import styled from "styled-components"

const ControlsWrapper = styled.div`
  display: grid;
  text-align: center;
  background: black;
  border-radius: 0 0 20px 20px;
  position: relative;
  color: white;
  user-select: none;
  cursor: pointer;
`

const AddProductButton = styled.div`
  height: 100%;
  padding-top: 6%;
`

const PlusQuantityMinus = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`


class ProductControls extends Component {

    render = () => (
        <ControlsWrapper>
            {this.props.cartProducts.find(cartProduct => this.props.product.id === cartProduct.id) === undefined
                ? <AddProductButton onClick={() => this.props.addToCart(this.props.product)}>
                    Add to cart
                </AddProductButton>
                : <>
                    <PlusQuantityMinus>
                        <div onClick={() => this.props.subtractQuantity(this.props.product.id)}>-</div>
                        <div>{this.props.quantity}</div>
                        <div onClick={() => this.props.addQuantity(this.props.product.id)}>+</div>
                    </PlusQuantityMinus>
                    <div onClick={() => this.props.removeFromCart(this.props.product.id)}>Remove</div>
                </>
            }
        </ControlsWrapper>
    )

}

const mapStateToProps = state => {
    return {
        cartProducts: state.cart.products
    }
};

export default connect(mapStateToProps, {addToCart, subtractQuantity, addQuantity, removeFromCart})(ProductControls)
