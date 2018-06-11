import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import {createStore} from 'redux';

function order(state=[], action){
    if(action.type === 'ADD_ORDER'){
        return [
            ...state,
            action.payload
        ];
    }
    console.log(action)
    return state
}

const store = createStore(order)
store.subscribe(()=>{
    console.log('subscribe', store.getState())
})

store.dispatch({
    type:'ADD_ORDER', payload:'riba'
})


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
