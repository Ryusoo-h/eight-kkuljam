import axios from "axios";
import { LIST_URL } from "./url";

const deleteDayData = async ( id:number ) => {
    const response = await axios.delete(
        `${LIST_URL}/${id}`
    ).then (response => {
        console.log(response);
        return true;
    }).catch (e => {
        console.log('✅getTheDayData 에러 : ', e)
        return false;
    })

    return response;
}

export default deleteDayData;