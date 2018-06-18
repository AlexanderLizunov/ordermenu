import {combineReducers} from 'redux'

import availableMenu from './availableMenu'
import BACKEND_ORDER_DATE_ORDER_STORE from './BACKEND_ORDER_DATE_ORDER_STORE'
import currentDate from './currentDate'
import newMenuAdmin from './newMenuAdmin'
import orderedMenu from './orderedMenu'
import userProfile from './userProfile'
import statistics from './statistics'


export default combineReducers({
    availableMenu,
    BACKEND_ORDER_DATE_ORDER_STORE,
    currentDate,
    newMenuAdmin,
    orderedMenu,
    statistics,
    userProfile
})