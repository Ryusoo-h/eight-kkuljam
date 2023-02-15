
import styled from 'styled-components';
import TodayState from '../components/TodayState';
import TodayStateFormModal from '../components/TodayStateFormModal';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { todayDataType } from '../types/dataType';
import TotalStatePage from './TotalStatePage';
import { Outlet, useNavigate } from 'react-router-dom';


const TotalStateWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 344px;
    overflow: hidden;
`;
const TodayStateFormModalButton = styled.button`
    &.done {
        background-color: #f9d3d4;
        &:hover {
            background-color: #ffb5b5;
        }
    }
`;
const TotalToggleButton = styled.button`
    width: 100%;
    background-color: #fff;
    color: #333;
    font-size: 20px;
    &:hover {
        background-color: #fff;
        color: #000;
    }
    &::after {
        content: '';
        display: inline-block;
        width: 12px;
        height: 9px;
        box-sizing: border-box;
        border-bottom: solid 9px #333;
        border-left: solid 6px transparent;
        border-right: solid 6px transparent;
        vertical-align: top;
        margin: 14px 10px 0 10px;
    }
    &.opened::after {
        border-bottom: none;
        border-top: solid 9px #333;
    }
`;

type homeType = {
    todayDate: MutableRefObject<string>,
    openTotalPage: boolean,
    setOpenTotalPage: (isOpen:boolean)=>void;
}

const Home = ({todayDate, openTotalPage, setOpenTotalPage}:homeType) => {
    const navigate = useNavigate();

    const [openTodayInsertModalModal, setOpentodayInsertModal] = useState<boolean>(false);
    
    // const [monthlyData, setMonthlyData] = useState<todayDataType[]>([]);
    
    const initialHour = useRef<number>(24); // state를 바꿔주는 switch문에 걸리지 않도록 하기 위함

    const [todayData, setTodayData] = useState<todayDataType>({
        year: 0,
        month: 0,
        date: 0,
        hour: initialHour.current,
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
        if (didMount.current && todayData.hour !==initialHour.current) {
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
            <TodayState todayData={todayData} />

            {todayData.state === 0 ? (
                <TodayStateFormModalButton className="basic-button" onClick={() => {setOpentodayInsertModal(true); navigate('/total-state/2023-2');}}>
                    오늘 수면시간 입력하기
                </TodayStateFormModalButton>
            ) : (
                <TodayStateFormModalButton className="basic-button done" onClick={() => {setOpentodayInsertModal(true);}}>
                    오늘 수면시간 수정하기
                </TodayStateFormModalButton>
            )}
            
            <TotalStateWrapper>
                {openTotalPage ? (
                    <TotalToggleButton className="basic-button opened" onClick={() => {setOpenTotalPage(false);}}>수면시간 기록 닫아두기</TotalToggleButton>
                ) : (
                    <TotalToggleButton className="basic-button" onClick={() => {setOpenTotalPage(true); navigate('/totalState/202302')}}>수면시간 기록 전체보기</TotalToggleButton>
                )}
                <Outlet />
            </TotalStateWrapper>
            <TodayStateFormModal openModal={openTodayInsertModalModal} setOpenModal={setOpentodayInsertModal} todayData={todayData} setTodayData={setTodayData} initialHour={initialHour} />
        </div>
    );
}

export default Home;