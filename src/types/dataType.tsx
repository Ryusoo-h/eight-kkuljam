
export type stateType =  8 | 7 | 6 | 5 | 4 | 3 | 0;

export type todayDataType = {
    id: number,
    year: number, 
    month: number, 
    date: number, 
    hour: number,
    minute: number,
    state: stateType
    // state 숫자 의미
    // 8 ~ 3 : 각 수면시간에 따른 상태 표시, 
    // 0 : 입력전 상태
}

export type dateTimeStampType = {
    id: number,
    year: number, 
    month: number, 
    date: number, 
    hour: number,
    minute: number
}
