export const ADD_TO_CART = 'ADD_TO_CART';
export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product
    }
}

export const REMOVE_FROM_CART = 'REMOVE_ITEM';
export const removeFromCart = id => {
    return {
        type: REMOVE_FROM_CART,
        id
    }
}

export const SUB_QUANTITY = 'SUB_QUANTITY';
export const subtractQuantity = id => {
    return {
        type: SUB_QUANTITY,
        id
    }
}

export const ADD_QUANTITY = 'ADD_QUANTITY';
export const addQuantity = id => {
    return {
        type: ADD_QUANTITY,
        id
    }
}

export const EMPTY_CART = 'EMPTY_CART';
export const emptyCart = () => {
    return {
        type: EMPTY_CART
    }
}

export const SWITCH_CURRENCY = 'SWITCH_CURRENCY';
export const switchCurrency = (currency) => {
    return {
        type: SWITCH_CURRENCY,
        currency
    }
}


export const REQUEST_DELIVERY_COSTS = 'FETCH_SHIPPING_COSTS';
export const requestDeliveryCosts = () => {
    return {
        type: REQUEST_DELIVERY_COSTS
    }
}

export const RECEIVE_DELIVERY_COSTS = 'RECEIVE_DELIVERY_COSTS';
export const receiveDeliveryCosts = items => {
    return {
        type: RECEIVE_DELIVERY_COSTS,
        deliveryCosts: items
    }
}


export const REQUEST_USER_ADDRESSES = 'REQUEST_USER_ADDRESSES';
export const requestUserAddresses = () => {
    return {
        type: REQUEST_USER_ADDRESSES
    }
}

export const RECEIVE_USER_ADDRESSES = 'RECEIVE_USER_ADDRESSES';
export const receiveUserAddresses = items => {
    return {
        type: RECEIVE_USER_ADDRESSES,
        userAddresses: items
    }
}
