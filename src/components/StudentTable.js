import { Grid, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, useTheme, withStyles, withTheme } from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import React from 'react';


/**
 * Applies custom styles to the head and body sub-components of the TableCell component
 */
const StyledTableCell = withStyles(theme => ({
    head : {
        backgroundColor : theme.palette.primary.light,
        color : theme.palette.common.white,
    },
    body : {
        fontSize : 14,
    },
}))(TableCell);

/**
 * Applies styling to TableRows such that every other row is lighter color
 */
const StyledTableRow = withStyles(theme => ({
    root : {
        '&:nth-of-type(odd)' : {
            backgroundColor : theme.palette.background.default,
        },
    },
}))(TableRow);

/**
 * Declare custom styles that can be assigned to components. Usually bound to a 'classes' variable within components.
 * This particular function sets the styles for the StudentTable
 */
const useStyles = makeStyles(theme => ({
    root : {
        width : '100%',
        marginTop : theme.spacing(3),
        overflowX : 'auto',
    },
    table : {
        minWidth : 700,
    },
    tableWrapper : {
        overflowX : 'auto',
    },
}));

/**
 * Declare custom styles that can be assigned to components. Usually bound to a 'classes' variable within components.
 * This particular function sets the styles for the TablePaginationActions
 */
const useStyles1 = makeStyles(theme => ({
    root : {
        flexShrink : 0,
        color : theme.palette.text.secondary,
        marginLeft : theme.spacing(2.5),
    },
}));


/**
 * Renders the table's pagination interface, as well as handles the internal state of the current page
 */
function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    /**
     * Jumps the table to the very first page
     */
    function handleFirstPageButtonClick(event) {
        onChangePage(event, 0);
    }

    /**
     * Moves the table back one page
     */
    function handleBackButtonClick(event) {
        onChangePage(event, page - 1);
    }

    /**
     * Moves the table forward one page
     */
    function handleNextButtonClick(event) {
        onChangePage(event, page + 1);
    }

    /**
     * Jumps the table to the very last page
     */
    function handleLastPageButtonClick(event) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <Grid container direction={ 'row' } alignContent={ 'center' } justify={ 'center' } alignItems={ 'center' } className={ classes.root }>
            <Grid item xs>
                <IconButton
                    onClick={ handleFirstPageButtonClick }
                    disabled={ page === 0 }
                    aria-label='first page'
                >
                    {/* These theme.direction checks are an accessibility feature for locales that read text right to left */ }
                    { theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon /> }
                </IconButton>
            </Grid>
            <Grid item xs>
                <IconButton onClick={ handleBackButtonClick } disabled={ page === 0 } aria-label='previous page'>
                    { theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft /> }
                </IconButton>
            </Grid>
            <Grid item xs>
                <IconButton
                    onClick={ handleNextButtonClick }
                    disabled={ page >= Math.ceil(count / rowsPerPage) - 1 }
                    aria-label='next page'
                >
                    { theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight /> }
                </IconButton>
            </Grid>
            <Grid item xs>
                <IconButton
                    onClick={ handleLastPageButtonClick }
                    disabled={ page >= Math.ceil(count / rowsPerPage) - 1 }
                    aria-label='last page'
                >
                    { theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon /> }
                </IconButton>
            </Grid>
        </Grid>
    );
}

/**
 * Combines the pagination interface and the results table in a single component. Uses React state hooks to keep track of the current page, as well as user-defined rows per page.
 */
function StudentTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.students.length - page * rowsPerPage);

    // Called when the user navigates between table pages
    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    // Called when user selects a different rows-per-page value from the dropdown
    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    // The data returns as columns in the StudentTable can be expanded by simply adding a new StyledTableCell component to both the TableHead and TableBody blocks. (and setting their proper values of course)
    return (
        <Grid container direction={ 'column' } alignContent={ 'center' } justify={ 'center' } alignItems={ 'center' } spacing={ 0 }>
            <Grid item xs={ 12 } className={ classes.tableWrapper }>
                <Paper className={ classes.root }>
                    <Table className={ classes.table }>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align='right'>Attendance Percentage</StyledTableCell>
                                <StyledTableCell align='right'>Student ID</StyledTableCell>
                                <StyledTableCell align='right'>Grade</StyledTableCell>
                                <StyledTableCell align='right'>Advisor</StyledTableCell>
                                <StyledTableCell align='right'>School Name</StyledTableCell>
                                <StyledTableCell align='right'>Home Number</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { props.students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(student => {
                                const name = `${ student.firstName } ${ student.lastName }`;

                                return (
                                    <StyledTableRow key={ name }>
                                        <StyledTableCell component='th' scope='row'>
                                            { name }
                                        </StyledTableCell>
                                        <StyledTableCell align='right'>{ student.attendancePercentage }</StyledTableCell>
                                        <StyledTableCell align='right'>{ student.studentId }</StyledTableCell>
                                        <StyledTableCell align='right'>{ student.grade }</StyledTableCell>
                                        <StyledTableCell align='right'>{ student.advisor }</StyledTableCell>
                                        <StyledTableCell align='right'>{ student.schoolName }</StyledTableCell>
                                        <StyledTableCell align='right'>{ student.homePhoneNumber }</StyledTableCell>
                                    </StyledTableRow>
                                );
                            }) }

                            {/* Keeps track of empty rows to maintain consistent spacing even when viewing a partially filled table */ }
                            { emptyRows > 0 && (
                                <TableRow style={ { height : 48 * emptyRows } }>
                                    <TableCell colSpan={ 5 } />
                                </TableRow>
                            ) }
                        </TableBody>
                        <TableFooter style={ { margin : '1.5rem', overflow : 'hidden', borderBottom : 'hidden' } }>
                            <TableRow style={ { overflow : 'hidden' } }>
                                {/* This TablePagination component is part of the Material-UI/Core package. It greatly eases the process of adding advanced features like this. */ }
                                <TablePagination
                                    style={ { maxWidth : '100%' } }
                                    rowsPerPageOptions={ [5, 10, 15] }
                                    colSpan={ 5 }
                                    count={ props.students.length }
                                    rowsPerPage={ rowsPerPage }
                                    page={ page }
                                    SelectProps={ {
                                        inputProps : { 'aria-label' : 'rows per page' },
                                        native : true,
                                    } }
                                    onChangePage={ handleChangePage }
                                    onChangeRowsPerPage={ handleChangeRowsPerPage }
                                    ActionsComponent={ TablePaginationActions }
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default withTheme(StudentTable);