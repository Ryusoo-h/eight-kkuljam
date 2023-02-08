import styled from "styled-components";

const TotalStateWrapper = styled.section`
    display: flex;
    justify-content: center;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 344px;
`;
const TotalToggleButton = styled.button`
    width: 100%;
    background-color: #fff;
    color: #333;
    font-size: 20px;
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
        margin: 10px 10px 0 10px;
    }
`;

const TotalState = () => {
    return (
        <TotalStateWrapper>
            <TotalToggleButton className="basic-button">수면 기록 전체보기</TotalToggleButton>
            {/* 기록 컴포넌트 추가하기 */}
        </TotalStateWrapper>

    );
}

export default TotalState;