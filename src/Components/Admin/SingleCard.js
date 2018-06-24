import React from 'react';
import axios from "axios/index";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
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
                    image: ''
                },
                {
                    title: '',
                    image: ''
                },
                {
                    title: '',
                    image: ''
                },
                {
                    title: '',
                    image: ''
                },
            ],
            cardSelect1: '',
            cardSelect2: '',
            cardSelect3: '',
            cardSelect4: '',
            dish: {}

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
    }



    handleChange = event => {
        let b = this.props.cardState
        b[event.target.name].title = event.target.value
        b[event.target.name] = this.findDish(event.target.value)
        this.setState({
            dish: b
        });
        let adminArray = this.props.adminArray;
        adminArray[this.props.card] = b;
        this.updateCardData(this.findDish(event.target.value), event.target.name);
        this.props.onAdminArrayUpdate(adminArray)
        let arrayForSendingMenus = this.props.newMenuAdmin;
        arrayForSendingMenus.forEach((element) => {
            if (element.hasOwnProperty("_id")) {
                delete element._id
            }
        });
        let sendBackendAvailableMenu = {
            date: this.props.currentDate,
            availableMenu: arrayForSendingMenus
        };
        axios.put('http://localhost:5000/api/availableMenu/' + this.props.currentDate, sendBackendAvailableMenu)
            .then(function (response) {
                ////console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    findDish(temp) {
        let dishObject = ''
        this.props.options.filter(function (dish) {
            if (temp === dish.title) {
                return dishObject = dish
            }
        });
        return dishObject
    }

    render() {
        const {classes} = this.props;
        let optionsArray = []

        if (this.props.options.length > 0) {
            optionsArray = this.props.options.map((dish, listIndex) =>
                <MenuItem key={"1"+ listIndex} {... this.props.isDisbled ? {disabled: true} : {}} className={classes.formControl}
                          value={dish.title}>
                    {dish.title}
                </MenuItem>
            )
        }

        let selectArray = []
        if (this.state.dish.length > 1) {
            this.state.dish.forEach((dish, variable) => {
                let b = this.state.dish[variable]
                selectArray.push(
                    <div key={"3"+ variable} className="admin-card-item">
                        <div className="admin-card-image-cover">
                            <Avatar
                                alt="Пусто"
                                src={b.image}
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                        </div>
                        <form className={classes.root} autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={b.title}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: variable,
                                        id: 'age-simple',
                                    }}>
                                    {optionsArray}
                                </Select>
                            </FormControl>
                        </form>


                    </div>
                )
            })
        } else if (this.props.cardState != undefined) {
            this.props.cardState.forEach((dish, variable) => {
                let b = this.props.cardState[variable]
                selectArray.push(
                    <div  key={"3"+ variable} className="admin-card-item">
                        <div className="admin-card-image-cover">
                            <Avatar
                                alt="Пусто"
                                src={b.image}
                                className={classNames(classes.avatar, classes.bigAvatar)}
                            />
                        </div>
                        <form className={classes.root} autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={dish.title}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: variable,
                                        id: 'age-simple',
                                    }}>
                                    {optionsArray}
                                </Select>
                            </FormControl>
                        </form>
                    </div>
                )
            })
        }

        return (
            <form className="admin-card-cover" autoComplete="off">
                <FormControl >
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
        adminArray: state.newMenuAdmin,
        userBalance: state.userBalance,
        newMenuAdmin: state.newMenuAdmin,
        currentDate: state.currentDate
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