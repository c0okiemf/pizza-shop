import React, {Component} from "react"
import {connect} from "react-redux"
import {addQuantity, addToCart, removeFromCart, subtractQuantity} from "../actions/actions"
import styled from "styled-components"

const ControlsWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`

const PlusQuantityMinus = styled.div`
  padding: 0 30px;
  display: grid;
  grid-template-columns: repeat(3, 33%);

  & * {
    text-align: center;
    border: 1px solid black;
    border-collapse: collapse;
    user-select: none;
  }
`

const MinusControl = styled.div`
  border-radius: 100% 0 0 100%;
  cursor: pointer;
`

const PlusControl = styled.div`
  border-radius: 0 100% 100% 0;
  cursor: pointer;
`

const RemoveProduct = styled.div`
  height: auto;
  width: 20px;
  place-self: center;
  cursor: pointer;
`

class MiniCartProductControls extends Component {

    render = () => (
        <ControlsWrapper>
            <PlusQuantityMinus>
                <MinusControl onClick={() => this.props.subtractQuantity(this.props.product.id)}>-</MinusControl>
                <div>{this.props.quantity}</div>
                <PlusControl onClick={() => this.props.addQuantity(this.props.product.id)}>+</PlusControl>
            </PlusQuantityMinus>
            <RemoveProduct onClick={() => this.props.removeFromCart(this.props.product.id)}>
                <img src="/storage/trash.svg" alt=""/>
            </RemoveProduct>
        </ControlsWrapper>
    )

}

const mapStateToProps = state => {
    return {
        cartProducts: state.cart.products
    }
};

export default connect(mapStateToProps, {addToCart, subtractQuantity, addQuantity, removeFromCart})(MiniCartProductControls)
