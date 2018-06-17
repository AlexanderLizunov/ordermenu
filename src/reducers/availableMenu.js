const initialState = ''

export default function availableMenu(state = initialState, action) {
    console.log(state)
    if (action.type === 'AVAILABLE_MENU_DOWNLOAD') {
        return action.payload

    }
    return state
}