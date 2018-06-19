const initialState = []

export default function newMenuAdmin(state = initialState, action) {
    console.log("REDUCER INFO ")
    console.log(action.payload)
    if (action.type === "ADMIN_ARRAY_UPDATE") {
        return action.payload

    }
    return state
}