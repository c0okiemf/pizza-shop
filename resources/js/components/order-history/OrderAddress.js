import React, {Component} from "react"
import {MainGridElementCentered} from "../checkout/Cart"


class OrderAddress extends Component {

    renderAddressString = () =>
        this.props.address.zip + " " + this.props.address.street_address + " " + this.props.address.apartment

    render = () => (
        <MainGridElementCentered>
            {this.renderAddressString()}
        </MainGridElementCentered>
    )

}

export default OrderAddress
