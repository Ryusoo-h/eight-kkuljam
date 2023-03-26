
import axios from "axios";
import { LIST_URL } from "./url";
import { selectedDataType } from "../types/dataType";

const postDayData = async (selectedData:selectedDataType) => {
    const {id, year, month, date, hour, minute} = selectedData;
    const response = await axios.post(
        LIST_URL, 
        {
            id,
            year,
            month,
            date,
            hour,
            minute
        }
    ).then(response => {
        const postedData:selectedDataType = response.data;
        return postedData;
    }).catch(e => {
        console.log('✅postDayData API 에러 :', e);
        return [];
    })
    return response;
}

export default postDayData;