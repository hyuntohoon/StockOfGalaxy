import {defaultRequest} from "../request";

export const getTimeChart = async (start : string, end: string) => {
    try {
        const res = await defaultRequest.get(`stock/timemachine?startDate=${start}&endDate=${end}`);
        console.log("시간 데이터", res.data);
        return res.data;
    }catch(err) {
        console.error("타임머신 데이터 조회 실패");
        throw err;
    }
}