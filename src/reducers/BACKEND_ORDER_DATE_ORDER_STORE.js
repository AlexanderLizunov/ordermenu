const initialState = []

export default function BACKEND_ORDER_DATE_ORDER_STORE(state = initialState, action) {
    if (action.type === "BACKEND_ORDER_STORE_UPDATE") {
        return action.payload
    }
    return state
}