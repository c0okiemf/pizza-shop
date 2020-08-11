import React,  {Component} from "react"
import Cart from "./Cart"
import Address from "./Address"
import {PLACE_ORDER_ROUTE} from "../../helpers/routes"
import {addCatch} from "../../helpers/notifications"
import {connect} from "react-redux"
import Done from "./Done"
import {emptyCart} from "../actions/actions"
import {isUserLoggedIn, makeAuthorizedHeader} from "../../helpers/user"
import styled from "styled-components"

export const CenteredContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
`

class Checkout extends Component {

    static phases = {
        CART: "CART",
        ADDRESS: "ADDRESS",
        DONE: "DONE"
    }

    constructor(props) {
        super(props);
        this.state = {
            phase: Checkout.phases.CART
        }
    }

    confirmCart = () =>
        this.setState({
            phase: Checkout.phases.ADDRESS
        })

    confirmAddress = (address) => {
        let headers = isUserLoggedIn() ? makeAuthorizedHeader() : {}
        addCatch(
            axios.post(PLACE_ORDER_ROUTE, this.makeOrderData(address), headers)
                .then(response => response)
                .then(json => {
                    if (json.data.success) {
                        this.setState({
                            phase: Checkout.phases.DONE
                        })
                        this.props.emptyCart()

                    } else {
                        throw new Error()
                    }
                })
        )
    }

    makeOrderData = (address) => (
        {
            pizzas: this.makeProductsOrderData(),
            ...address,
            currency: this.props.selectedCurrency
        }
    )

    makeProductsOrderData = () => (
        this.props.products.map(product => (
            {
                id: product.id,
                quantity: product.quantity
            }
        ))
    )

    render = () => (
        <CenteredContainer>
            {this.state.phase === Checkout.phases.CART &&
                <Cart confirmCart={this.confirmCart}/>
            }
            {this.state.phase === Checkout.phases.ADDRESS &&
                <Address confirmAddress={this.confirmAddress}/>
            }
            {this.state.phase === Checkout.phases.DONE &&
                <Done/>
            }
        </CenteredContainer>
    )

}

const mapStateToProps = state => {
    return {
        products: state.cart.products,
        selectedCurrency: state.cart.selectedCurrency,
        deliveryCost: state.deliveryCost
    }
};

export default connect(mapStateToProps, {emptyCart})(Checkout)
