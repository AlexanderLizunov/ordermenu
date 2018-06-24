import React, {Component} from 'react';
import axios from "axios/index";
import SimpleModal from './SimpleModal'
import BalanceItem from './BalanceItem'

import {withStyles} from "@material-ui/core/styles/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

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
                if (response.data != null) {
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
    }

    userDisplay(pageNum) {
        if (this.state.userList !== '') {
            var usersShown = 8,
                allUsers = this.state.userList,
                userList = allUsers.slice(pageNum * usersShown, (pageNum + 1) * usersShown)
            this.setState({
                page: pageNum,
                displayUsers: userList
            })
        }
    }

    componentWillMount() {
        this.getList()
    }

    prevList() {
        let num = this.state.page - 1
        if (this.state.page === 0) {
            // alert("Первая страница")
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
        let arrayLength = this.state.userList.length
        if (num <= Math.ceil(arrayLength / 8)) {
            this.userDisplay(num)
        } else {
            // alert("КОНЕЦ СПИСКА")
        }
    }


    render() {
        var userArray = [];
        var pageNum = this.state.page,
            usersShown = 8,
            showUsers = this.state.displayUsers
        if (this.state.displayUsers.length > 0) {
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
                        <SimpleModal/>
                    </div>
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