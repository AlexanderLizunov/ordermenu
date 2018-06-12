import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import login from './Routes/login'
import registration from './Routes/registration'


const initialState = {
    availableMenu: '',
    orderDishes: '',
    Balance: '',
    isLoggedIn: false
}

function order(state = initialState, action) {
    if (action.type === 'LIST_DOWNLOAD') {
        return {
            ...state,
            availableMenu: action.payload
        }
    } else if (action.type === "ORDER_UPDATE") {
        return {
            ...state,
            orderDishes: action.payload
        }
    } else if (action.type === "IS_LOGGED_UPDATE"){
        return {
            ...state,
            isLoggedIn: action.payload
        }

    }

        console.log(action)
    return state
}

const store = createStore(
    order,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => {
    console.log('subscribe', store.getState())
})


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>

                <Route path='/login' component={login}/>
                <Route path='/registration' component={registration}/>
                <Route path='/' component={App}/>

            </Switch>
        </BrowserRouter>
        {/*<App/>*/}
    </Provider>,
    document.getElementById('root')
)
;
registerServiceWorker();
