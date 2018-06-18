const initialState = ''

export default function availableMenu(state = initialState, action) {
    if (action.type === 'AVAILABLE_MENU_DOWNLOAD') {
        return action.payload

    }
    return state
}