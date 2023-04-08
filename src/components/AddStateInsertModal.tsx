import { MutableRefObject, Ref, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { dateTimeStampType, todayDataType } from '../types/dataType';
import TimePicker from './TimePicker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ko from 'date-fns/locale/ko';
import postDayData from '../apis/postDayData';
import putDayData from '../apis/putDayData';
import getTheDayData, { isGettedResponseEmpty } from '../apis/getTheDayData';
import YesOrNoModal from './YesOrNoModal';
registerLocale('ko', ko);
setDefaultLocale('ko');

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
    cursor: default;
`;

const DatePickerWrapper = styled.div`
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    display: block;
    &.hidden {
        display: none;
    }
    .react-datepicker {
        border: none;
    }
    .react-datepicker__day-name, 
    .react-datepicker__day, 
    .react-datepicker__time-name {
        font-family: 'CookieRun-Regular';
        font-size: 15px;
        color: #000;
        display: inline-block;
        width: 1.71rem;
        line-height: 1.6rem;
        text-align: center;
        margin: 0.166rem;
    }
    .react-datepicker__day--outside-month {
        color: #bbb;
    }
    .react-datepicker__day--disabled, 
    .react-datepicker__month-text--disabled, 
    .react-datepicker__quarter-text--disabled, 
    .react-datepicker__year-text--disabled {
        cursor: default;
        color: #ddd;
    }
    .react-datepicker__day-name {
        &:first-child {
            color: #f35555;
        }
        &:last-child {
            color: #6687ff;
        }
    }
    .react-datepicker__header {
        background-color: #fff3e0;
        border-bottom: none;
        border-top-left-radius: 8px;
        padding: 12px 0;
    }
    .react-datepicker__day--selected, 
    .react-datepicker__day--in-selecting-range, 
    .react-datepicker__day--in-range, 
    .react-datepicker__month-text--selected, 
    .react-datepicker__month-text--in-selecting-range, 
    .react-datepicker__month-text--in-range, 
    .react-datepicker__quarter-text--selected, 
    .react-datepicker__quarter-text--in-selecting-range, 
    .react-datepicker__quarter-text--in-range, 
    .react-datepicker__year-text--selected, 
    .react-datepicker__year-text--in-selecting-range, 
    .react-datepicker__year-text--in-range {
        background-color: #8208CC;
        color: #fff;
    }
    .react-datepicker__day--keyboard-selected,
    .react-datepicker__month-text--keyboard-selected,
    .react-datepicker__quarter-text--keyboard-selected,
    .react-datepicker__year-text--keyboard-selected {
        background-color: #fff; // #c29fd7;
        color: #000;
    }

    .react-datepicker__day--keyboard-selected:hover, 
    .react-datepicker__month-text--keyboard-selected:hover, 
    .react-datepicker__quarter-text--keyboard-selected:hover, 
    .react-datepicker__year-text--keyboard-selected:hover {
        background-color: #8208CC;
        color: #fff;
    }
    .react-datepicker__custom-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 2px; // 살짝 밀리는 원인을 모르겠네..
        padding: 0 6px;
        font-family: 'CookieRun-Bold';
        color: #7A1EB0;
        font-size: 20px;
        cursor: default;
    }
    .react-datepicker__navigation-icon {
        width: 40px;
        height: 40px;
        position: relative;
        box-sizing: border-box;
        background-color: unset;
        border: none;
        &:hover::before {
            border-left: solid 9px #a6a6a6;
        }
    }
    .react-datepicker__navigation-icon::before {
        content: '';
        border-color: #000;
        border-left: solid 9px #000;
        border-top: solid 6px transparent;
        border-bottom: solid 6px transparent;
        border-right: none;
        height: 0;
        width: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: border 0.2s ease-in-out;
    }
    .react-datepicker__navigation-icon--prev::before {
        transform: translate(-50%, -50%) rotate(180deg);
    }
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

type AddStateInsertModalType = {
    todayDate: MutableRefObject<Date>;
    todayData: todayDataType;
    setTodayData: (todayData: todayDataType) => void;
    openModal: boolean;
    setOpenModal: (isOpen:boolean) => void;
    selectedData: dateTimeStampType;
    setSelectedData: (selectedData:dateTimeStampType) => void;
    monthlyData: dateTimeStampType[];
    setMonthlyData: (monthlyData: dateTimeStampType[]) => void;
    paramsOfTotalStatePage: {year: number, month: number};
}
const AddStateInsertModal = ({todayDate, todayData, setTodayData, openModal, setOpenModal, selectedData, setSelectedData, monthlyData, setMonthlyData, paramsOfTotalStatePage}:AddStateInsertModalType) => {
    const Modal = useRef<any>(null);

    const [hour, setHour] = useState(8);
    const [minute, setMinute] = useState(0);

    const [startDate, setStartDate] = useState(new Date());
    const [hiddenDatePicker, setHiddenDatePicker] = useState<Boolean>(false);

    const [openModifyModal, setOpenModifyModal] = useState<Boolean>(false);
    const [isModify, setIsModify] = useState<Boolean>(false);
    useEffect(() => {
        setHour((selectedData.hour !== 0) ? selectedData.hour : hour);
        setMinute((selectedData.minute !== 0) ? selectedData.minute : minute);
    },[selectedData])

    useEffect(() => {
        setSelectedData({
            ...selectedData,
            year: startDate.getFullYear(),
            month: startDate.getMonth() + 1,
            date: startDate.getDate()
        })
    },[startDate])

    const addNewDataInMonthlyData = async (selectedData:dateTimeStampType) => {
        const {year, month, date, hour, minute} = selectedData;
        const theDayData = await getTheDayData(year, month, date);
        const newData = isGettedResponseEmpty(theDayData)
            ? await postDayData(selectedData)
            : await putDayData({ ...theDayData[0], hour, minute });
        if (!Array.isArray(newData)) {
            if (isModify) {
                const newMonthlyData = monthlyData.map(data => data.id === newData.id ? newData : data);
                console.log(newMonthlyData);
                setMonthlyData(newMonthlyData);
                console.log('modify monthlyData: ',monthlyData);
            } else {
                setMonthlyData([...monthlyData, newData]);
                console.log('unmodify monthlyData: ',monthlyData);
            }
            // 오늘데이터일 경우 오늘 데이터 갱신
            todayDate.current = new Date();
            console.log(year, month, date, todayDate.current.getFullYear(), todayDate.current.getMonth(), todayDate.current.getDate())
            if (year === todayDate.current.getFullYear() && month === todayDate.current.getMonth() + 1 && date === todayDate.current.getDate()) {
                console.log('갱신');
                setTodayData({...todayData, ...newData});
            }
            // 초기화
            setIsModify(false);
            setSelectedData({
                id: 0,
                year: 0,
                month: 0,
                date: 0,
                hour: 0,
                minute: 0
            });
        }
    }

    const onSelectDatePicker = (date:Date) => {
        // 날짜를 선택하면
        // 그 날짜가 기존 데이터에 있는 지 확인
        const sameDateData = monthlyData.find((data) => {
                return data.year===date.getFullYear() && data.month===date.getMonth() + 1 && data.date===date.getDate()
            });
        if (sameDateData !== undefined) {
            // 이미 저장되어있는 날짜일 경우
            console.log(sameDateData.hour, sameDateData.minute);
            setOpenModifyModal(true);
            setHour(sameDateData.hour);
            setMinute(sameDateData.minute);
        } else {
            // 없으면 원래하던대로 저장
            setHiddenDatePicker(true);
            setHour(8);
            setMinute(0);
        }
    }

    return (
        <ModalWrapper id="today-state-form-modal" className={openModal ? "" : "hidden"} ref={Modal}>
            <div className="modal-dark-space" onClick={() => {setOpenModal(false); setHiddenDatePicker(false);}} />
            <div className="modal-white-space">
                <div className="content-wrapper">
                    <DateBox className='date' onClick={() => {setHiddenDatePicker(false)}}>{selectedData.year}년 {selectedData.month}월 {selectedData.date}일</DateBox>
                    <DatePickerWrapper className={hiddenDatePicker ? 'hidden' : ''}>
                        <DatePicker selected={startDate}
                            locale="ko"
                            onChange={(date:Date) => setStartDate(date)}
                            onSelect={(date:Date)=>{onSelectDatePicker(date)}} //when day is clicked
                            // onChange={handleDateChange} //only when value has changed
                            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => {
                                    return (
                                    <div className="react-datepicker__custom-header">
                                        <button className='react-datepicker__navigation-icon react-datepicker__navigation-icon--prev' onClick={decreaseMonth}>{''}</button>
                                        <span>
                                        {`${date.getFullYear()}년 ${date.getMonth()+1}월`}
                                        </span>
                                        <button className='react-datepicker__navigation-icon react-datepicker__navigation-icon--next' onClick={increaseMonth}>{''}</button>
                                    </div>
                                    );
                                }
                            }
                            maxDate={new Date()}
                            inline
                            openToDate={ paramsOfTotalStatePage.month > 0 
                                ? new Date(`${paramsOfTotalStatePage.year}/${String(paramsOfTotalStatePage.month).padStart(2, '0')}/01`)
                                : new Date('2023/02/01')
                            } // 현재 pathname에 속하는 날짜를 보여주어야함
                        />
                    </DatePickerWrapper>
                    <TimePicker hour={hour} setHour={setHour} minute={minute} setMinute={setMinute} openModal={openModal} />
                    <CompleteButton className="basic-button" type="button" onClick={()=>{
                        addNewDataInMonthlyData({...selectedData, hour, minute});
                        setOpenModal(false);
                        setHiddenDatePicker(false);
                        setStartDate(new Date());
                    }}>
                        기록 완료!
                    </CompleteButton>
                    <CloseButton className="close" type="button" onClick={() => {setOpenModal(false); setHiddenDatePicker(false); setStartDate(new Date());}}>나중에 기록할래요</CloseButton>
                </div>
            </div>
            {openModifyModal
                && <YesOrNoModal onClickYes={() => {setIsModify(true); setOpenModifyModal(false); setHiddenDatePicker(true);}} onClickNo={() => {setOpenModifyModal(false); setStartDate(new Date());}}>
                    <span>{startDate.getFullYear()}년 {startDate.getMonth() + 1}월 {startDate.getDate()}일은<br />이미 기록이 있습니다.<br />새로 수정하시겠습니까?</span>
                </YesOrNoModal>
            }
        </ModalWrapper>
    );
}

export default AddStateInsertModal;
