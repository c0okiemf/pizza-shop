import React, {Component} from "react";
import {connect} from "react-redux";
import {calculateTotal} from "../../helpers/money";
import CartProducts from "./CartProducts"
import {Redirect} from "react-router"



class Cart extends Component {

    calculateTotal = () =>
        calculateTotal(
            this.props.products,
            this.props.deliveryCost,
            this.props.selectedCurrency
        )

    render = () => (
        <div>
            <CartProducts products={this.props.products} selectedCurrency={this.props.selectedCurrency}/>
            {this.props.products.length > 0
                ? <>
                    <div>Delivery cost: {this.props.deliveryCost[this.props.selectedCurrency]}</div>
                    <div>Total: {this.calculateTotal()}</div>
                    <div onClick={this.props.confirmCart}>Continue checkout</div>
                </>
                : <Redirect to="/"/>
            }
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

export default connect(mapStateToProps)(Cart)
