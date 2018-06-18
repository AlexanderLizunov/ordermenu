import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';


const styles = {
    root: {
        width: 500,
    },
};

class Navigation extends Component {
    state = {
        value: 0,
    };

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
        // console.log(this.props.userEmail, this.props.userBalance)
        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={'Navigation-block'+  classes.root}>
                <BottomNavigationAction label={<Link to="/">Home</Link>}/>
                <BottomNavigationAction label={<Link to="stats">Statistic</Link>}/>
                <BottomNavigationAction label={<Link to="/admin">Admin</Link>}/>
                <div className='navigation-text'>
                    {this.props.userEmail}

                </div>
                <div className='navigation-text'>
                    {this.props.userBalance}
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