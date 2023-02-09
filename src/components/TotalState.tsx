import { useState } from "react";
import styled from "styled-components";

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
const StateData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const StateMessageBox = styled.p`
  word-break: keep-all;
  margin: 0;
`;
const KkuljamJellyImage = styled.img`
  width: 130px;
  transform: scaleX(-1);
`;

const MonthlyData = styled.ul`
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

const TotalState = () => {
  const [isOpenedTotalModal, setIsOpenedTotalModal] = useState(false);
  const onClickToggle = () => {
    setIsOpenedTotalModal(!isOpenedTotalModal);
  };
  return (
    <TotalStateWrapper>
      {isOpenedTotalModal ? (
        <TotalToggleButton className="basic-button opened" onClick={() => {onClickToggle();}}>수면시간 기록 닫기</TotalToggleButton>
      ) : (
        <TotalToggleButton className="basic-button" onClick={() => {onClickToggle();}}>수면시간 기록 전체보기</TotalToggleButton>
      ) }
      
      <MonthlyWrapper className={isOpenedTotalModal ? "opened" : ""}>
        <EachMonthAverage className="speech-bubble">
          <PrevButton />
          0000년 00월 평균 <span className="time">0시간 00분</span>
          <NextButton className="disabled" />
        </EachMonthAverage>
        <StateInfo>
          <StateData>
            <StateMessageBox>기록 없음!<br />우리 잠자고 기록할까요?<br />안녕히 꿀잠자세욧..zZ</StateMessageBox>
            <KkuljamJellyImage src={`${process.env.PUBLIC_URL}/img/kkuljamjelly/state0.svg`} alt={`state0`} />
            {/* <KkuljamJellyImage src={`${process.env.PUBLIC_URL}/img/kkuljamjelly/state${todayData.state === 0 ? 8 : todayData.state}.svg`} alt={`state${todayData.state}`} /> */}
          </StateData>
          <MonthlyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
            <DailyData>
              <span className="date">3일</span>
              <span className="time">0시간 00분</span>
              <div className="button-wrapper hidden">
                <button>수정</button>
                <button>삭제</button>
              </div>
            </DailyData>
          </MonthlyData>
        </StateInfo>
        <AddButton className="basic-button">기록 추가하기</AddButton>
      </MonthlyWrapper>
    </TotalStateWrapper>
  );
}

export default TotalState;