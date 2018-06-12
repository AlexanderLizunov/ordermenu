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
    handleLogout(){
        this.props.onLogInUpdate(false)
        setTimeout(this.props.history.push("/registration"), 1000)
    }

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}>
                <BottomNavigationAction label={<Link to="/">Home</Link>}/>
                <BottomNavigationAction label={<Link to="stats">Statistic</Link>}/>
                <BottomNavigationAction label={<Link to="/admin">Admin</Link>}/>
                <BottomNavigationAction label={<Link to="/registration">SignUp</Link>}/>

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
        isLoggedIn: state.isLoggedIn,
    }),
    dispatch => ({
        onListDownload: (array) => {
            dispatch({type: 'LIST_DOWNLOAD', payload: array})
        },
        onOrderUpdate: (array) => {
            dispatch({type: 'ORDER_UPDATE', payload: array})
        },
        onLogInUpdate: (array) => {
            dispatch({type: 'IS_LOGGED_UPDATE', payload: array})
        },
    })
)(withRouter(withStyles(styles)(Navigation)));