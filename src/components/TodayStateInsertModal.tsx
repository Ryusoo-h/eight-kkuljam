import { MutableRefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import postDayData from '../apis/postDayData';
import putDayData from '../apis/putDayData';
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

type TodayStateInsertModalType = {
    openModal: boolean;
    setOpenModal: (isOpen:boolean)=>void;
    todayData: todayDataType;
    setTodayData: (todayData:todayDataType)=>void;
    initialHour: MutableRefObject<number>;
}
const TodayStateInsertModal = ({openModal, setOpenModal, todayData, setTodayData, initialHour}:TodayStateInsertModalType) => {
    const Modal = useRef<any>(null);

    const [hour, setHour] = useState(8);
    const [minute, setMinute] = useState(0);

    useEffect(() => {
        setHour((todayData.hour < initialHour.current) ? todayData.hour : hour);
        setMinute(todayData.minute);
    },[todayData])

    const onClickCompleteButton = async () => {
        let response;
        const {id, year, month, date} = todayData;
        if (todayData.hour === initialHour.current) {
            response = await postDayData({id, year, month, date, hour, minute});
        } else {
            response = await putDayData({id, year, month, date, hour, minute});
        }
        if (!Array.isArray(response)) {
            setTodayData({...todayData, ...response});
            setOpenModal(false);
        }
    }

    return (
        <ModalWrapper id="today-state-form-modal" className={openModal ? "" : "hidden"} ref={Modal}>
            <div className="modal-dark-space" onClick={() => {setOpenModal(false);}} />
            <div className="modal-white-space">
                <div className="content-wrapper">
                    <DateBox className='date'>{todayData.year}년 {todayData.month}월 {todayData.date}일</DateBox>
                    <TimePicker hour={hour} setHour={setHour} minute={minute} setMinute={setMinute} openModal={openModal} />
                    <CompleteButton className="basic-button" type="button" onClick={()=>{ onClickCompleteButton(); }}>
                        기록 완료!
                    </CompleteButton>
                    <CloseButton className="close" type="button" onClick={() => {setOpenModal(false);}}>나중에 기록할래요</CloseButton>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default TodayStateInsertModal;