import appStore from "../components/reducers/reducer"
import {receiveUserAddresses, requestUserAddresses} from "../components/actions/actions"
import {SHOW_USER_ADDRESSES_ROUTE} from "./routes"

export const fetchUserFromLocalStorage = initialState => {
    let appState = localStorage["appState"]
    if (appState) {
        let parsedState = JSON.parse(appState)
        return {
            ...initialState,
            isLoggedIn: parsedState.isLoggedIn,
            user: {
                ...initialState.user,
                ...parsedState.user
            }
        }
    }
}

export const isUserLoggedIn = () => {
    try {
        return JSON.parse(localStorage["appState"]).isLoggedIn
    } catch (e) {
        return false
    }
}

export const accessToken = () => {
    try {
        return JSON.parse(localStorage["appState"]).user.access_token
    } catch (e) {
        return false
    }
}

export const makeAuthorizedHeader = () => (
    {
        headers: {
            "Authorization": "Bearer " + accessToken()
        }
    }
)

export const fetchUserAddressesAndStoreThem = () => {
    if (isUserLoggedIn()) {
        appStore.dispatch(requestUserAddresses())
        axios.get(SHOW_USER_ADDRESSES_ROUTE, makeAuthorizedHeader())
            .then(response => {
                return response
            })
            .then(json => {
                appStore.dispatch(receiveUserAddresses(json.data.items))
            })
    }
}

export const makeUserStateFromResponse = json => (
    {
        isRegistered: true,
        isLoggedIn: true,
        user: {
            id: json.data.id,
            name: json.data.name,
            email: json.data.email,
            access_token: json.data.access_token,
        }
    }
)


export const storeUserInLocalStorage = userState => {
    localStorage["appState"] = JSON.stringify(userState)
}
