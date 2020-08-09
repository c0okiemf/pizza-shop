import React, {Component} from "react"
import {isUserLoggedIn} from "../../helpers/user"
import Select from "react-select"
import {connect} from "react-redux"
import {PLACE_ORDER_ROUTE} from "../../helpers/routes"
import {NotificationManager} from "react-notifications"
import {DEFAULT_ERROR_MESSAGE, notifyError} from "../../helpers/notifications"


class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: false,
            address: {
                zip: "",
                street_address: "",
                apartment: "",
            },
            selectedAddressId: undefined,
            selectedAddressOption: {}
        }
    }

    componentDidMount(prevProps) {
        this.setState({
            ...this.state,
            isUserLoggedIn: isUserLoggedIn(),
            ...(this.isLoggedInAndHasAddresses() ? this.firstUserAddress() : {}),
            selectedAddressId: (
                this.isLoggedInAndHasAddresses()
                    ? this.props.userAddresses[0].id
                    : undefined),
            selectedAddressOption: this.makeAddressDefaultOption()
        })
    }

    submitOrder = () => {
        if (this.state.address.zip.length < 1) {
            notifyError("Please fill in your ZIP Code.")
        } else if (this.state.address.street_address.length < 1) {
            notifyError("Please fill in your street address.")
        } else {
            this.props.confirmAddress(
                this.makeAddressData()
            )
        }
    }

    makeAddressData = () => {
        if (this.state.selectedAddressId === undefined) {
            return {
                address: {
                    zip: this.state.address.zip,
                    street_address: this.state.address.street_address,
                    apartment: this.state.address.apartment
                }
            }
        } else {
            return {
                address_id: this.state.selectedAddressId
            }
        }
    }

    firstUserAddress = () => (
        {
            address: {
                zip: this.props.userAddresses[0].zip,
                street_address: this.props.userAddresses[0].street_address,
                apartment: this.props.userAddresses[0].apartment
            }
        }
    )

    handleInput = (e) => {
        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [e.target.name]: e.target.value
            }
        })
    }

    isLoggedInAndHasAddresses = () =>
        isUserLoggedIn() && this.props.userAddresses !== undefined && this.props.userAddresses.length > 0

    makeAddressOptions = () => [
        ...this.props.userAddresses.map(address => (
                this.makeSingleAddressOption(address)
            )
        ),
        {
            value: undefined,
            label: "New Address"
        }
    ]

    makeAddressDefaultOption = () => {
        return this.makeSingleAddressOption(this.props.userAddresses[0])
    }

    makeSingleAddressOption = (address) => (
        {
            value: address.id,
            label: address.zip + " " + address.street_address + " " + address.apartment
        }
    )

    handleSelectChange = selectedOption => {
        this.setState({
            ...this.state,
            selectedAddressId: selectedOption.value,
            ...(selectedOption.value !== undefined
                    ? this.makeSelectedAddressForState(selectedOption.value)
                    : {}
            ),
            selectedAddressOption: selectedOption
        })
    }

    makeSelectedAddressForState = (addressId) => {
        let foundAddress = this.getAddressWithId(addressId)
        return {
            address: {
                zip: foundAddress.zip,
                street_address: foundAddress.street_address,
                apartment: foundAddress.apartment
            }
        }
    }

    getAddressWithId = (addressId) =>
        this.props.userAddresses.find(address => address.id === addressId)


    isAddressSelected = () =>
        this.state.selectedAddressId !== undefined


    render = () => (
        <div>
            {this.isLoggedInAndHasAddresses() && <>
                <label>Select a stored address or choose "New Address"</label>
                <Select
                    value={this.state.selectedAddressOption}
                    onChange={this.handleSelectChange}
                    options={this.makeAddressOptions()}
                />
            </>}
            <input type="number" name="zip" value={this.state.address.zip}
                   onChange={this.handleInput}
                   placeholder="ZIP"
                   disabled={this.isAddressSelected()}
            />
            <input type="text" name="street_address" value={this.state.address.street_address}
                   onChange={this.handleInput}
                   placeholder="Street Address"
                   disabled={this.isAddressSelected()}
            />
            <input type="number" name="apartment" value={this.state.address.apartment}
                   onChange={this.handleInput}
                   placeholder="Apartment №"
                   disabled={this.isAddressSelected()}
            />
            <div onClick={this.submitOrder}>Place order</div>
        </div>
    )

}

const mapStateToProps = state => {
    if (!state.userAddresses.isFetching) {
        return {
            userAddresses: state.userAddresses.userAddresses
        }
    }
    return {}
};

export default connect(mapStateToProps)(Address)
