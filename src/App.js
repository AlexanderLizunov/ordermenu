import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';

import './App.css'

import Menu from './Components/Home/Menu';
import Navigation from "./Components/Navigation";


class App extends Component {
    constructor(props) {
        super(props);

        const today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            food: [],
            order: [],
            date: date
        }
    }

    componentWillMount() {
        // console.log(this.state.linkId)
        // localStorage.setItem(key, value);
        if (localStorage.hasOwnProperty('id')) {
            let userId = localStorage.getItem('userId')
            console.log("localstoage have data ID: " + userId)
            //TODO: LATTER MAKE REQUEST TO SERVER TO GET BALANCE AND EMAIL
            this.props.onUserBalanceUpdate("50$")
            this.props.onUserEmailUpdate(localStorage.getItem('userEmail'))
            this.getText()
        } else {

            this.props.history.push("/registration")

        }
        this.props.onDateSet(this.state.date)

    }

    getText() {

        console.log(this.props.currentDate)
        axios.get('http://localhost:5000/api/availableMenu/' + this.props.currentDate)
            .then( (response)=> {
                console.log(response);
                if (response.data != null) {
                    console.log("ПОЛУЧИЛ НЕ ПУСТОТУ")

                    console.log(response.data.availableMenu)
                    // this.props.onAdminArrayUpdate(response.data.availableMenu)
                    // console.log(this.props.newMenuAdmin)
                    console.log(this.state    )

                    this.props.onListDownload(response.data.availableMenu)
                    console.log(this.props.availableMenu)
                } else {
                    console.log("ПОЛУЧИЛ  ПУСТОТУ")

                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log("APP RENDER")
        console.log(this.props.availableMenu)
        console.log(this.props)
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
        date: state.date,
        currentDate: state.currentDate
    }),
    dispatch => ({
        onListDownload: (array) => {
            dispatch({type: 'AVAILABLE_MENU_DOWNLOAD', payload: array})
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
        onDateSet: (array) => {
            dispatch({type: 'CURRENT_DATE_SET', payload: array})
        },
    })
)(App);

