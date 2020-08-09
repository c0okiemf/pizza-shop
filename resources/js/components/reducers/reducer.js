import {
    ADD_QUANTITY,
    ADD_TO_CART,
    EMPTY_CART, RECEIVE_DELIVERY_COSTS, RECEIVE_USER_ADDRESSES,
    REMOVE_FROM_CART, REQUEST_DELIVERY_COSTS, REQUEST_USER_ADDRESSES,
    SUB_QUANTITY,
    SWITCH_CURRENCY
} from "../actions/actions"
import {combineReducers, createStore} from "redux";
import {loadState, saveState} from "../../helpers/state"

const cartState = {
    products: [],
    selectedCurrency: "usd"
}

const deliveryCostState = {
    usd: 0,
    eur: 0,
    isFetching: true
}

const userAddressesState = {
    userAddresses: [],
    isFetching: true
}

function cart(state = cartState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.products.find(product => product.id === action.product.id) === undefined) {
                return {
                    ...state,
                    products: [
                        ...state.products,
                        {
                            ...action.product,
                            quantity: 1
                        }
                    ]
                }
            }
            return state;
        case REMOVE_FROM_CART:
            if (state.products.find(product => product.id === action.id) !== undefined) {
                return {
                    ...state,
                    products: [
                        ...state.products.filter(
                            product => product.id !== action.id
                        )
                    ]
                }
            }
            return state;
        case SUB_QUANTITY:
            return {
                ...state,
                products: state.products.reduce((products, product) => {
                    if (product.id === action.id) {
                        if (product.quantity > 1) {
                            product = {
                                ...product,
                                quantity: product.quantity - 1
                            }
                        } else {
                            return products
                        }
                    }
                    products.push(product)
                    return products
                }, [])
            }
        case ADD_QUANTITY:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.id
                        ? {
                            ...product,
                            quantity: product.quantity + 1
                        }
                        : product
                )
            }
        case EMPTY_CART:
            return {
                ...state,
                products: []
            }
        case SWITCH_CURRENCY:
            return {
                ...state,
                selectedCurrency: action.currency
            }
        default:
            return state
    }
}

function deliveryCost(state = deliveryCostState, action) {
    switch (action.type) {
        case REQUEST_DELIVERY_COSTS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_DELIVERY_COSTS:
            return {
                ...state,
                usd: action.deliveryCosts.usd,
                eur: action.deliveryCosts.eur,
                isFetching: false
            }
        default:
            return state
    }
}

function userAddresses(state = userAddressesState, action) {
    switch (action.type) {
        case REQUEST_USER_ADDRESSES:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_USER_ADDRESSES:
            return {
                ...state,
                userAddresses: action.userAddresses,
                isFetching: false
            }
        default:
            return state
    }
}

const reducer = combineReducers({
    cart,
    deliveryCost,
    userAddresses
})



const persistedState = loadState();
const appStore = createStore(
    reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
appStore.subscribe(() => {
    saveState({
        cart: appStore.getState().cart
    });
});

export default appStore
