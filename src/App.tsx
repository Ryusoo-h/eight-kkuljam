import HeaderBox from './components/HeaderBox';
import './App.css';
import TodayState from './components/TodayState';
import TotalState from './components/TotalState';
import TotalStateFormModal from './components/TodayStateFormModal';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { todayDataType } from './types/dataType';

const TodayStateFormButton = styled.button`
  
`;

function App() {

  const [openModal, setOpenModal] = useState<boolean>(false);
  
  const [monthlyData, setMonthlyData] = useState<todayDataType[]>([]);

  const [todayData, setTodayData] = useState<todayDataType>({
    year: 2023,
    month: 0,
    date: 0,
    hour: 0,
    minute: 0,
    state: 0
  });

  useEffect(() => {
    const today = new Date();
    const [year, month, date] = [
      today.getFullYear(),
      (today.getMonth() + 1),
      today.getDate(),
    ];
    setTodayData({...todayData, year, month, date});
    // 오늘 데이터가 있는지 확인 : 서버에서 오늘 데이터 찾기
    // 있으면 데이터 변경
  },[openModal]);

  useEffect(()=> {
    console.log(todayData);
  }, [todayData]);



  return (
    <div className="App">
      <HeaderBox />
      <TodayState todayData={todayData} />
      <TodayStateFormButton className="basic-button" onClick={() => {setOpenModal(true);}}>오늘 수면시간 입력하기</TodayStateFormButton>
      <TotalStateFormModal openModal={openModal} setOpenModal={setOpenModal} todayData={todayData} setTodayData={setTodayData} />
      <TotalState />
    </div>
  );
}

export default App;
