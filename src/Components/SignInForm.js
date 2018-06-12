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
            this.props.onLogInUpdate(true);
            // console.log(this.props.isLoggedIn)
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
                    label="Name"
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
                    Primary
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
)(withRouter(withStyles(styles)(SignInForm)));