import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Main from './Pages/Main'
import Home from './Pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
