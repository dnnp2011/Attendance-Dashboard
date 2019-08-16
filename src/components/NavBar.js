import { AppBar, Button, Grid, Link, Toolbar, Typography, withTheme } from '@material-ui/core';
import React from 'react';
import logo from '../assets/images/nvps-logo.png';


/**
 * Renders the application's Navigation Bar, including the brand icon, and navigation links
 * @param props
 * @returns NavBar
 */
function NavBar(props) {
    return (
        <AppBar position='static' style={ { backgroundColor : props.theme.palette.primary.dark, marginBottom : '1.5rem' } }>
            <Toolbar>
                {/* The New Visions logo acts as a link to the home page */ }
                <Link href={ '/' } style={ { marginLeft : '0', marginRight : 'auto' } }>
                    <img src={ logo } className={ 'navbar-logo' } alt={ 'New Visions for Public Schools' } />
                </Link>
                <Grid container spacing={ 6 } justify={ 'flex-end' } alignContent={ 'flex-end' } alignItems={ 'flex-end' } className={ 'navbar-links' } style={ { marginRight : '2rem' } }>
                    {/* Nav Buttons */ }
                    <Grid item xs={ 2 }>
                        <Button variant={ 'outlined' } href={ '/' } color='inherit'>
                            <Typography component={ 'h4' }>
                                Roster
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={ 2 }>
                        <Button variant={ 'outlined' } href={ '/attendance' } color='inherit'>
                            <Typography component={ 'h4' }>
                                Attendance
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default withTheme(NavBar);