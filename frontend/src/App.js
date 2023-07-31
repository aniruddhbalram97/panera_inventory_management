import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./Components/Offcanvas";

import LoginContainer from './Components/Login/LoginContainer';

import DetailedView from './Components/Detailed_View/DetailedView'
import TableView from './Components/Table_View/TableView'
import VisualizationView from './Components/Visualization_View/VisualizationView'

function App() {
  return (
    <Router>
      <div>
        {/* <Sidebar/> */}
        <Routes>
              {/* <Route exact path='/dashboard' element={<Dashboard/>} /> */}
              {/* <Route exact path='/' element={<LoginContainer/>}/> */}
              <Route exact path='/' element={<DetailedView/>} />
              <Route path='/dashboard/detailed_view' element={<DetailedView/>} />
              <Route path='/dashboard/table_view' element={<TableView/>} />
              <Route path='/dashboard/visualization_view' element={<VisualizationView/>} /> 
        </Routes>
      </div>

    </Router>
  );
}

export default App;
