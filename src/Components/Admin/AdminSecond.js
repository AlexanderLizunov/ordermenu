import React, {Component} from 'react';

import axios from "axios/index";


import SimpleModal from './SimpleModal'
import {withStyles} from "@material-ui/core/styles/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import BalanceItem from './BalanceItem'


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class AdminSecond extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: '',
            displayUsers: '',
            page: 0,
            checkedB: false,

        }
    }

    getList() {

        axios.get('http://localhost:5000/api/users')
            .then((response) => {
                console.log(response);
                if (response.data != null) {

                    console.log("ПОЛУЧИЛ НЕ ПУСТОТУ")
                    console.log("ПОЛУЧИЛ НЕ ПУСТОТУ")

                    this.setState({
                        userList: response.data
                    })
                    this.userDisplay(this.state.page)
                } else {
                    //console.log("ПОЛУЧИЛ  ПУСТОТУ")

                }

            })
            .catch(function (error) {
                // //console.log(error);
            });
        // axios.get('../usersBalance.json')
        //     .then((response) => {
        //         this.setState({
        //             userList: response.data
        //         })
        //         this.userDisplay(this.state.page)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    userDisplay(pageNum) {
        // console.log('ОБНОВЛЕНИЕ  СПИСКА ДЛЯ ПОКАЗА')
        // console.log(pageNum)
        if (this.state.userList  !== '') {

            var  usersShown = 8,
                allUsers = this.state.userList,
                userList = allUsers.slice(pageNum * usersShown, (pageNum + 1) * usersShown)

            // console.log("USER LIST DISPLAY")
            // console.log(userList)

            this.setState({
                page: pageNum,
                displayUsers: userList
            })

            // console.log(this.state.displayUsers)
            // console.log(this.state.page)
        }


    }

    componentWillMount() {
        //TODO: LATTER MAKE REQUEST TO SERVER TO GET BALANCE AND EMAIL
        // console.log("WILLMOUNT")

        this.getList()
    }

    prevList() {
        let num = this.state.page - 1
        console.log(num)

        if (this.state.page === 0) {
            alert("Первая страница")
        } else {
            this.setState({
                page: num
            })
            console.log(this.state.page)
            this.userDisplay(num)
        }
    }

    nextList() {
        let num = this.state.page + 1
        // console.log("NEXT PAGE" + num)
        let arrayLength = this.state.userList.length

        // console.log(arrayLength)
        // console.log(Math.ceil(arrayLength / 8))

        if (num <= Math.ceil(arrayLength / 8)) {

            this.userDisplay(num)
            // console.log("ПОСЛЕ СТЕЙТА" + this.state.page)
        } else {
            alert("КОНЕЦ СПИСКА")

        }
    }


    render() {
        // const {classes} = this.props;
        // console.log("RENDERING")
        // console.log(this.state.displayUsers)

        var userArray = [];
        var pageNum = this.state.page,
            usersShown = 8,
            showUsers = this.state.displayUsers
        // console.log(showUsers)

        if (this.state.displayUsers.length > 0) {
            // console.log(showUsers)
            userArray = showUsers.map((user, index) =>
                <BalanceItem key={index} user={user} userNumber={index + usersShown * pageNum}/>
            )
        }


        return (
            <div>
                <div className="admin-container admin-second">
                    <div className='user-balance-block'>
                        <div className='balance-block-header'>
                            <div className='balance-block-title'>EMAIL</div>
                            <div className='balance-block-title'><span>BALANCE</span></div>
                        </div>
                        {userArray}

                        <div className='balance-block-footer'>
                            <button className="balance-buttons" onClick={this.prevList.bind(this)}>
                                prev
                            </button>
                            <button className="balance-buttons" onClick={this.nextList.bind(this)}>
                                next
                            </button>
                        </div>
                    </div>
                    <div className="form-order-block">
                       <SimpleModal />
                    </div>
                </div>

                <div>

                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        adminArray: state.adminArray,
        userBalance: state.userBalance
    }),
    dispatch => ({
        onUserBalanceUpdate: (array) => {
            dispatch({type: 'USER_BALANCE_UPDATE', payload: array})
        },
        onAdminArrayUpdate: (array) => {
            dispatch({type: 'ADMIN_ARRAY_UPDATE', payload: array})
        },

    })
)(withRouter(withStyles(styles)(AdminSecond)));