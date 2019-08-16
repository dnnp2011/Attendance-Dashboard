import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AttendancePage from './containers/AttendancePage';
import RosterPage from './containers/RosterPage';


/**
 * The root App Component consists only of the Navbar and either RosterPage or AttendancePage depending on the current url endpoint
 */
function App() {
    return (
        <div className='App'>
            <NavBar />
            {/* Using React-Router to handle page navigation */ }
            <Router>
                <Route exact path={ '/' } component={ RosterPage } />
                <Route exact path={ '/attendance' } component={ AttendancePage } />
            </Router>
        </div>
    );
}

export default App;
