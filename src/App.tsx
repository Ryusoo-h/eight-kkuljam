import HeaderBox from './components/HeaderBox';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './page/Home';
import { useEffect, useRef, useState } from 'react';
import TotalStatePage from './page/TotalStatePage';
import { selectedDataType } from './types/dataType';


function App() {
  const [openTotalPage, setOpenTotalPage] = useState<boolean>(false);
  const [openAddInsertModal, setOpenAddInsertModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<selectedDataType>({
    year: 0,
    month: 0,
    date: 0,
    hour: 0,
    minute: 0
  });
  
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
        <Route path="/" 
          element={<Home 
            todayDate={todayDate}
            openTotalPage={openTotalPage}
            setOpenTotalPage={setOpenTotalPage}
            standardDate={standardDate}
            openAddInsertModal={openAddInsertModal}
            setOpenAddInsertModal={setOpenAddInsertModal}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />}
        >
          <Route path="/totalState/:monthly" 
            element={<TotalStatePage 
              openPage={openTotalPage}
              todayDate={todayDate.current}
              standardDate={standardDate}
              setStandardDate={setStandardDate}
              setOpenAddInsertModal={setOpenAddInsertModal}
            />}
          />
        </Route>
      </Route>
    </Routes>

  );
}

export default App;
