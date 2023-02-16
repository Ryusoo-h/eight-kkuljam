import HeaderBox from './components/HeaderBox';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import { useRef, useState } from 'react';
import TotalStatePage from './page/TotalStatePage';


function App() {
  const [openTotalPage, setOpenTotalPage] = useState<boolean>(false);
  const todayDate = useRef<string>('');
  return (
    <Routes>
      <Route element={<HeaderBox />}>
        <Route path="/" element={<Home todayDate={todayDate} openTotalPage={openTotalPage} setOpenTotalPage={setOpenTotalPage} />}>
          <Route path="/totalState/:monthly" element={<TotalStatePage openPage={openTotalPage} setOpenPage={setOpenTotalPage} todayDate={todayDate.current} />} />
        </Route>
      </Route>
    </Routes>

  );
}

export default App;
