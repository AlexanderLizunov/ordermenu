import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios/index";

import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';


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
            const sendToBackendUserInfo = {
                email: this.state.email,
                password: this.state.password,
                emailVerified: "false",
                balance: "0"
            }
            axios.get('http://localhost:5000/api/user/' + this.state.email)
                .then((response) => {
                    if (response.data) {
                        alert("Пользователь с таким имейлом существует")
                    } else {
                        axios.post('http://localhost:5000/api/users/', sendToBackendUserInfo)
                            .then((response) => {
                                console.log(response);
                                localStorage.setItem('token', response.data);
                                this.props.history.push("/")
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
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