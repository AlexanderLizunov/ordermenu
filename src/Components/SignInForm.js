import React from 'react';
import {withRouter} from "react-router-dom";

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

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
        }
    }

    handleChange = name => event => {
        this.setState({
            name: event.target.value,

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
        if (this.state.name > 0) {
            console.log('well done U have Logged-In')
            // this.props.onLogInUpdate(true);
            // console.log(this.props.isLoggedIn)
            //TODO: LATER  UPDATE TO GET DATA FROM SERVERS and save to store this.props.onUserIdUpdate(idValue);
            if (localStorage.hasOwnProperty('userId') ) {
                let userId = localStorage.getItem('userId')
                console.log("localstoage have data ID: " + userId)
            } else {
                alert('NOT REGISTERED (NO DATA IN LOCAL STORAGE')
                this.props.history.push("/registration")

            }
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
        userId: state.userId,
    }),
    dispatch => ({
        onUserIdUpdate: (array) => {
            dispatch({type: 'USER_ID_UPDATE', payload: array})
        },
    })
)(withRouter(withStyles(styles)(SignInForm)));