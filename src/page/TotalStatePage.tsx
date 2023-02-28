import { MutableRefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { stateType } from "../types/dataType"

const MonthlyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 0;
  transition: all 0.2s ease-in-out;
  &.opened {
    height: 380px;
  }
`;

const EachMonthAverage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px;
  background-color: var(--state8-light);
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 18px;
  & .time {
    font-family: 'CookieRun-Bold';
  }
`;

const StateInfo = styled.div`
  font-size: 15px;
  display: grid;
  grid: 248px / 1fr 1fr;
  margin: 0 8px;
  position: relative;
  &.undefined-monthly-data {
    grid: 248px / 1fr 0;
    &::before, &::after {
      display: none;
    }
  }
  &::before {
    content: '';
    display: block;
    width: calc(50% - 16px);
    height: 12px;
    position: absolute;
    bottom: calc(248px - 25px);
    left: 50%;
    background: linear-gradient(to bottom, #fff, transparent);
    z-index: 9;
  }
  &::after {
    content: '';
    display: block;
    width: calc(50% - 16px);
    height: 12px;
    position: absolute;
    bottom: 13px;
    left: 50%;
    background: linear-gradient(to top, #fff, transparent);
    z-index: 9;
  }
`;
const StateDataBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const StateMessageBox = styled.p`
  word-break: keep-all;
  margin: 0;
`;
const KkuljamJellyImage = styled.img`
  margin: 0 auto;
  width: 130px;
  transform: scaleX(-1);
`;

const MonthlyDataBox = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-Y: auto;
  list-style: none;
  padding: 0;
  position: relative;
  &::-webkit-scrollbar {
    width: 6px; /*스크롤바의 너비*/
  }
  &::-webkit-scrollbar-thumb {
    /*스크롤바*/
    background-color: #D7D7D7;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    /* 스크롤바 트랙*/
    background-color: #F1F1F1;
    border-radius: 3px;
  }
`;
const DailyData = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: calc(100% - 16px);
  padding: 6px 0;
  border-bottom: solid 1px #d9d9d9;
  position: relative;
  .date {
    box-sizing: border-box;
    width: 48px;
    padding-right: 8px;
    text-align: right;
  }
  .time {
    padding: 0 8px;
    flex-grow: 1;
    text-align: right;
  }
  .button-wrapper {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    &.hidden {
      display: none;
    }
  }
`;
const AddButton = styled.button`
  margin: 8px auto 16px;
`;

type TotalStateType = {
  openPage: boolean;
  todayDate: string;
  standardDate: { year: number; month: number; };
  setStandardDate: (standardDate:{ year: number; month: number; }) => void
}

const TotalStatePage = ({openPage, todayDate, standardDate, setStandardDate}:TotalStateType) => {
  type monthlyDataType = {
    date: number,
    hour: number,
    minute: number
  }
  type MonthlyDataByServerType = {
    date: string,
    monthlyData: monthlyDataType[]
  }
  type averageTimeType = {
    hour: number,
    minute: number,
    state: stateType
  }
  const newState = useRef<stateType>(0);

  const message = useRef({
    8: (<span>아주 좋아!<br />꿀잠으로 건강해져랏~<br />슈퍼꿀잠 파이팅!!</span>),
    7: (<span>좋아! 이번달도 멋져!<br />꿀잠과 함께 우리<br />더욱더 건강해지자구~</span>),
    6: (<span>에헷.. 조금 바빴나..<br />잠깐의 낮잠은 어떨까?!<br />충분한 잠은 중요해~</span>),
    5: (<span>후.. 후들후들<br />조끔 힘든 한달이었나?<br />다음달엔 꿀잠 많이! 약속!!</span>),
    4: (<span>앗.. 넘무 힘들어...<br />꿀잠과 휴식이 필요해<br />꿀잠젤리 살려..</span>),
    3: (<span>끄앙 꿀쟘젤리 살려..<br />이렇게는 못 살아...<br />수면부족이야 우앵~</span>),
  });

  const [monthlyData, setMonthlyData] = useState<monthlyDataType[]>([]);
  const [averageTime, setAverageTime] = useState<averageTimeType>({hour: 0, minute: 0, state: 0});
  const MonthlyDataByServer = useRef<MonthlyDataByServerType[]>([
    { date: '2023-2', monthlyData: [
      { date: 5, hour: 5, minute: 50 },
      { date: 6, hour: 9, minute: 50 },
      { date: 7, hour: 2, minute: 20 },
      { date: 8, hour: 5, minute: 30 },
      { date: 9, hour: 4, minute: 10 },
      { date: 10, hour: 7, minute: 10 },
      { date: 11, hour: 9, minute: 0 },
      { date: 12, hour: 6, minute: 0 },
      { date: 13, hour: 4, minute: 0 },
      { date: 14, hour: 11, minute: 40 },
      { date: 15, hour: 9, minute: 0 },
      { date: 26, hour: 6, minute: 0 },
      { date: 27, hour: 11, minute: 0 },
      { date: 28, hour: 6, minute: 0 }
    ]},
    { date: '2023-1', monthlyData: [
      { date: 1, hour: 8, minute: 0 },
    ]},
    { date: '2022-12', monthlyData: [
      { date: 1, hour: 7, minute: 0 },
    ]},
    { date: '2022-11', monthlyData: [
      { date: 1, hour: 6, minute: 0 },
    ]},
    { date: '2022-10', monthlyData: [
      { date: 1, hour: 5, minute: 0 },
    ]},
    { date: '2022-9', monthlyData: [
      { date: 1, hour: 4, minute: 0 },
    ]},
    { date: '2022-8', monthlyData: [
      { date: 1, hour: 3, minute: 0 },
    ]}
  ])
  useEffect(() => {
    // TODO 
    // 서버에서 standardDate에 해당하는 월 데이터를 가져옴!
    // 지금은.. 서버없으니까 임의로 저장하겠음
    const date = `${standardDate.year}-${standardDate.month}`;
    const newMonthlyData = MonthlyDataByServer.current.find((obj) => obj.date === date)?.monthlyData;
    console.log(newMonthlyData);
    setMonthlyData(newMonthlyData ? newMonthlyData : []);
  }, [standardDate])
  useEffect(() => {
    if (monthlyData.length === 0) {
      setAverageTime({
        hour: Math.floor(0),
        minute: Math.floor(0),
        state: 0
      });
    } else {
      const newAverageTime = monthlyData.reduce((sum, value) => {
        sum += value.hour * 60 + value.minute;
        return sum;
      }, 0) / monthlyData.length
      switch(Math.floor(newAverageTime/60)) {
        case 0:
        case 1:
        case 2:
        case 3:
          newState.current = 3;
          break;
        case 4:
          newState.current = 4;
          break;
        case 5:
          newState.current = 5;
          break;
        case 6:
          newState.current = 6;
          break;
        case 7:
          newState.current = 7;
          break;
        case 8:
          newState.current = 8;
          break;
        default:
          newState.current = 8;
      }
      setAverageTime({
        hour: Math.floor(newAverageTime/60),
        minute: Math.floor(newAverageTime%60),
        state: newState.current
      });
    }
  },[monthlyData])

  const onClickPrevButton = () => {
    if ( standardDate.month === 1 ) {
      setStandardDate({ year: --standardDate.year, month: 12 });
    } else {
      setStandardDate({ ...standardDate, month: --standardDate.month });
    }
  };
  const onClickNextButton = () => {
    if ( standardDate.month === 12 ) {
      setStandardDate({ year: ++standardDate.year, month: 1 });
    } else {
      setStandardDate({ ...standardDate, month: ++standardDate.month });
    }
  };
  const PrevButton = styled.button`
    border: none;
    border-radius: 8px;
    background-color: unset;
    width: 40px;
    height: 40px;
    position: relative;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
    &::after {
      content: '';
      display: block;
      box-sizing: border-box;
      width: 14px;
      height: 16px;
      border-right: solid 14px var(--state${averageTime.state}-light2);
      border-top: solid 8px transparent;
      border-bottom: solid 8px transparent;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%)
    }
  `;
  const NextButton = styled.button`
    border: none;
    border-radius: 8px;
    background-color: unset;
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: relative;
    opacity: 0.5;
    transition: all 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
    &::after {
      content: '';
      display: block;
      box-sizing: border-box;
      width: 14px;
      height: 16px;
      border-left: solid 14px var(--state${averageTime.state}-light2);
      border-top: solid 8px transparent;
      border-bottom: solid 8px transparent;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `;
  
  return (
      <MonthlyWrapper className={openPage ? "opened" : ""}>
        <EachMonthAverage style={{backgroundColor: `var(--state${averageTime.state}-light)`}}>
          <PrevButton onClick={() => {onClickPrevButton()}} />
          {standardDate.year}년 {standardDate.month}월 평균 <span className="time">{averageTime.hour}시간 {averageTime.minute === 0 ? "" : `${averageTime.minute}분`}</span>
          <NextButton onClick={() => {onClickNextButton()}} />
        </EachMonthAverage>

        {monthlyData.length === 0 ? (
          <StateInfo className="undefined-monthly-data">
            <StateDataBox>
              <StateMessageBox>기록 없음..zZ</StateMessageBox>
              <KkuljamJellyImage src={`${process.env.PUBLIC_URL}/img/kkuljamjelly/state0.svg`} alt={`state0`} />
              {/* <KkuljamJellyImage src={`${process.env.PUBLIC_URL}/img/kkuljamjelly/state${todayData.state === 0 ? 8 : todayData.state}.svg`} alt={`state${todayData.state}`} /> */}
            </StateDataBox>
            <MonthlyDataBox></MonthlyDataBox>
          </StateInfo>
        ) : (
          <StateInfo>
            <StateDataBox>
              <StateMessageBox>{message.current[averageTime.state === 0 ? 3 : averageTime.state]}</StateMessageBox>
              <KkuljamJellyImage src={`${process.env.PUBLIC_URL}/img/kkuljamjelly/state${averageTime.state}.svg`} alt={`state${averageTime.state}`} />
              {/* <KkuljamJellyImage src={`${process.env.PUBLIC_URL}/img/kkuljamjelly/state${todayData.state === 0 ? 8 : todayData.state}.svg`} alt={`state${todayData.state}`} /> */}
            </StateDataBox>
            <MonthlyDataBox>
              {monthlyData.map((data) => {
                return (
                  <DailyData key={data.date}>
                    <span className="date">{data.date}일</span>
                    <span className="time">{data.hour}시간 {data.minute ! === 0 ? "00분" : `${data.minute}분`}</span>
                    <div className="button-wrapper hidden">
                      <button>수정</button>
                      <button>삭제</button>
                    </div>
                  </DailyData>
                )
              })}
            </MonthlyDataBox>
          </StateInfo>
        )}
        <AddButton className="basic-button">기록 추가하기</AddButton>
      </MonthlyWrapper>
  );
}

export default TotalStatePage;