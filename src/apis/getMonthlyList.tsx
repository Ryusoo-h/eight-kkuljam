import axios from "axios"
import { LIST_URL } from "./url"

type listProps = {
    id: number;
    year: number;
    month: number;
    date: number;
    hour: number;
    minute: number;
}

const getMonthlyList = async ( year:number, month:number ) => {
    const response = await axios.get(LIST_URL, {
        params: {
            year,
            month,
        }
    })
    .then(response => {
        return response.data.sort((a:listProps, b:listProps) => {return a.date - b.date});
    })
    .catch(e => {
        console.log('✅getTodos API 에러 : ', e);
        return [];
    });

    return response;
};

export default getMonthlyList;