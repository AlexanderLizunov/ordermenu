const initialState = ''

export default function currentDate(state = initialState, action) {
    if (action.type === "CURRENT_DATE_SET") {
        return action.payload

    }
    return state
}