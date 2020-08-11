import {NotificationManager} from "react-notifications"

export const DEFAULT_ERROR_MESSAGE = "We are unable to process your request at the time, please try again later."

export const notifyError = (message) => {
    NotificationManager.error(message, "Something isn't right...", 4000)
}

export const notifySuccess = (message) => {
    NotificationManager.success(message, "Success", 4000)
}

export const addCatch = (promise) => {
    promise
        .catch(error => {
            let errors = error.response.data.errors
            if (errors !== undefined) {
                notifyError(Object.values(errors))
            } else {
                notifyError(DEFAULT_ERROR_MESSAGE)
            }
        })
}
