import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailedView from './Components/Detailed_View/DetailedView'
import TableView from './Components/Table_View/TableView'
import VisualizationView from './Components/Visualization_View/VisualizationView'
import Dashboard from './Dashboard';
function App() {
  return (
    <Router>
      <div>
        <Dashboard/>
        <Routes>
              <Route exact path='/dashboard' element={<Dashboard/>} />
              <Route path='/dashboard/detailed_view' element={<DetailedView/>} />
              <Route path='/dashboard/table_view' element={<TableView/>} />
              <Route path='/dashboard/visualization_view' element={<VisualizationView/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
