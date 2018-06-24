import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
// import {connect} from "react-redux";
import axios from "axios/index";

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const {classes, count, page, rowsPerPage, theme} = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
    TablePaginationActions,
);

let counter = 0;

function createData(name, calories, fat) {
    counter += 1;
    return {id: counter, name, calories, fat};
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class CustomPaginationActionsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 5,
            statsList: '',
            displayList: ''

        };
        // this.onStatsUpdate = this.onStatsUpdate.bind(this)
    }

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };


    getList() {
        let userEmail = localStorage.getItem('email')
        axios.get('http://localhost:5000/api/orderStore/' + userEmail)
            .then((response) => {
                this.setState({
                    statsList: response.data
                })
            })
            .then(() => {
                // console.log('STATS')
                // console.log(this.state.statsList)
                this.handleStatsOrderArray(this.state.statsList)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentWillMount() {
        //TODO: LATTER MAKE REQUEST TO SERVER TO GET BALANCE AND EMAIL
        this.getList()
    }


    handleStatsOrderArray = (array) => {
        let finalArray = []
        finalArray = array.map((item) => {
            let finalElement = {
                date: '',
                orderNumber: '',
                orderTitle: ''
            }
            let summary = item.order.map((element, index) => {
                return element.title
            })
            // console.log(summary)
            finalElement.date = item.date
            finalElement.orderNumber = 1 + Number(item.orderNumber)
            finalElement.orderTitle = `${summary}`
            return finalElement
        })
        this.setState({
            displayList: finalArray
        })
    }


    render() {
        const {classes} = this.props;
        const {rowsPerPage, page} = this.state;
        let emptyRows = 0

        let displayArray = []
        if (this.state.displayList.length > 0) {
            displayArray = this.state.displayList.map((item) => {
                return createData(item.date, item.orderNumber, item.orderTitle)
            })
            emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.displayList.length - page * rowsPerPage);
        }

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    ДАТА
                                </TableCell>
                                <TableCell numeric>НОМЕР ОБЕДА</TableCell>
                                <TableCell numeric>ОПИСАНИЕ ОБЕДА</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            {displayArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                return (
                                    <TableRow key={n.id}>
                                        <TableCell component="th" scope="row">
                                            {n.name}
                                        </TableCell>
                                        <TableCell numeric>{n.calories}</TableCell>
                                        <TableCell numeric>{n.fat}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 48 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={this.state.statsList.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);