
import styled from 'styled-components';
import TodayState from '../components/TodayState';
import TodayStateInsertModal from '../components/TodayStateInsertModal';
import { useCallback, useEffect, useRef, useState } from 'react';
import { selectedDataType, todayDataType } from '../types/dataType';
import { Outlet, useNavigate } from 'react-router-dom';
import AddStateInsertModal from '../components/AddStateInsertModal';
import getTheDayData from '../apis/getTheDayData';

const TotalStateWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    border-radius: 18px 18px 0 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 344px;
    overflow: hidden;
`;
const TodayStateInsertModalButton = styled.button`
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
    cursor: pointer;
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
const MonthlyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 0;
    overflow: hidden;
    transition: all 0.2s ease-out;
    position: relative;
    &.opened {
        height: 380px;
    }
    &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 92%;
        height: 2px;
        background-color: #fff3e0;
    }
`;

const Home = () => {
    const [paramsOfTotalStatePage, setParamsOfTotalStatePage] = useState<{year: number, month: number}>({year: 0, month: 0});
    const navigate = useNavigate();

    const [openTotalStatePage, setOpenTotalStatePage] = useState<boolean>(false);
    const [openTodayInsertModal, setOpentodayInsertModal] = useState<boolean>(false);
    const [openAddInsertModal, setOpenAddInsertModal] = useState<boolean>(false);

    const initialHour = useRef<number>(24); // state를 바꿔주는 switch문에 걸리지 않도록 하기 위함

    const [todayData, setTodayData] = useState<todayDataType>({
        id: 0,
        year: 0,
        month: 0,
        date: 0,
        hour: initialHour.current,
        minute: 0,
        state: 0
    });

    const [selectedData, setSelectedData] = useState<selectedDataType>({
        id: 0,
        year: 0,
        month: 0,
        date: 0,
        hour: 0,
        minute: 0
    });

    const didMount = useRef(false);
    useEffect(() => {
        if (!didMount.current) { // 첫 로딩시 날짜 업데이트 -> 오늘 데이터 가져오기
            const today = new Date();
            const [year, month, date]:number[] = [today.getFullYear(), (today.getMonth() + 1), today.getDate()];
            // const customId = `${year}-${String(month).padStart(2,"0")}-${String(date).padStart(2,"0")}`;
            setParamsOfTotalStatePage({year: year, month: month});
            // 서버에서 오늘 데이터 찾기
            const getServerTodayData = async (year:number, month:number, date:number) => {
                const response = await getTheDayData( year, month, date );
                if (Array.isArray(response) && response.length !== 0) {
                    setTodayData({...todayData, ...response[0]});
                } else {
                    setTodayData({...todayData, year, month, date});
                }
            }
            getServerTodayData(year, month, date);
            didMount.current = true;
        }
        console.log('todayData 업데이트', todayData)
    },[todayData])

    useEffect(()=> { 
        if (didMount.current && todayData.hour !== initialHour.current) {
        console.log('시간입력 후 state 업데이트 : ', todayData);
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

    const navigateTotalStatePage = useCallback(() => {
        navigate(`/totalState/${paramsOfTotalStatePage.year}-${paramsOfTotalStatePage.month}`);
    },[paramsOfTotalStatePage]);

    return (
        <div className="App">
            <TodayState todayData={todayData} />

            {todayData.state === 0 ? (
                <TodayStateInsertModalButton className="basic-button" onClick={() => {setOpentodayInsertModal(true);}}>
                    오늘 수면시간 입력하기
                </TodayStateInsertModalButton>
            ) : (
                <TodayStateInsertModalButton className="basic-button done" onClick={() => {setOpentodayInsertModal(true);}}>
                    오늘 수면시간 수정하기
                </TodayStateInsertModalButton>
            )}
            
            <TotalStateWrapper>
                <MonthlyWrapper className={openTotalStatePage ? "opened" : ""}>
                    <Outlet context={{ selectedData, setSelectedData, paramsOfTotalStatePage, setParamsOfTotalStatePage, setOpenAddInsertModal }} />
                </MonthlyWrapper>
                {openTotalStatePage ? (
                    <TotalToggleButton className="basic-button opened" onClick={() => {setOpenTotalStatePage(false);  navigate('/');}}>수면시간 기록 닫아두기</TotalToggleButton>
                ) : (
                    <TotalToggleButton className="basic-button" onClick={() => {setOpenTotalStatePage(true); navigateTotalStatePage();}}>수면시간 기록 전체보기</TotalToggleButton>
                )}
            </TotalStateWrapper>

            {/* ↓↓모달 출력↓↓ */}
            <TodayStateInsertModal openModal={openTodayInsertModal} setOpenModal={setOpentodayInsertModal} todayData={todayData} setTodayData={setTodayData} initialHour={initialHour} />
            <AddStateInsertModal openModal={openAddInsertModal} setOpenModal={setOpenAddInsertModal} selectedData={selectedData} setSelectedData={setSelectedData} />
        </div>
    );
}

export default Home;