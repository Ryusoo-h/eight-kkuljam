import HeaderBox from './components/HeaderBox';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './page/Home';
import { useEffect, useRef, useState } from 'react';
import TotalStatePage from './page/TotalStatePage';


function App() {
  const [openTotalPage, setOpenTotalPage] = useState<boolean>(false);
  const todayDate = useRef<string>('');
  const [standardDate, setStandardDate] = useState<{year: number, month: number}>({year: 0, month: 0});
  const navigate = useNavigate();

  useEffect(()=> {
    console.log(standardDate.year, "-", standardDate.month);
    if (standardDate.year === 0) {
      console.log('처음');
      setStandardDate({year: parseInt(todayDate.current.slice(0, 4)), month: parseInt(todayDate.current.slice(6, 8))});
    } else {
      console.log('처음아님');
      navigate(`/totalState/${standardDate.year}-${standardDate.month}`);
    }
  },[standardDate])

  return (
    <Routes>
      <Route element={<HeaderBox />}>
        <Route path="/" element={<Home todayDate={todayDate} openTotalPage={openTotalPage} setOpenTotalPage={setOpenTotalPage} standardDate={standardDate} />}>
          <Route path="/totalState/:monthly" element={<TotalStatePage openPage={openTotalPage} todayDate={todayDate.current} standardDate={standardDate} setStandardDate={setStandardDate} />} />
        </Route>
      </Route>
    </Routes>

  );
}

export default App;
