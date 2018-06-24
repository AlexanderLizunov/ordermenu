import React from 'react';
import {withRouter} from "react-router-dom";

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import axios from "axios/index";

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

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = email => event => {
        this.setState({
            email: event.target.value,

        });
        console.log(this.state.name)
    };
    handleChangePas = pas => event => {
        this.setState({
            password: event.target.value,

        });
        console.log(this.state.password)

    };

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.email > 0 && this.state.password > 0) {
            console.log(this.state.email);
            axios.get('http://localhost:5000/api/user/' + this.state.email)
                .then((response) => {
                    if (response.data) {
                        console.log(response)
                        if (response.data.password == this.state.password) {
                            localStorage.setItem('userEmail', this.state.email);
                            localStorage.setItem('id', response.data._id);
                            this.props.history.push("/")
                        } else {
                            console.log(response)
                            alert("ты ошибся")
                        }
                    } else {
                        console.log(response)
                        alert("НЕТ пользователя с таким имейлом")
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
                    id="name"
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
                <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)}
                        className={classes.button}>
                    SignIn
                </Button>
            </form>
        );
    }
}

SignInForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    state => ({
        availableMenu: state.availableMenu,
        userId: state.userId
    }),
    dispatch => ({
        onUserIdUpdate: (array) => {
            dispatch({type: 'USER_ID_UPDATE', payload: array})
        }
    })
)(withRouter(withStyles(styles)(SignInForm)));