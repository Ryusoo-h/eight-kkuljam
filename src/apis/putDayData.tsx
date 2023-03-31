
import axios from "axios";
import { LIST_URL } from "./url";
import { dateTimeStampType } from "../types/dataType";

const putDayData = async (selectedData:dateTimeStampType) => {
    const {id} = selectedData;
    const response = await axios.put(
        `${LIST_URL}/${id}`,
        selectedData
    ).then(response => {
        const postedData:dateTimeStampType = response.data;
        return postedData;
    }).catch(e => {
        console.log('✅postDayData API 에러 :', e);
        return [];
    })
    return response;
}

export default putDayData;