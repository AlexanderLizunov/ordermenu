const today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const initialState = date

export default function currentDate(state = initialState, action) {

    if (action.type === "CURRENT_DATE_SET") {
        return action.payload

    }
    return state
}