import React, {Component} from 'react';
import axios from 'axios';
import Menu from './Components/Home/Menu';
import Navigation from "./Components/Navigation";
import './App.css'

import {connect} from 'react-redux'

class App extends Component {
    constructor(props) {
        super(props);

        const today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            food: [],
            order: [],
            date: date,
            ordering: "",
            emailVerified: '',
            balance:'',
            userEmail:''
        }
    }

    componentWillMount() {
        if (localStorage.hasOwnProperty('token')) {
            let userToken = localStorage.getItem('token')
            axios.get('http://localhost:5000/api/useremail', {headers: {Authorization: "Bearer " + userToken}})
                .then((response) => {
                    this.props.onUserEmailUpdate(response.data.email)
                    this.props.onUserBalanceUpdate(response.data.balance)
                    localStorage.setItem("balance",response.data.balance)
                    localStorage.setItem("email",response.data.email)
                    console.log(response.data);
                    if (response.data.emailVerified === "false") {
                        this.setState({
                            ordering: "false",
                            emailVerified: "false",
                            balance: response.data.balance,
                            userEmail: response.data.email
                        })
                    } else {
                        this.setState({
                            emailVerified: "true"
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.getText()
        } else {
            this.props.history.push("/registration")
        }
        this.props.onDateSet(this.state.date)
    }

    getText() {
        axios.get('http://localhost:5000/api/availableMenu/' + this.props.currentDate)
            .then((response) => {
                if (response.data != null) {
                    this.props.onListDownload(response.data.availableMenu)
                    this.setState({
                        ordering: response.data.ordering
                    })
                } else {
                    console.log("ПОЛУЧИЛ  ПУСТОТУ")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let messageMakeOrder = ''

        if (this.state.emailVerified == "false") {
            messageMakeOrder = 'Email не подтвержден , пройдите по ссылке в консоле'
            console.log("http://localhost:3000/verify")
        } else if (this.state.ordering === "false") {
            messageMakeOrder = 'ВОЗМОЖНОСТЬ ЗАКАЗЫВАТЬ ЗАБЛОКИРОВАНА ОБРАТИТЕСЬ К АДМИНИСТРАТОРУ'
        }

        return (
            <div className="App">
                <Navigation balance={this.state.balance} email={this.state.userEmail} />
                <div className="ordering-message">{messageMakeOrder}</div>
                <Menu value={this.props.availableMenu} ordering={this.state.ordering}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        availableMenu: state.availableMenu,
        isLoggedIn: state.isLoggedIn,
        date: state.date,
        currentDate: state.currentDate,
        userEmail: state.userEmail
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

