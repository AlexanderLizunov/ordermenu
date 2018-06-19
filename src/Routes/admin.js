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
            selectionDisabled: false
        }
    }

    getList() {
        axios.get('../dishes.json')

            .then((response) => {
                // this.props.onListDownload(response.data)

                // this.orderBlanker(response.data)
                this.setState({
                    dishesList: response.data
                })
                // console.log(this.state.dishesList)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getCurrentMenuList() {
        axios.get('http://localhost:5000/api/availableMenu/' + this.props.currentDate)
            .then( (response)=> {
                console.log(response);
                if (response.data != null) {
                    console.log("ПОЛУЧИЛ НЕ ПУСТОТУ")

                    console.log(response.data.availableMenu)
                    // this.props.onAdminArrayUpdate(response.data.availableMenu)
                    // console.log(this.props.newMenuAdmin)
                    this.props.onListDownload(response.data.availableMenu)
                    console.log(this.props.availableMenu)
                } else {
                    console.log("ПОЛУЧИЛ  ПУСТОТУ")

                }

            })
            .catch(function (error) {
                // console.log(error);
            });
    }

    componentWillMount() {
        //TODO: LATTER MAKE REQUEST TO SERVER TO GET BALANCE AND EMAIL

        this.getList()
        this.getCurrentMenuList()
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
        // console.log(name, event.target.checked)
        //TODO stash to database

        this.setState({
            selectionDisabled: !this.state.selectionDisabled
        })

        // setTimeout(this.props.history.push("/admin/2"), 1000)
        // console.log("ADMIN IS DISABLED" + this.state.selectionDisabled)
    };


    render() {
        // console.log("ADMIN IS DISABLED" + this.state.selectionDisabled)
        console.log("V RENDERE AVAILABLE MENU")
        console.log(this.props)

        let cardsArray = [];
        const {classes} = this.props;
        for (let variable = 0; variable <= 3; variable++) {
            let adminArray = this.props.adminArray
            // console.log('RENDERING')
            //TODO GET ADMIN ARRAY FROM  BACKEND Else
            // console.log(adminArray)
            if (adminArray.length === 0) {
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

                // console.log(adminArray)
            }
            cardsArray.push(
                <Grid item xs={12} sm={6} key={variable}>
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