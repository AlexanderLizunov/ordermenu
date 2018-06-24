const initialState = []

export default function statistics(state = initialState, action) {
    if (action.type === "STATISTICS_UPDATE")
    return action.payload
    return state
}