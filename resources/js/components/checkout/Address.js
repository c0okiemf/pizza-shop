import React, {Component} from "react"
import {isUserLoggedIn} from "../../helpers/user"
import Select from "react-select"
import {connect} from "react-redux"
import {notifyError} from "../../helpers/notifications"
import styled from "styled-components"
import {ContinueButton} from "./Cart"
import {StyledH2} from "../auth/RegisterForm"

export const RowGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  place-self: center;
  width: 100%;
`

export const StyledInput = styled.input`
  height: 50px;
  border-radius: 9px;
  font-size: 1.5rem;
  padding-left: 20px;
  appearance: none;
  margin: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:disabled {
    background: black;
    color: white;
  }
`

const StyledSelect = styled(Select)`
  height: 50px;
  border-radius: 9px;
  font-size: 1.5rem;
  margin: 0;
`

export const EqualColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 50%);
`

const customSelectStyle = {
    control: (provided) => ({
        ...provided,
        borderRadius: "inherit",
        backgroundColor: "rgb(245 247 248)",
        border: "2px solid #b5b6b7",
        paddingLeft: "20px"
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: 0
    }),
}

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

    componentDidMount() {
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
        if (this.props.userAddresses !== undefined && this.props.userAddresses.length > 0) {
            return this.makeSingleAddressOption(this.props.userAddresses[0])
        }
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
            ...this.makeSelectedAddressForState(selectedOption.value),
            selectedAddressOption: selectedOption
        })
    }

    makeSelectedAddressForState = (addressId) => {
        let foundAddress = {
            zip: "",
            street_address: "",
            apartment: ""
        }
        if (addressId !== undefined) {
            foundAddress = this.getAddressWithId(addressId)
        }
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
        <RowGrid>
            {this.isLoggedInAndHasAddresses() && <>
                <StyledH2>Select a saved address or choose "New Address"</StyledH2>
                <StyledSelect
                    value={this.state.selectedAddressOption}
                    onChange={this.handleSelectChange}
                    options={this.makeAddressOptions()}
                    styles={customSelectStyle}
                />
            </>}
            <StyledInput type="number" name="zip" value={this.state.address.zip}
                   onChange={this.handleInput}
                   placeholder="ZIP"
                   disabled={this.isAddressSelected()}
            />
            <StyledInput type="text" name="street_address" value={this.state.address.street_address}
                   onChange={this.handleInput}
                   placeholder="Street Address"
                   disabled={this.isAddressSelected()}
            />
            <StyledInput type="number" name="apartment" value={this.state.address.apartment}
                   onChange={this.handleInput}
                   placeholder="Apartment №"
                   disabled={this.isAddressSelected()}
            />
            <EqualColumnsContainer>
                <ContinueButton onClick={this.submitOrder}>Place order</ContinueButton>
            </EqualColumnsContainer>
        </RowGrid>
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
