import React, {Component} from "react"
import {connect} from "react-redux";
import Products from "./Products";
import {SHOW_PIZZAS_ROUTE} from "../helpers/routes"
import {CSSTransitionGroup} from "react-transition-group"

class Menu extends Component {
    _isMounted = false

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            selectedCurrency: "usd"
        }
    }

    componentDidMount() {
        this._isMounted = true
        axios.get(SHOW_PIZZAS_ROUTE)
            .then(response => response.data)
            .then(json => {
                if (this._isMounted) {
                    if (json.success) {
                        this.setState({
                            products: json.items
                        })
                    } else {
                        alert("Something went wrong, please come back later")
                    }
                }
            })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render = () => (
        <span>
            <Products products={this.state.products} />
        </span>
    )
}

const mapStateToProps = state => {
    return {
        selectedCurrency: state.cart.selectedCurrency
    }
};

export default connect(mapStateToProps)(Menu)
