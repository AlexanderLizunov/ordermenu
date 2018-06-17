const initialState = {
    userId: '',
    userEmail: '',
    userBalance: ''
}

export default function userProfile(state = initialState, action) {

    if (action.type === "USER_ID_UPDATE") {
        return {
            ...state,
            userId: action.payload
        }
    } else if (action.type === "USER_EMAIL_UPDATE") {
        return {
            ...state,
            userEmail: action.payload
        }
    } else if (action.type === "USER_BALANCE_UPDATE") {
        return {
            ...state,
            userBalance: action.payload
        }
    }
    return state
}