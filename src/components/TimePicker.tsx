import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

const TimePickerWrapper = styled.div`
    padding: 4px 0;
    font-family: 'CookieRun-Bold';
    font-size: 24px;
    display: flex;
    justify-content: center;
    position: relative;
    & > span {
        display: inline-block;
        padding: 40px 0px;
        &.hour {
            padding-right: 8px;
        }
    }
    &::before, &::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 0;
        width: 100%;
        height: 36px;
        background: rgba(255,255,255, 0.7);
        backdrop-filter: blur(1px);
        z-index: 9;
        pointer-events: none;
        border-radius: 8px;
    }
    &::after {
        top: 80px;
    }
`;

const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 108px;
    overflow-Y: hidden;
    position: relative;
    z-index: 1;
    cursor: default;
    &::-webkit-scrollbar {
        width: 0;
    }
    & > .item {
        font-family: 'CookieRun-Bold';
        font-size: 24px;
        text-align: right;
        padding: 4px;
        border: none;
        background-color: unset;
        height: 36px;
    }
`;

type TimePickerType = {
    hour: number;
    setHour: (hour:number) => void;
    minute: number;
    setMinute: (minute:number) => void;
    openModal: boolean
}
const TimePicker = ({hour, setHour, minute, setMinute, openModal}:TimePickerType) => {
    const HourDropdownList = useRef<any>(null);
    const MinuteDropdownList = useRef<any>(null);
    const ScrollStep = useMemo(() => 36, []);

    // TODO 음... 이렇게까지 인자가 늘어나는게 맞나..?
    const onWheel = useCallback(
        (dropdownList: React.MutableRefObject<any>,
            direction:number,
            time:number,
            setTime:((time:number)=>void),
            max:number,
            step:number
        ) => {
        const sign = Math.sign(direction);
        dropdownList.current.scrollBy(0, sign*ScrollStep);

        let newTime = time + (sign * step);
        if (newTime < 0) {
            newTime = 0;
        } else if (newTime > max) {
            newTime = max;
        }
        setTime(newTime);
    },[]);

    useEffect(() => {
        HourDropdownList.current.scrollTo(0, hour*ScrollStep);
    },[openModal])

    return (
        <TimePickerWrapper className="main-purple">
            <Dropdown id="hour" ref={HourDropdownList}
                onWheel={(e)=> {onWheel(HourDropdownList, e.deltaY, hour, setHour, 23, 1);}}
            >
                <div className="item" style={{color: '#fff'}}>0</div>
                <div className="item">0</div>
                <div className="item">1</div>
                <div className="item">2</div>
                <div className="item">3</div>
                <div className="item">4</div>
                <div className="item">5</div>
                <div className="item">6</div>
                <div className="item">7</div>
                <div className="item">8</div>
                <div className="item">9</div>
                <div className="item">10</div>
                <div className="item">11</div>
                <div className="item">12</div>
                <div className="item">13</div>
                <div className="item">14</div>
                <div className="item">15</div>
                <div className="item">16</div>
                <div className="item">17</div>
                <div className="item">18</div>
                <div className="item">19</div>
                <div className="item">20</div>
                <div className="item">21</div>
                <div className="item">22</div>
                <div className="item">23</div>
                <div className="item" style={{color: '#fff'}}>0</div>
            </Dropdown>
            
            <span className='hour'>시간</span>
            <Dropdown id="minute" ref={MinuteDropdownList} onWheel={(e)=> {onWheel(MinuteDropdownList, e.deltaY, minute, setMinute, 55, 5);}}>
                <div className="item" style={{color: '#fff'}}>0</div>
                <div className='item'>00</div>
                <div className='item'>05</div>
                <div className='item'>10</div>
                <div className='item'>15</div>
                <div className='item'>20</div>
                <div className='item'>25</div>
                <div className='item'>30</div>
                <div className='item'>35</div>
                <div className='item'>40</div>
                <div className='item'>45</div>
                <div className='item'>50</div>
                <div className='item'>55</div>
                <div className="item" style={{color: '#fff'}}>0</div>
            </Dropdown>
            <span className='minute'>분</span>
        </TimePickerWrapper>
    );
}

export default TimePicker;