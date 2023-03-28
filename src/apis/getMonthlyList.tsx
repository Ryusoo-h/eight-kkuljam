import axios from "axios"
import { LIST_URL } from "./url"

const getMonthlyList = async ( year:number, month:number ) => {
    const response = await axios.get(
        LIST_URL, 
        {
            params: {
                year,
                month,
            }
        }
    )
    .then(response => {
        return response.data;
    })
    .catch(e => {
        console.log('✅getMonthlyList API 에러 : ', e);
        return [];
    });

    return response;
};

export default getMonthlyList;