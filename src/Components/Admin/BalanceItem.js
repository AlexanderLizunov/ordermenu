import React from 'react';
import axios from "axios/index";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
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
            user: '',
            userNumber: ''
        }
    }

    handleChange = balance => event => {
        var userQuery = this.props.user
        userQuery.balance = event.target.value
        this.setState({
            user: userQuery,
        });
        // console.log(userQuery)
        axios.put('http://localhost:5000/api/users/' + userQuery._id, userQuery)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const {classes} = this.props;
        return (
            <form className={'balance-form-item ' + classes.container} noValidate autoComplete="off">
                <span>
                    {this.props.user.email}
                </span>
                <TextField
                    id="email"
                    className={'balance-form-input ' + classes.textField}
                    value={this.props.user.balance}
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