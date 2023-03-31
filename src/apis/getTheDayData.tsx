import axios from "axios";
import { todayDataType } from "../types/dataType";
import { LIST_URL } from "./url";

const getTheDayData = async ( year:number, month:number, date:number ) => {
    const response = await axios.get(
        `${LIST_URL}?year=${year}&month=${month}&date=${date}`
    ).then (response => {
        const todayData:todayDataType[] = response.data;
        return todayData;
    }).catch (e => {
        console.log('✅getTheDayData 에러 : ', e)
        return [];
    })

    return response;
}

export const isGettedResponseEmpty = (response: todayDataType[]) => {
    if (response.length === 0) {
        return true;
    }
    return false;
};

export default getTheDayData;