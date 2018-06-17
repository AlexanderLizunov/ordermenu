const initialState = []

export default function newMenuAdmin(state = initialState, action) {
    if (action.type === "ADMIN_ARRAY_UPDATE") {
        return action.payload

    }
    return state
}