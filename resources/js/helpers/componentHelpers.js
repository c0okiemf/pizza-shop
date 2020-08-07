export function fetchUserFromLocalStorage(initialState) {
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
export function register(userData) {
    let url = "/api/auth/register";
    return axios.post(url, userData).then(response => {
        return response
    })
}
export function login(userData) {
    let url = "/api/auth/login";
    return axios.post(url, userData).then(response => {
        return response
    })
}
export function makeUserStateFromResponse(json) {
    let userData = {
        id: json.data.id,
        name: json.data.name,
        email: json.data.email,
        access_token: json.data.access_token,
    }
    return {
        isRegistered: true,
        isLoggedIn: true,
        user: userData
    }
}
export function storeUserInLocalStorage (userState) {
    localStorage["appState"] = JSON.stringify(userState)
}
