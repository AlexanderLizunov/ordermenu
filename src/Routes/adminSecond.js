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
            userList: '',
            checkedB: false,

        }
    }

    getList() {
        axios.get('../users.json')
            .then((response) => {
                // this.props.onListDownload(response.data)

                // this.orderBlanker(response.data)
                this.setState({
                    userList: response.data
                })
                console.log(this.state.userList)
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
        // this.setState({ [name]: event.target.checked });
        console.log( name , event.target.checked)
        setTimeout(this.props.history.push("/admin/1"), 1000)

    };


    render() {
        let cardsArray = [];
        const {classes} = this.props;


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
                    {/*<div className='cards-container'>*/}
                        {/*<div className={classes.root}>*/}
                            {/*<Grid container spacing={24}>*/}
                                {/*{cardsArray}*/}
                            {/*</Grid>*/}
                        {/*</div>*/}
                    {/*</div>*/}

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