import { useState } from "react";
import styled from "styled-components";
import { dateTimeStampType } from "../types/dataType";

const DailyDataLi = styled.li`
display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: calc(100% - 6px);
    padding: 6px 0;
    border-bottom: solid 1px #d9d9d9;
    position: relative;
    cursor: pointer;
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
        right: 0%;
        transform: translateY(-50%);
        transition: all 0.1s ease-in-out;
        width: 100px;
        overflow: hidden;
        background: linear-gradient(to left, #ffbbbb 25%, transparent);
        text-align: right;
        &.hidden {
            width: 0;
        }
        .delete-button {
            padding: 0 4px;
            height: 33px;
            margin: 0;
            border: none;
            background: unset;
            img {
                width: 26px;
                vertical-align: bottom;
                transition: all 0.2s ease-in-out;
                &:hover {
                    transform: scale(1.1) rotate(-10deg);
                }
            }
        }
    }
`;

type DailyDataLiProps = {
    data: dateTimeStampType;
    setToBeDeletedId: (id:number) => void;
    setOpenDeleteModal: (isOpen:boolean) => void;
}

const DailyData = ({data, setToBeDeletedId, setOpenDeleteModal}:DailyDataLiProps) => {
    const [isHiddenButtonWrapper, setIsHiddenButtonWrapper] = useState<boolean>(true);
    const isExternalClickDetected = (target:HTMLElement): void => {
        const handleExternalClick = (e: MouseEvent) => {
            if (!target.contains(e.target as Node)) {
                setIsHiddenButtonWrapper(true);
                window.removeEventListener('mousedown', handleExternalClick);
            }
        }
        if (isHiddenButtonWrapper) {
            window.addEventListener('mousedown', handleExternalClick)
        }
    };

    return (
        <DailyDataLi onClick={(e) => {console.log('클릭됨'); setIsHiddenButtonWrapper(!isHiddenButtonWrapper); isExternalClickDetected(e.currentTarget);}}>
            <span className="date">{data.date}일</span>
            <span className="time">{data.hour}시간 {data.minute ! === 0 ? "00분" : `${data.minute}분`}</span>
            <div className={isHiddenButtonWrapper ? "button-wrapper hidden" : "button-wrapper"}>
                <button onClick={(e) => {e.stopPropagation(); setToBeDeletedId(data.id); setOpenDeleteModal(true);}} className="delete-button"><img src={`${process.env.PUBLIC_URL}/img/ic-delete.svg`} alt="delete-button" /></button>
            </div>
        </DailyDataLi>
    );
}

export default DailyData;