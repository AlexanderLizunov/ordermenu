import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';



const styles = {
    root: {
        width: 500,
    },
};

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            value: 0,
        })
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleLogout() {
        //TODO: LATTER WILL BE RECEIVED FROM SERVER
        this.props.onUserIdUpdate('');
        this.props.onUserBalanceUpdate('');
        this.props.onUserEmailUpdate('');
        localStorage.clear()
        setTimeout(this.props.history.push("/registration"), 1000)
    }

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        const currentEmail= localStorage.getItem('email')
        const currentBalance= localStorage.getItem('balance')
        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={'Navigation-block' + classes.root}>
                <BottomNavigationAction label={<Link to="/">Home</Link>}/>
                <BottomNavigationAction label={<Link to="stats">Statistic</Link>}/>
                <BottomNavigationAction label={<Link to="/admin">Admin</Link>}/>
                <div className='navigation-text'>
                    {currentEmail}
                </div>
                <div className='navigation-text'>
                    {"Balance:"+ currentBalance}
                </div>
                <Button variant="contained" color="primary" onClick={this.handleLogout.bind(this)}
                        className={classes.button}>
                    Logout
                </Button>
            </BottomNavigation>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    state => ({
        availableMenu: state.availableMenu,
        userId: state.userId,
        userEmail: state.userEmail,
        userBalance: state.userBalance
    }),
    dispatch => ({
        onUserEmailUpdate: (array) => {
            dispatch({type: 'USER_EMAIL_DOWNLOAD', payload: array})
        },
        onUserIdUpdate: (array) => {
            dispatch({type: 'USER_ID_UPDATE', payload: array})
        },
        onUserBalanceUpdate: (array) => {
            dispatch({type: 'USER_BALANCE_UPDATE', payload: array})
        },
    })
)(withRouter(withStyles(styles)(Navigation)));