
import axios from "axios";
import { LIST_URL } from "./url";
import { selectedDataType } from "../types/dataType";

const putDayData = async (selectedData:selectedDataType) => {
    const {id} = selectedData;
    const response = await axios.put(
        `${LIST_URL}/${id}`,
        selectedData
    ).then(response => {
        const postedData:selectedDataType = response.data;
        return postedData;
    }).catch(e => {
        console.log('✅postDayData API 에러 :', e);
        return [];
    })
    return response;
}

export default putDayData;