import React, {Component} from 'react';
import Navigation from '../Components/Navigation'

// import SingleSelect from '../Components/Admin/SingleSelect'
import SingleCard from '../Components/Admin/SingleCard'
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


class adminFirst extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dishesList: '',
            checkedB: true,
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

    componentWillMount() {
        //TODO: LATTER MAKE REQUEST TO SERVER TO GET BALANCE AND EMAIL
        this.getList()
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
        console.log(name, event.target.checked)
        //TODO stash to database
        setTimeout(this.props.history.push("/admin/2"), 1000)

    };


    render() {
        let cardsArray = [];
        const {classes} = this.props;
        for (let variable = 0; variable <= 3; variable++) {
            let adminArray = this.props.adminArray
            // console.log('RENDERING')
            // console.log(adminArray)
            if (adminArray.length == 0) {
                for (let cardNum = 0; cardNum <= 3; cardNum++) {
                    adminArray[cardNum] = [
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
                    ]
                }

                // console.log(adminArray)
            }
            cardsArray.push(
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <SingleCard key={variable} card={variable} cardState={adminArray[variable]}
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

                </div>
            </div>
        );
    }
}

// export default registration;
export default connect(
    state => ({
        adminArray: state.adminArray,
        userBalance: state.userBalance
    }),
    dispatch => ({
        onUserBalanceUpdate: (array) => {
            dispatch({type: 'USER_BALANCE_UPDATE', payload: array})
        },
        onAdminArrayUpdate: (array) => {
            dispatch({type: 'ADMIN_ARRAY_UPDATE', payload: array})
        },

    })
)(withRouter(withStyles(styles)(adminFirst)));
// export default (FullWidthGrid);