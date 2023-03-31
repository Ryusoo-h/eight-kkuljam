import styled from "styled-components";

const ModalWrapper = styled.div`
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    padding: 0.5rem 1rem;
    width: 260px;
    p {
        padding: 0.5rem 0;
    }
    div.flex {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        & .basic-button {
            padding: 4px 8px;
            font-size: 18px;
        }
        #yes-button {
            
        }
        #no-button {
            background-color: #cdcdcd;
            &:hover {
                background-color: #a7a7a7;
            }
        }
    }
`;

type yesOrNoModalType = {
    children:JSX.Element;
    onClickYes: () => void;
    onClickNo: () => void;
}

const YesOrNoModal = ({ children, onClickYes, onClickNo }:yesOrNoModalType) => {

    return (
        <ModalWrapper>
            <p>{children}</p>
            <div className="flex">
                <button id="yes-button" className="basic-button" onClick={onClickYes}>네</button>
                <button id="no-button" className="basic-button" onClick={onClickNo}>아니요</button>
            </div>
        </ModalWrapper>
    );
}

export default YesOrNoModal;