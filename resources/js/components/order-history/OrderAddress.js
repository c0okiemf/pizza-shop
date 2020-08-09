import React, {Component} from "react"


class OrderAddress extends Component {

    renderAddressString = () =>
        this.props.address.zip + " " + this.props.address.street_address + " " + this.props.address.apartment

    render = () => (
        <div>
            {this.renderAddressString()}
        </div>
    )

}

export default OrderAddress
