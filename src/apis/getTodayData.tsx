import axios from "axios";
import { todayDataType } from "../types/dataType";
import { LIST_URL } from "./url";

const getTodayData = async ( year:number, month:number, date:number ) => {
    const response = await axios.get(
        `${LIST_URL}?year=${year}&month=${month}&date=${date}`
    ).then (response => {
        const todayData:todayDataType[] = response.data;
        return todayData;
    }).catch (e => {
        console.log('✅getTodayData 에러 : ', e)
    })

    return response;
}

export default getTodayData;