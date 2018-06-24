import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});


class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultData: [0, 0, 0, 0]
        }
    }


    createData(name, quantity, id) {
        return {id, name, quantity};
    }


    // const data = [
    //     createData('МЕНЮ 1', resultData[0] ),
    //     createData('МЕНЮ 2', resultData[1]),
    //     createData('МЕНЮ 3', resultData[2]),
    //     createData('МЕНЮ 4', resultData[3]),
    // ];

    render() {
        const {props, classes} = this.props;

        // console.log("DATA")
        // console.log(data)
        // console.log(this.state.resultData)
        //
        // console.log(this.props.modalProps)
        // var
        var inComeData = this.props.modalProps
        let emptyArray = this.state.resultData
        if (inComeData.length > 0) {
            inComeData.forEach(function (elem) {
                    emptyArray[elem.orderNumber]++
                }
            )
        }
        let dataArray

        const data = this.state.resultData.map((item, id) => {

            console.log(this.createData("МЕНЮ " + (id + 1), item, id));
            return this.createData("МЕНЮ " + (id + 1), emptyArray[id], id)
        })


        if (data.length > 3) {
            // console.log(data)
            dataArray = data.map((n, index) => (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {n.name}
                    </TableCell>
                    <TableCell numeric>{n.quantity}</TableCell>
                </TableRow>
            ))
        }


        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Номер заказа</TableCell>
                            <TableCell numeric>Количество</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {dataArray}


                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);