# New Visions Code Challenge
##### _by Dalton Pierce_


### Getting Started

###### *Note: All commands should be entered from the root directory*
1. Install dependencies ```npm install```
2. Launch the application ```npm run start```
3. If your browser doesn't open automatically, navigate to ```localhost:3000``` to view the application



### Features
1. Appealing aesthetic using meterial design
2. Roster and Attendance pages
3. Implemented extensible page navigation using react-router
4. Utilizes pagination to display a large number of results on a single page
5. Adjustable rows-per-page value for pagination
6. Adjustable slider to set the attendance percentage to filter by
7. Backup input box to manually enter attendance percentage
8. Changes to the attendance percentage result in an immediate re-render of the results table
9. Includes New Vision's own favicon and logo


### Design Choices

* I chose to utilize react-router to implement page navigation as it makes it a simple matter to add additional routes down the road.
* The students.json file is being imported internally in order to avoid creating an endpoint that returns sensitive student data to anyone who happens upon the right URL.
* I used Material-UI/Core to create the modern material-design look.
* I considered using a virtual list implementation to display student results, however I felt that might be overkill for a dataset this small, and instead opted for pagination.
* Every element of the application uses functional components and React hooks, where necessary, to manage component state. React hooks help eliminate some boilerplate, are easier to read and understand (because there are no lifecycle methods), and are slightly more performant.
* Uses flex-box for page layout. While not as powerful as the newer CSS Grids specification, flex-box is great for very quickly moving elements around in an intuitive way.
* I chose to use a variety of methods for applying styles: style injections (using withStyles or makeStyles), CSS-in-JS (inline style declarations), and a traditional CSS file.
