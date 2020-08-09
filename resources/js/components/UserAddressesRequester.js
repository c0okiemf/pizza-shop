import React from "react"
import {fetchUserAddressesAndStoreThem} from "../helpers/user"

const UserAddressesRequester = (props) => {
    fetchUserAddressesAndStoreThem()
    return null
}

export default UserAddressesRequester
