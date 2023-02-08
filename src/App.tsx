import HeaderBox from './components/HeaderBox';
import './App.css';
import TodayState from './components/TodayState';
import TotalState from './components/TotalState';
import TotalStateFormModal from './components/TodayStateFormModal';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { todayDataType } from './types/dataType';

const TodayStateFormButton = styled.button`
  
`;

function App() {
  const todayDate = useRef('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  // const [monthlyData, setMonthlyData] = useState<todayDataType[]>([]);
  
  const initialHour = 24; // state를 바꿔주는 switch문에 걸리지 않도록 하기 위함

  const [todayData, setTodayData] = useState<todayDataType>({
    year: 0,
    month: 0,
    date: 0,
    hour: initialHour,
    minute: 0,
    state: 0
  });

  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) { // 첫 로딩시
      console.log('첫 로딩시 : ', todayData);
      const today = new Date();
      const [year, month, date] = [today.getFullYear(), (today.getMonth() + 1), today.getDate()];
      setTodayData({...todayData, year, month, date});
      todayDate.current = `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
      console.log('날짜 업데이트 완료', todayDate.current, year, month, date);
      didMount.current = true;
      // TODO 서버에서 오늘 데이터 찾기
      // 있으면 데이터 변경
      // 지금은 테스트를 위해 localStorage에서 찾겠음
      const localTodayData = localStorage.getItem(todayDate.current);
      localTodayData && setTodayData(JSON.parse(localTodayData));
    } else if (todayData.state !== 0) { // 오늘 날짜 수면시간을 기록했을 때
      // TODO todayData를 서버에 저장해야지
      // 지금은 테스트를 위해 localstorage에 저장하쥬
      localStorage.setItem(todayDate.current, JSON.stringify(todayData));
    } else {
      console.log('todayData변화가 있을때 마다 : ', todayData);
    }
  },[todayData])

  useEffect(()=> { 
    if (didMount.current && todayData.hour !==initialHour) {
      console.log('시간입력 후 state 업데이트');
      switch(todayData.hour) {
        case 0:
        case 1:
        case 2:
        case 3:
          setTodayData({...todayData, state:3});
          break;
        case 4:
          setTodayData({...todayData, state:4});
          break;
        case 5:
          setTodayData({...todayData, state:5});
          break;
        case 6:
          setTodayData({...todayData, state:6});
          break;
        case 7:
          setTodayData({...todayData, state:7});
          break;
        case 8:
          setTodayData({...todayData, state:8});
          break;
        default:
          setTodayData({...todayData, state:8});
      }
    }
  }, [todayData.hour, todayData.minute]);



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
