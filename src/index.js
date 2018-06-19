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
import adminFirst from './Routes/admin'
import Stats from './Routes/stats'
import reducer from './reducers'

// const initialState = {
//     orderDishes: '',
//     userProfile: {
//         userBalance: '',
//         userEmail: '',
//         userId: '',
//     },
//     adminArray: [],
//     BACKEND_ORDER_DATE_ORDER_STORE: [],
//     currentDate: ''
// }



// function order(state = initialState, action) {
//
//
//     console.log(action)
//     return state
// }

const store = createStore(
    reducer,
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
                <Route path='/admin' component={adminFirst}/>
                <Route path='/stats' component={Stats}/>
                <Route path='/' component={App}/>

            </Switch>
        </BrowserRouter>
        {/*<App/>*/}
    </Provider>,
    document.getElementById('root')
)
;
registerServiceWorker();
