import HeaderBox from './components/HeaderBox';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import TotalStatePage from './page/TotalStatePage';

function App() {
  return (
    <Routes>
      <Route element={<HeaderBox />}>
        <Route path="/" element={<Home />}>
          <Route path="/totalState/:monthly" element={<TotalStatePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
