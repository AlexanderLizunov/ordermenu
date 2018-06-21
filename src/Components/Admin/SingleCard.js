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

    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 0,
    },
    bigAvatar: {
        width: 40,
        height: 40,
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
            dish: "",

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
        //console.log(this.state.cardData)
    }

    componentWillMount() {
        console.log("SingleCard MOUNT")
        console.log("STATE")
        console.log(this.state)
        console.log("PROPS")
        console.log(this.props)


        // //console.log(this.props.newMenuAdmin)
        //
        const currentCardNumber = this.props.card,
            updatingStateQuery = this.props.newMenuAdmin
        // //console.log(
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
        //         //console.log('')
        //         this.setState({
        //             dish: backupEmpty
        //         })
        //     });
    }


    handleChange = event => {

        // //console.log(event.getAttribute('data-orderid'));
        let b = this.props.cardState
        // //console.log(b[2])
        // b[event.target.name].title = event.target.value
        b[event.target.name] = this.findDish(event.target.value)
        console.log(b)
        // //console.log(event.target.name)
        // //console.log(event.target.value)
        // //console.log(this.state.card)

        this.setState({
            dish: b
        });
        //
        let adminArray = this.props.adminArray
        console.log(adminArray)

        adminArray[this.props.card] = b
        console.log(adminArray)
        //
        // this.updateCardData(this.findDish(event.target.value), event.target.name)
        // // //console.log(this.state.cardData)
        // // //console.log(this.props.card)
        this.props.onAdminArrayUpdate(adminArray)
        // //console.log(this.props)
        //
        // PREPARING  FOR SENDING TO BACKEND
        let arrayForSendingMenus = this.props.newMenuAdmin
        arrayForSendingMenus.forEach((element) => {
            console.log(element)
            if (element.hasOwnProperty("_id")) {
                delete element._id

            }
            //console.log(element)
        })

        let sendBackendAvailableMenu = {
            date: this.props.currentDate,
            availableMenu: arrayForSendingMenus
        }

        console.log("sendBackendAvailableMenu")
        console.log(sendBackendAvailableMenu)

        // //console.log(sendBackendAvailableMenu)
        axios.put('http://localhost:5000/api/availableMenu/' + this.props.currentDate, sendBackendAvailableMenu)
            .then(function (response) {
                //console.log(response);
            })
            .catch(function (error) {
                //console.log(error);
            });

    };

    findDish(temp) {
        let dishObject = ''
        this.props.options.filter(function (dish) {
            if (temp === dish.title) {
                return dishObject = dish
            }
        });
        // //console.log("DISH OBJECT= ")
        // //console.log(dishObject)
        return dishObject
    }

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };


    render() {
        console.log("IS DISABLED" + this.props)
        console.log(this.props)
        console.log(this.state)
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

                        <Select
                            key={variable}
                            open={this.state.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={b.title}
                            onChange={this.handleChange}
                            inputProps={{
                                name: variable,
                                id: 'demo-controlled-open-select',
                            }}
                        >
                            {optionsArray}
                        </Select>
                    </div>
                )
            })
        } else if (this.props.cardState != undefined) {
            this.props.cardState.forEach((dish, variable) => {
                let b = this.props.cardState[variable]

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

                        <Select
                            key={variable}
                            open={this.state.open}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={b.title}
                            onChange={this.handleChange}
                            inputProps={{
                                name: variable,
                                id: 'demo-controlled-open-select',
                            }}
                            className="admin-card-select-cover"
                        >
                            {optionsArray}
                        </Select>
                    </div>
                )
            })
        }


        return (
            <form className="admin-card-cover" autoComplete="off">
                <FormControl {... this.props.isDisbled ? {disabled: true} : {}} className={classes.formControl}>
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
