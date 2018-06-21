import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from "axios/index";

const styles = {
    root: {
        width: 500,
    },
};


class verify extends Component {
    state = {
        value: 0,
    };


    handleVerification() {
        console.log("CKASD")
        let userId = localStorage.getItem('id')
        axios.get('http://localhost:5000/api/users/validation/' + userId)
            .then((response) => {
                if (response.data) {
                    console.log(response)
                    alert("Стой проходи")
                    localStorage.setItem('verify', "true");
                    this.props.history.push("/")
                    console.log(response)

                } else {
                    console.log(response)

                    alert("позови умного человека")

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

export default withStyles(styles)(verify);