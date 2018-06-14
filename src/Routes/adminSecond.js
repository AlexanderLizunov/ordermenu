import React, {Component} from 'react';
import Navigation from '../Components/Navigation'

// import SingleSelect from '../Components/Admin/SingleSelect'
import axios from "axios/index";
import {withStyles} from "@material-ui/core/styles/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import BalanceItem from '../Components/Admin/BalanceItem'


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


class adminFirst extends Component {
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
        axios.get('../users.json')
            .then((response) => {
                this.setState({
                    userList: response.data
                })
                this.userDisplay(this.state.page)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    userDisplay(pagenum) {
        console.log('ОБНОВЛЕНИЕ  СПИСКА ДЛЯ ПОКАЗА')
        console.log(pagenum)
        if (this.state.userList !== '') {
            var pageNum = pagenum,
                usersShown = 8,
                allUsers = this.state.userList,
                userList = allUsers.slice(pageNum * usersShown, (pageNum + 1) * usersShown)

            console.log("USER LIST DISPLAY")
            console.log(userList)

            this.setState({
                page: pageNum,
                displayUsers: userList
            })
            console.log(this.state.displayUsers)
        }


    }

    componentWillMount() {
        //TODO: LATTER MAKE REQUEST TO SERVER TO GET BALANCE AND EMAIL
        console.log("WILLMOUNT")

        this.getList()
    }

    handleChange = name => event => {
        // this.setState({ [name]: event.target.checked });
        console.log(name, event.target.checked)
        setTimeout(this.props.history.push("/admin/1"), 1000)

    };

    prevList() {
        let num = this.state.page - 1
        console.log(num)

        if (this.state.page == 1) {
            alert("Первая страница")
        } else {
            this.setState({
                page: num
            })
            console.log(this.state.page)
            this.userDisplay()
        }
    }

    nextList() {
        console.log("NEXT PAGE" + this.state.page)
        let num = this.state.page + 1
        let arrayLength = this.state.userList.length

        console.log(arrayLength
        )
        console.log(Math.ceil(arrayLength / 8))
            this.userDisplay(num)

        if (num == Math.ceil(arrayLength / 8)) {

            alert("КОНЕЦ СПИСКА")
        } else {

            console.log("ПОСЛЕ СТЕЙТА" + this.state.page)
        }
    }


    render() {
        const {classes} = this.props;
        console.log("RENDERING")
        console.log(this.state.displayUsers)

        var userArray = []
        var pageNum = this.state.page - 1,
            usersShown = 8,
            showUsers = this.state.displayUsers
        console.log(showUsers)

        if (this.state.displayUsers.length > 0) {
            console.log(showUsers)
            userArray = showUsers.map((user, index) =>
                <BalanceItem user={user} userNumber={index + usersShown * pageNum}/>
            )
        }


        return (
            <div>
                <Navigation/>
                <div className="admin-container">
                    <div className="button-block">
                        <FormGroup row className="button-item-cover">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedB}
                                        onChange={this.handleChange('checkedB')}
                                        value="checkedB"
                                        color="primary"
                                    />
                                }
                                label=""
                            />
                        </FormGroup>
                    </div>
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
                        <button>FORM ORDER</button>
                    </div>
                </div>

                <div>

                </div>
            </div>
        );
    }
}

// export default registration;
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
)(withRouter(withStyles(styles)(adminFirst)));
// export default (FullWidthGrid);