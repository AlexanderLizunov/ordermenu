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


class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repassword: '',
            linkId: ''
        }
    }

    handleChange = email => event => {
        this.setState({
            email: event.target.value,

        });
        console.log(this.state.email)
    };
    handleChangePas = pas => event => {
        this.setState({
            password: event.target.value,

        });
        // console.log(this.state.password)

    };
    handleChangerePas = repas => event => {
        this.setState({
            repassword: event.target.value,

        });
        // console.log(this.state.password)

    };

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.password === this.state.repassword && this.state.password.length > 0 && this.state.email !== '') {
            console.log('welldone')
            const idValue = uuid.v1()
            this.props.onUserIdUpdate(idValue);
            //TODO: LATTER WILL BE RECEIVED FROM SERVER
            this.props.onUserBalanceUpdate('50$');
            this.props.onUserEmailUpdate(this.state.email);

            console.log('LINK ID FOR EMAIL'+  idValue)
            localStorage.setItem('userId',  idValue);

            console.log('user emails to localstorage' + this.state.email)
            localStorage.setItem('userEmail',  this.state.email);
            localStorage.setItem('userBalance',  '50$');

            setTimeout(this.props.history.push("/"), 1000)
        } else {
            alert('CHECK FORM FIELDS')
        }

    }

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} onSubmit={this.handleSubmit.bind(this)} noValidate autoComplete="off">
                <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />

                <TextField
                    id="password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    onChange={this.handleChangePas('pas')}

                    autoComplete="current-password"
                    margin="normal"
                />
                <TextField
                    id="password-input-repeat"
                    label="Repeat Password"
                    className={classes.textField}
                    type="password"
                    onChange={this.handleChangerePas('pas2')}
                    autoComplete="current-password"
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)}
                        className={classes.button}>
                    SignUp
                </Button>
            </form>
        );
    }
}

RegistrationForm.propTypes = {
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
)(withRouter(withStyles(styles)(RegistrationForm)));