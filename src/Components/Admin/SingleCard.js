import React from 'react';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const styles = theme => ({

    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class SingleCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dishesList: this.props.options,
            card: this.props.card,
            cardData: [
                {
                    title: '',
                    avatar: ''
                },
                {
                    title: '',
                    avatar: ''
                },
                {
                    title: '',
                    avatar: ''
                },
                {
                    title: '',
                    avatar: ''
                },
            ],
            cardSelect1: '',
            cardSelect2: '',
            cardSelect3: '',
            cardSelect4: '',
            dish: [],

        }
    }

    state = {
        age: '',
        open: false,
    };

    updateCardData(object, index) {
        let tempCardData = this.state.cardData
        tempCardData[index] = object
        this.setState({
            cardData: tempCardData
        });
        console.log(this.state.cardData)
    }

    handleChange = event => {
        // console.log(event.getAttribute('data-orderid'));
        let b = this.state.dish
        // console.log(b[2])
        b[event.target.name] = event.target.value
        // console.log(event.target.name)
        // console.log(event.target.value)
        // console.log(this.state.card)

        this.setState({
            dish: b
        });

        let adminArray = this.props.adminArray
        adminArray[this.props.card] = this.state.cardData
        console.log(adminArray)

        this.updateCardData(this.findDish(event.target.value), event.target.name)
        console.log(this.state.cardData)
        console.log(this.props.card)
        this.props.onAdminArrayUpdate(adminArray)
        // console.log(this.state)
    };

    findDish(temp) {
        var dishObject
        this.props.options.filter(function (dish) {
            if (temp === dish.title) {
                return dishObject = dish
            }
        });
        console.log("DISH OBJECT= ")
        console.log(dishObject)
        return dishObject
    }

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };


    render() {
        console.log("IS DISABLED" + this.props.isDisbled)
        const {classes} = this.props;
        let optionsArray = []

        if (this.props.options.length > 0) {
            optionsArray = this.props.options.map((dish, listIndex) =>
                <MenuItem key={listIndex}
                          value={dish.title}>
                    {dish.title}
                </MenuItem>
            )
        }

        var selectArray = []
        for (let variable = 0; variable <= 3; variable++) {
            let b = this.state.dish

            selectArray.push(
                <Select
                    key={variable}
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={b[variable]}
                    onChange={this.handleChange}
                    inputProps={{
                        name: variable,
                        id: 'demo-controlled-open-select',
                    }}
                >
                    {optionsArray}
                </Select>
            )
        }


        return (
            <form autoComplete="off">
                <FormControl {... this.props.isDisbled?{disabled:true}:{}} className={classes.formControl}>
                    {selectArray}
                </FormControl>
            </form>
        );
    }
}

SingleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(
    state => ({
        adminArray: state.adminArray,
        userBalance: state.userBalance
    }),
    dispatch => ({
        onUserBalanceUpdate: (array) => {
            dispatch({type: 'ADMIN_ARRAY_UPDATE', payload: array})
        },
        onAdminArrayUpdate: (array) => {
            dispatch({type: 'ADMIN_ARRAY_UPDATE', payload: array})
        },

    })
)(withRouter(withStyles(styles)(SingleCard)));
