import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import login from './Routes/login'
import registration from './Routes/registration'
import adminFirst from './Routes/admin'
import Stats from './Routes/stats'
import verify from './Routes/verify'
import reducer from './reducers'
import './index.css';

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

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
                <Route path='/verify' component={verify}/>
                <Route path='/' component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
