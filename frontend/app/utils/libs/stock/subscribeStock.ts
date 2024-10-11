import axios from "axios";

export const subscribeStock = () => {
  // 관심 행성 리스트 조회 후 해당 행성이 있는지 확인

  // 관심 행성 리스트에 해당 행성이 없다면 추가
  try {
    const res = axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/planet`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    alert("즐겨찾기 완료");
    console.log(res);
  } catch (error) {
    alert("즐겨찾기 실패");
    console.log(error);
  }
};
