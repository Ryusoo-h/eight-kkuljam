import { useMemo, useRef } from "react";
import styled from "styled-components";
import { todayDataType } from "../types/dataType";

const TodayStateWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
`;

const TodayMessageBox = styled.div`
    background-color: #fff;
    margin: 0 auto 12px;
    padding: 6px 16px;
    border-radius: 8px;
    &::after {
        border-top-color: #fff;
    }
`;
const KkuljamJellyImage = styled.img`
    width: 200px;
    height: 200px;
    padding: 12px;
`;

type TodayStateType = {
    todayData: todayDataType
}

const TodayState = ({todayData}:TodayStateType) => {

    const message = useRef({
        8: '슈퍼 꿀잠!! 멋져! 힘찬하루!',
        7: '아주 좋은 하루가 될거얏!',
        6: '점심쯤 잠깐의 낮잠은 어때?',
        5: '우리 내일은 꼭 꿀잠자지 않을래?',
        4: '앗.. 꿀잠과 휴식이 너무 필요햇..',
        3: '끄앙 오늘은 수면부족.. 살려줘',
    })
    const timeTextStyle = useMemo(() => {
            return {
                color: `var(--state${todayData.state}`,
                fontFamily: 'CookieRun-Bold',
                fontSize: '22px'
            };
    }, [todayData.state]);

    return (
        <TodayStateWrapper>
            {todayData.state === 0 ? (
                // 오늘 수면시간 입력 전
                <TodayMessageBox className="todayMessage speech-bubble">
                    좋은아침!!<br />오늘은 몇시간 잤어?!
                </TodayMessageBox>
            ) : (
                // 오늘 수면시간 입력 후
                <TodayMessageBox className="todayMessage speech-bubble">
                    오늘 <span className="time-text" style={timeTextStyle}>
                        {todayData.hour}시간 {todayData.minute === 0 ? '' : `${todayData.minute}분`}
                    </span> 잤어!!<br />{message.current[todayData.state]}
                </TodayMessageBox>
            )}
            <KkuljamJellyImage src={`${process.env.PUBLIC_URL}/img/kkuljamjelly/state${todayData.state === 0 ? 8 : todayData.state}.svg`} alt={`state${todayData.state}`} />
        </TodayStateWrapper>
    );
};

export default TodayState;