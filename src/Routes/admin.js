import React, {Component} from 'react';
import Navigation from '../Components/Navigation'

// import SingleSelect from '../Components/Admin/SingleSelect'
import SingleCard from '../Components/Admin/SingleCard'
import AdminSecond from '../Components/Admin/AdminSecond'
import axios from "axios/index";
import {withStyles} from "@material-ui/core/styles/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishesList: '',
            checkedB: true,
            selectionDisabled: false,
            cardsArray: []

        }
    }

    getOptionsList() {
        axios.get('../dishes.json')

            .then((response) => {
                // this.props.onListDownload(response.data)

                // this.orderBlanker(response.data)
                this.setState({
                    dishesList: response.data
                })
                // ////console.log(this.state.dishesList)
            })
            .catch((error) => {
                //console.log(error)
            })
    }

    getCurrentMenuList() {
        axios.get('http://localhost:5000/api/availableMenu/' + this.props.currentDate)
            .then((response) => {
                //console.log(response);
                if (response.data != null) {

                    //console.log(response.data.availableMenu)
                    this.props.onAdminArrayUpdate(response.data.availableMenu)
                    // //console.log(this.props.newMenuAdmin)
                    this.props.onListDownload(response.data.availableMenu)

                    console.log("ПОЛУЧИЛ НЕ ПУСТОТУ")
                    console.log(response.data)
                    this.setState({
                        cardsArray:  response.data.availableMenu,
                        checkedB: !JSON.parse(response.data.ordering),
                        selectionDisabled: JSON.parse(response.data.ordering)

                    })
                } else {
                    console.log("ПОЛУЧИЛ  ПУСТОТУ")
                    console.log("Заполняю пустое доступное меню")

                    this.makeEmptyAdminArray()
                }

            })
            .catch(function (error) {
                // //console.log(error);
            });

    }

    componentWillMount() {
        //TODO: LATTER MAKE REQUEST TO SERVER TO GET BALANCE AND EMAIL

        this.getOptionsList()
        this.getCurrentMenuList()
    }

    handleChange = name => event => {
        console.log("CLICK");
        console.log(name)
        // console.log(event.target.checked)
        console.log(this.state)
        // this.setState({[name]: event.target.checked});
        // //console.log(name, event.target.checked)
        //TODO stash to database

        this.setState({
            checkedB: event.target.checked,
            selectionDisabled: !event.target.checked
        })
        axios.put('http://localhost:5000/api/availableMenu/status/' + this.props.currentDate, {ordering: !event.target.checked})
            .then((response) => {
                console.log(response);
                // this.setState({
                //     modalProps: response.data
                // })
            })
            .catch(function (error) {
                console.log(error);
            });

    };


    makeEmptyAdminArray() {
        const adminArray = []
        console.log('ОБНУЛЕНИЯ МАССИВА ДЛЯ ОТПРАВКИ В СИНГ КАРД')
        for (let cardNum = 0; cardNum <= 3; cardNum++) {
            adminArray[cardNum] = [
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
            ]
        }
        this.setState({
            cardsArray: adminArray
        })
        this.props.onAdminArrayUpdate(adminArray)

    }

    render() {
        // //console.log("ADMIN IS DISABLED" + this.state.selectionDisabled)
        //console.log("V RENDERE AVAILABLE MENU")

        let cardsArray = [];
        const {classes} = this.props;
        let adminArray = this.state.cardsArray
        console.log(this.state)

        // console.log("this.state.cardsArray")
        // console.log(this.state.cardsArray)
        if (adminArray.length === 0) {
            this.makeEmptyAdminArray()
        }


        for (let variable = 0; variable <= 3; variable++) {

            //console.log('RENDERING')
            //TODO GET ADMIN ARRAY FROM  BACKEND Else
            //console.log(adminArray)
            //console.log(adminArray[variable])
            // console.log("adminArray.length")
            // console.log(adminArray.length)


            //console.log("PERED PUSH")
            //console.log(adminArray)
            //console.log(adminArray[variable])
            cardsArray.push(
                <Grid key={variable} item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <SingleCard isDisbled={this.state.selectionDisabled} key={variable} card={variable}
                                    cardState={adminArray[variable]}
                                    options={this.state.dishesList}/>
                    </Paper>
                </Grid>
            )
        }


        return (
            <div>
                <Navigation/>
                <div className="admin-container">
                    <div className="button-block">
                        <FormGroup row className="button-item-cover">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.checkedB}
                                        onChange={this.handleChange('checkedB')}
                                        value="checkedB"
                                        color="primary"
                                    />
                                }
                                label=""
                            />
                        </FormGroup>
                    </div>
                    <div className='cards-container'>
                        <div className={classes.root}>
                            <Grid container spacing={24}>
                                {cardsArray}
                            </Grid>
                        </div>
                    </div>

                </div>

                <div>
                    <AdminSecond/>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        adminArray: state.newMenuAdmin,
        userBalance: state.userBalance,
        currentDate: state.currentDate,
        availableMenu: state.availableMenu,

    }),
    dispatch => ({
        onListDownload: (array) => {
            dispatch({type: 'AVAILABLE_MENU_DOWNLOAD', payload: array})
        },
        onUserBalanceUpdate: (array) => {
            dispatch({type: 'USER_BALANCE_UPDATE', payload: array})
        },
        onAdminArrayUpdate: (array) => {
            dispatch({type: 'ADMIN_ARRAY_UPDATE', payload: array})
        },

    })
)(withRouter(withStyles(styles)(admin)));