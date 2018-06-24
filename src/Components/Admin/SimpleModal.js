import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from "axios/index";
import SimpleTable from './ModalTable'

import {withStyles} from '@material-ui/core/styles';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class SimpleModal extends React.Component {
    constructor(props) {
        super(props)
        const today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            open: false,
            modalProps: '',
            date: date
        }
    }


    handleOpen = () => {
        this.setState({open: true});
        axios.get('http://localhost:5000/api/orders/' + this.state.date)
            .then((response) => {
                // console.log(response);
                this.setState({
                    modalProps: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.put('http://localhost:5000/api/availableMenu/status/' + this.state.date, {ordering: false})
            .then((response) => {
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;

        return (
            <div className="form-order-block">
                {/*<Typography gutterBottom>Click to get the full Modal experience!</Typography>*/}
                <Button onClick={this.handleOpen}>Сформировать заказ</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <SimpleTable modalProps={this.state.modalProps}/>
                    </div>
                </Modal>
            </div>
        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;