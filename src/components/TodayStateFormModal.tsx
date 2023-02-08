import { useRef, useState } from 'react';
import styled from 'styled-components';
import { todayDataType } from '../types/dataType';
import TimePicker from './TimePicker';

const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 99999;
    &.hidden {
        display: none;
    }
    .modal-dark-space {
        position: relative;
        width: 100%;
        height: 100%;
        background: rgb(201 211 237 / 80%);
        backdrop-filter: blur(6px);
    }
    .modal-white-space {
        padding-top: 12px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        width: 300px;
        border-radius: 8px;
        .content-wrapper {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
    }
`;

const DateBox = styled.span`
    font-family: 'CookieRun-Bold';
    display: inline-block;
`;

const CompleteButton = styled.button`
    margin-top: 8px;
    border-radius: 0 0 8px 8px;
    font-size: 22px;
    line-height: 30px;
`;

const CloseButton = styled.button`
    color: #3f0064;
    text-shadow: 0 0 20px #fff;
    font-family: 'CookieRun-Regular';
    font-size: 16px;
    background-color: unset;
    border: none;
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
`;

type TotalStateFormModalType = {
    openModal: boolean;
    setOpenModal: (isOpen:boolean)=>void;
    todayData: todayDataType;
    setTodayData: (todayData:todayDataType)=>void;
}
const TotalStateFormModal = ({openModal, setOpenModal, todayData, setTodayData}:TotalStateFormModalType) => {
    const Modal = useRef<any>(null);

    const [hour, setHour] = useState(8);
    const [minute, setMinute] = useState(0);

    return (
        <ModalWrapper id="today-state-form-modal" className={openModal ? "" : "hidden"} ref={Modal}>
        <div className="modal-dark-space" onClick={() => {setOpenModal(false);}} />
        <div className="modal-white-space">
            <div className="content-wrapper">
                <DateBox className='date'>{todayData.year}년 {todayData.month}월 {todayData.date}일</DateBox>
                <TimePicker hour={hour} setHour={setHour} minute={minute} setMinute={setMinute} openModal={openModal} />
                <CompleteButton className="basic-button" type="button" onClick={()=>{
                    setTodayData({...todayData, hour, minute}); setOpenModal(false);
                }}>
                    기록 완료!
                </CompleteButton>
                <CloseButton className="close" type="button" onClick={() => {setOpenModal(false);}}>나중에 기록할래요</CloseButton>
            </div>
        </div>
    </ModalWrapper>
    );
}

export default TotalStateFormModal;