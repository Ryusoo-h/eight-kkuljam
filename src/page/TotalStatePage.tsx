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
  &::after {
    border-top-color: var(--state8-light);
    left: 25%;
  }
  & .time {
    font-family: 'CookieRun-Bold';
  }
`;
const PrevButton = styled.button`
  border: none;
  border-radius: 8px;
  background-color: unset;
  width: 40px;
  height: 40px;
  position: relative;
  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    width: 14px;
    height: 16px;
    border-right: solid 14px var(--state8-light2);
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
  position: relative;
  &.disabled {
    opacity: 0.3;
  }
  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    width: 14px;
    height: 16px;
    border-left: solid 14px var(--state8-light2);
    border-top: solid 8px transparent;
    border-bottom: solid 8px transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    height: 16px;
    position: absolute;
    bottom: calc(248px - 30px);
    left: 50%;
    background: linear-gradient(to bottom, #fff, transparent);
    z-index: 9;
  }
  &::after {
    content: '';
    display: block;
    width: calc(50% - 16px);
    height: 16px;
    position: absolute;
    bottom: 15px;
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
    width: 6px; /*??????????????? ??????*/
  }
  &::-webkit-scrollbar-thumb {
    /*????????????*/
    background-color: #D7D7D7;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    /* ???????????? ??????*/
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
  standardDate: MutableRefObject<{ year: number; month: number; }>
}

const TotalStatePage = ({openPage, todayDate, standardDate}:TotalStateType) => {
  type monthlyDataType = {
    date: number,
    hour: number,
    minute: number
  }
  type averageTimeType = {
    hour: number,
    minute: number,
    state: stateType
  }
  const newState = useRef<stateType>(0);
  standardDate.current = {year: parseInt(todayDate.slice(0, 4)), month: parseInt(todayDate.slice(6, 8))};

  const message = useRef({
    8: (<span>?????? ??????!<br />???????????? ???????????????~<br />???????????? ?????????!!</span>),
    7: (<span>??????! ???????????? ??????!<br />????????? ?????? ??????<br />????????? ??????????????????~</span>),
    6: (<span>??????.. ?????? ?????????..<br />????????? ????????? ??????????!<br />????????? ?????? ?????????~</span>),
    5: (<span>???.. ????????????<br />?????? ?????? ????????????????<br />???????????? ?????? ??????! ??????!!</span>),
    4: (<span>???.. ?????? ?????????...<br />????????? ????????? ?????????<br />???????????? ??????..</span>),
    3: (<span>?????? ???????????? ??????..<br />???????????? ??? ??????...<br />?????????????????? ??????~</span>),
  });

  const [monthlyData, setMonthlyData] = useState<monthlyDataType[]>([]);
  const [averageTime, setAverageTime] = useState<averageTimeType>({hour: 0, minute: 0, state: 0});
  const MonthlyDataByServer = useRef<monthlyDataType[]>([
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
    { date: 15, hour: 9, minute: 0 }
  ])
  useEffect(() => {
    if (monthlyData.length === 0) {
      // TODO ???????????? standardDate??? ???????????? ??? ???????????? ?????????!
      // ?????????.. ?????????????????? ????????? ???????????????
      setMonthlyData(MonthlyDataByServer.current);
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
  return (
      <MonthlyWrapper className={openPage ? "opened" : ""}>
        <EachMonthAverage className="speech-bubble">
          <PrevButton onClick={() => {}}/>
          {standardDate.current.year}??? {standardDate.current.month}??? ?????? <span className="time">{averageTime.hour}?????? {averageTime.minute === 0 ? "00" : averageTime.minute}???</span>
          <NextButton className="disabled" onClick={() => {}} />
        </EachMonthAverage>
        
        {monthlyData.length === 0 ? (
          <StateInfo className="undefined-monthly-data">
            <StateDataBox>
              <StateMessageBox>?????? ??????..zZ</StateMessageBox>
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
                    <span className="date">{data.date}???</span>
                    <span className="time">{data.hour}?????? {data.minute ! === 0 ? "00???" : `${data.minute}???`}</span>
                    <div className="button-wrapper hidden">
                      <button>??????</button>
                      <button>??????</button>
                    </div>
                  </DailyData>
                )
              })}
            </MonthlyDataBox>
          </StateInfo>
        )}
        <AddButton className="basic-button">?????? ????????????</AddButton>
      </MonthlyWrapper>
  );
}

export default TotalStatePage;