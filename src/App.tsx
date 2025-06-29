import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ResponsiveLayout from './components/ResponsiveLayout';

const App = () => {
  return (
    <Router>
      <div className="app">
        <ResponsiveLayout />
      </div>
    </Router>
  );
};

export default App;
