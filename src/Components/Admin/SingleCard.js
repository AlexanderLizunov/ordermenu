import React from 'react';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import axios from "axios/index";
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';


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

        //console.log("HANDLE CHANGE CARD DATA UPDATE")
        this.setState({
            cardData: tempCardData
        });
        ////console.log(this.state.cardData)
    }

    componentWillMount() {
        //console.log("SingleCard MOUNT")
        //console.log("STATE")
        //console.log(this.state)
        //console.log("PROPS")
        //console.log(this.props)


        // ////console.log(this.props.newMenuAdmin)
        //
        const currentCardNumber = this.props.card,
            updatingStateQuery = this.props.newMenuAdmin
        // ////console.log(
        //     updatingStateQuery[currentCardNumber]
        // )
        // this.setState({
        //     dish: updatingStateQuery[currentCardNumber]
        // })
        // axios.get('http://localhost:5000/api/availableMenu/' + this.props.currentDate)
        //     .then((response) => {
        //         this.setState({
        //             dish: response.data.availableMenu[currentCardNumber]
        //         })
        //     })
        //     .catch(function (error) {
        //         let backupEmpty = this.state.cardData
        //         ////console.log('')
        //         this.setState({
        //             dish: backupEmpty
        //         })
        //     });
    }


    handleChange = event => {


        // this.setState(
        //     {[event.target.name]: event.target.value}
        // );
        // ////console.log(event.getAttribute('data-orderid'));
        let b = this.props.cardState

        //console.log(this.props.cardState)
        //console.log(event.target.name)
        b[event.target.name].title = event.target.value
        b[event.target.name] = this.findDish(event.target.value)
        this.setState({
            dish: b
        });
        //
        //
        // // //console.log(b)
        // // //console.log(b)
        // //console.log(b)
        // // ////console.log(event.target.value)
        // // ////console.log(this.state.card)
        // // ////console.log(this.state.card)
        //
        // //console.log("HANDLE CHANGE")
        // //
        let adminArray = this.props.adminArray
        //console.log("adminArray")
        //console.log(adminArray)
        //
        adminArray[this.props.card] = b
        //console.log(adminArray)
        // //
        this.updateCardData(this.findDish(event.target.value), event.target.name)
        // // // ////console.log(this.state.cardData)
        // // // ////console.log(this.props.card)
        this.props.onAdminArrayUpdate(adminArray)
        // // ////console.log(this.props)
        // //
        // PREPARING  FOR SENDING TO BACKEND
        let arrayForSendingMenus = this.props.newMenuAdmin
        arrayForSendingMenus.forEach((element) => {
            //console.log(element)
            if (element.hasOwnProperty("_id")) {
                delete element._id

            }
            ////console.log(element)
        })

        let sendBackendAvailableMenu = {
            date: this.props.currentDate,
            availableMenu: arrayForSendingMenus
        }

        // //console.log("sendBackendAvailableMenu")
        // //console.log(sendBackendAvailableMenu)
        //
        // // ////console.log(sendBackendAvailableMenu)
        axios.put('http://localhost:5000/api/availableMenu/' + this.props.currentDate, sendBackendAvailableMenu)
            .then(function (response) {
                ////console.log(response);
            })
            .catch(function (error) {
                ////console.log(error);
            });

    };

    findDish(temp) {
        let dishObject = ''
        this.props.options.filter(function (dish) {
            if (temp === dish.title) {
                return dishObject = dish
            }
        });
        // ////console.log("DISH OBJECT= ")
        // ////console.log(dishObject)
        return dishObject
    }


    render() {
        // //console.log("IS DISABLED" + this.props)
        // //console.log(this.props)
        // //console.log(this.state)
        //console.log(" RENDER CARDSTATE DISH")
        //console.log(this.props.ca)
        const {classes} = this.props;
        let optionsArray = []

        if (this.props.options.length > 0) {
            optionsArray = this.props.options.map((dish, listIndex) =>
                <MenuItem key={listIndex} {... this.props.isDisbled ? {disabled: true} : {}} className={classes.formControl}
                          value={dish.title}>
                    {dish.title}
                </MenuItem>
            )
        }

        let selectArray = []
        if (this.state.dish.length > 1) {

            this.state.dish.forEach((dish, variable) => {
                let b = this.state.dish[variable]

                //console.log(" RENDER CARDSTATE DISH")
                //console.log(this.state.dish)
                selectArray.push(
                    <div className="admin-card-item">
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
                                    }}
                                >
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
                //console.log(this.props.cardState[variable])
                ////console.log(" RENDER CARDSTATE DISH")
                ////console.log(this.state.dish)
                selectArray.push(
                    <div className="admin-card-item">
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
                                    }}
                                >
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