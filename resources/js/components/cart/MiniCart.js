import React, {Component} from "react";
import {connect} from "react-redux";
import {calculateTotal} from "../../helpers/money";
import MiniCartProducts from "./MiniCartProducts";
import {Link} from "react-router-dom"
import styled from "styled-components"


class MiniCart extends Component {

    calculateTotal = () =>
        calculateTotal(
            this.props.products,
            this.props.deliveryCost,
            this.props.selectedCurrency
        )

    render = () => (
        <div>
            <MiniCartProducts products={this.props.products} selectedCurrency={this.props.selectedCurrency} />
            {this.props.products.length > 0 && <>
                <div>Delivery cost: {this.props.deliveryCost[this.props.selectedCurrency]}</div>
                <div>Total: {this.calculateTotal()}</div>
            </>}
            <Link to="/checkout">Checkout</Link>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        products: state.cart.products,
        selectedCurrency: state.cart.selectedCurrency,
        deliveryCost: state.deliveryCost
    }
};

export default connect(mapStateToProps)(MiniCart)
