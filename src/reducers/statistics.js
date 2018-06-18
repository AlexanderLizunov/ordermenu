const initialState = []

export default function statistics(state = initialState, action) {
    console.log("TRY")
    console.log(state)
    if (action.type === "STATISTICS_UPDATE")
    return action.payload

    return state
}