import { Grid, Input, makeStyles, Slider, Typography, withTheme } from '@material-ui/core';
import React, { useState } from 'react';
import students from '../assets/data/students';
import StudentTable from '../components/StudentTable';

// Declares custom styles. Usually assigned to a 'classes' variable and passed as classNames
const useStyles = makeStyles({
    root : {
        width : '20%',
        margin : '1.5rem',
    },
    input : {
        width : 42,
    },
});

/**
 * Renders the attendance table. Filters students.json on-the-fly based on the internal state representing the slider (or input) value.
 */
function AttendancePage(props) {
    const classes = useStyles();
    // Using state hooks to declare attendanceValue, and the setAttendanceValue function to update it
    const [attendanceValue, setAttendanceValue] = useState(80);
    // Here, the raw student data is filtered based upon attendancePercentage
    let filteredStudents = students.filter(student => student.attendancePercentage <= attendanceValue ? student : null);

    // Invoked when the user adjusts the slider position
    const handleSliderChange = (event, newValue) => {
        setAttendanceValue(newValue);
    };

    // Invoked when the user manually enters a number in the input box
    const handleInputChange = event => {
        setAttendanceValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    // Ensures that the slider value stays within a realistic range, and prevent any strange bugs as a result.
    const handleBlur = () => {
        if (attendanceValue < 0) {
            setAttendanceValue(0);
        }
        else if (attendanceValue > 100) {
            setAttendanceValue(100);
        }
    };


    return (
        <Grid container direction={ 'column' } justify={ 'center' } alignContent={ 'center' } alignItems={ 'center' } spacing={ 8 }>
            <Grid container direction={ 'row' } justify={ 'center' } alignItems={ 'center' } alignContent={ 'center' } spacing={ 0 } className={ classes.root }>
                <Grid item xs>
                    <Typography id='input-slider' component={ 'h2' } gutterBottom>
                        Minimum Attendance Percentage
                    </Typography>
                    <Grid container direction={ 'row' } spacing={ 4 } alignContent={ 'center' } justify={ 'center' }>
                        <Grid item xs={ 10 }>
                            <Slider
                                value={ typeof attendanceValue === 'number' ? attendanceValue : 0 }
                                onChange={ handleSliderChange }
                                aria-labelledby='input-slider'
                                style={ { minWidth : '15rem' } }
                            />
                        </Grid>
                        <Grid item xs={ 2 }>
                            <Input
                                className={ classes.input }
                                value={ attendanceValue }
                                margin='dense'
                                onChange={ handleInputChange }
                                onBlur={ handleBlur }
                                inputProps={ {
                                    step : 1,
                                    min : 0,
                                    max : 100,
                                    type : 'number',
                                    'aria-labelledby' : 'input-slider',
                                } }
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {
                // Perform a check to only render the StudentTable if there are students matching the attendance value
                filteredStudents.length > 0
                ? <StudentTable students={ filteredStudents } />
                : <Grid container direction={ 'column' } alignContent={ 'center' } justify={ 'center' } color={ 'danger' } style={{height: '100%', margin: '3rem'}}>
                    <Grid item xs={ 8 }>
                        <Typography variant={ 'h4' } component={ 'h4' } gutterBottom style={ { color : props.theme.palette.secondary.light } }>
                            No results found...
                        </Typography>
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}

// The AttendancePage component is exported through withTheme - a Higher Order Component from Material-UI/Core that allows access to the built in theme object from the component's props
export default withTheme(AttendancePage);