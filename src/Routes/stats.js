import React, {Component} from 'react';
import Navigation from '../Components/Navigation'

import CustomPaginationActionsTable from '../Components/Statistics/CustomPaginationActionsTable'
// import axios from "axios/index";
import {withStyles} from "@material-ui/core/styles/index";
import {withRouter} from "react-router-dom";
// import {connect} from "react-redux";


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


class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statsList: ''
        }
    }





    render() {
        console.log(this.state.statsList)

        return (
            <div>
                <Navigation/>
                <div className='admin-container'>
                    <CustomPaginationActionsTable statsList={this.state.statsList} />
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Stats));
