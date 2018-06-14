import React from 'react';
import {withRouter} from "react-router-dom";
import uuid from 'uuid';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import {connect} from "react-redux";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    menu: {
        width: 200,
    },
});


class BalanceItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            userNumber: this.props.userNumber
        }
    }

    handleChange = balance => event => {
        var userQuery = this.state.user
        userQuery.balance= event.target.value
        this.setState({
            user: userQuery,
        });

        console.log(this.state.user)
        console.log(this.state.userNumber)

    };


    handleSubmit(e) {
        e.preventDefault()
        console.log('submiting?')
    }

    render() {
        const {classes} = this.props;

        return (
            <form className={'balance-form-item '+classes.container}  noValidate autoComplete="off">
                <span>
                    {this.state.user.email}
                </span>
                <TextField
                    id="email"
                    className={'balance-form-input '+classes.textField}
                    value={this.state.user.balance}
                    onChange={this.handleChange('balance')}
                    margin="normal"
                />
            </form>
        );
    }
}

BalanceItem.propTypes = {
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
            dispatch({type: 'USER_EMAIL_UPDATE', payload: array})
        },
        onUserIdUpdate: (array) => {
            dispatch({type: 'USER_ID_UPDATE', payload: array})
        },
        onUserBalanceUpdate: (array) => {
            dispatch({type: 'USER_BALANCE_UPDATE', payload: array})
        },

    })
)(withRouter(withStyles(styles)(BalanceItem)));