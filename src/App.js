import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';

import './App.css'

import Menu from './Components/Menu';
import Navigation from "./Components/Navigation";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: [],
            order: [],
        }
    }

    componentWillMount() {
        console.log(this.state.linkId)
        // localStorage.setItem(key, value);
        if (localStorage.hasOwnProperty('userId')) {
            let userId = localStorage.getItem('userId')
            console.log("localstoage have data ID: " + userId)
            //TODO: LATTER MAKE REQUEST TO SERVER TO GET BALANCE AND EMAIL
            this.props.onUserBalanceUpdate("50$")
            this.props.onUserEmailUpdate(localStorage.getItem('userEmail'))
            this.getText()
        } else {

            this.props.history.push("/registration")

        }
    }

    orderBlanker(array) {
        // console.log(length)
        let passArray = []
        array.forEach(function (item, i) {
            passArray[i] = false
        });
        // console.log(passArray)
        this.props.onOrderUpdate(passArray)

    }

    getText() {
        axios.get('clients.json')
            .then((response) => {
                this.props.onListDownload(response.data)

                console.log(this.props.clientList)
                this.orderBlanker(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="App">
                <Navigation/>
                <Menu value={this.props.availableMenu}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        availableMenu: state.availableMenu,
        isLoggedIn: state.isLoggedIn,
    }),
    dispatch => ({
        onListDownload: (array) => {
            dispatch({type: 'LIST_DOWNLOAD', payload: array})
        },
        onOrderUpdate: (array) => {
            dispatch({type: 'ORDER_UPDATE', payload: array})
        },
        onUserEmailUpdate: (array) => {
            dispatch({type: 'USER_EMAIL_UPDATE', payload: array})
        },
        onUserBalanceUpdate: (array) => {
            dispatch({type: 'USER_BALANCE_UPDATE', payload: array})
        },
    })
)(App);

