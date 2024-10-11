import { ConstantColorFactor } from "three";
import { authRequest } from "../request";

export const getMyPlanet = async (accessToken, setAccessToken) => {
    const authClient = await authRequest(accessToken, setAccessToken);
    try {
        const myPlanetRes = await authClient.get("/user/auth/planet");
        return myPlanetRes.data.likeplanetList;
    }catch(err) {
        console.error("관심 행정 조회 실패: ", err);
        throw err;
    }
}

//{
//     "stockCode" : "005380" // 종목번호(String)
// }

export const addMyPlanet = async(accessToken, setAccessToken, stockCode) => {
    const authClient = await authRequest(accessToken, setAccessToken);
    try {
        const myPlanetRes = await authClient.post("/user/auth/planet", {stockCode: stockCode});

        if(myPlanetRes.status === 200) {
            return true;
        }else{
            throw new Error("관심행성 등록에 실패하였습니다")
        }
    }catch(err) {
        console.error("관심 행정 등록 실패: ", err);
        throw err;
    }
}

export const deleteMyPlanet = async(accessToken, setAccessToken, stockCode) => {
    const authClient = await authRequest(accessToken, setAccessToken);
    try {
        const myPlanetRes = await authClient.delete(`/user/auth/planet/${stockCode}`);
        if(myPlanetRes.status === 200) {
            return true;
        }else{
            throw new Error("관심행성 삭제에 실패하였습니다")
        }
    }catch(err) {
        console.error("관심 행정 조회 실패: ", err);
        throw err;
    }
}