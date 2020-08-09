import appStore from "../components/reducers/reducer"
import {requestDeliveryCosts, receiveDeliveryCosts} from "../components/actions/actions"
import {SHOW_DELIVERY_COSTS_ROUTE} from "./routes"

export const fetchDeliveryPrices = () => {
    appStore.dispatch(requestDeliveryCosts());
    axios.get(SHOW_DELIVERY_COSTS_ROUTE)
        .then(response => response.data)
        .then(json => {
            if (json.success) {
                appStore.dispatch(receiveDeliveryCosts(json.items));
            } else {
                alert("Something went wrong, please come back later")
            }
        })
}

const currencyGlyphs = {
    "usd": "$",
    "eur": "€"
}
export const currencyGlyph = (selectedCurrency) =>
    currencyGlyphs[selectedCurrency]

export const calculateTotal = (products, deliveryCost, selectedCurrency) => {
    let totalProductCost = products.reduce((cost, product) =>
        cost += (product.price[selectedCurrency] * product.quantity)
    , 0)
    return totalProductCost + deliveryCost[selectedCurrency]
}
