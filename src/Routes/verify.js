import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'


const styles = {
    root: {
        width: 500,
    },
};

class verify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            email: ''
        }
    }

    handleVerification() {
        console.log("CKASD")
        console.log(this.state.email)

        axios.put('http://localhost:5000/api/users/verify/' + this.state.email, {emailVerified: true})
            .then((response) => {
                if (response.data) {
                    console.log(response)
                    // localStorage.setItem('verify', "true");
                    this.props.history.push("/")
                    console.log(response)
                } else {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    componentWillMount() {
        let userToken = localStorage.getItem('token')
        axios.get('http://localhost:5000/api/useremail', {headers: {Authorization: "Bearer " + userToken}})
            .then((response) => {
                this.props.onUserEmailUpdate(response.data.email)
                console.log(response.data);
                if (response.data.emailVerified == "false") {
                    this.setState({
                        email: response.data.email
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        const {classes} = this.props;
        return (
            <div className='app-background'>
                <div className='form-block-cover'>
                    <p className='form-title'>VERIFY EMAIL</p>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.handleVerification.bind(this)}
                                className={classes.button}>
                            Подтвердить
                        </Button>
                    </div>
                </div>
            </div>

        );
    }
}

verify.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(
    state => ({
        userEmail: state.userEmail
    }),
    dispatch => ({
        onUserEmailUpdate: (array) => {
            dispatch({type: 'USER_EMAIL_UPDATE', payload: array})
        }
    })
)(withStyles(styles)(verify));
