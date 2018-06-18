const initialState = ''

export default function orderedMenu(state = initialState, action) {
    if (action.type === "ORDER_UPDATE") {
        return action.payload
    }
    return state
}