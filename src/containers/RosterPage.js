import { Grid } from '@material-ui/core';
import React from 'react';
import students from '../assets/data/students';
import StudentTable from '../components/StudentTable';


/**
 * Renders the RosterPage containing a table of all students in the data set. Included for additional variety.
 */
function RosterPage() {
    return (
        <Grid container direction={ 'row' } alignContent={ 'center' } justify={ 'center' } alignItems={ 'center' }>
            <StudentTable students={ students } />
        </Grid>
    );
}

export default RosterPage;