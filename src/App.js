import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AttendancePage from './containers/AttendancePage';
import RosterPage from './containers/RosterPage';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* Using React-Router to handle page navigation */}
      <Router>
        <Route exact path={ '/' } component={ RosterPage }/>
        <Route exact path={ '/attendance' } component={ AttendancePage }/>
      </Router>
    </div>
  );
}

export default App;
