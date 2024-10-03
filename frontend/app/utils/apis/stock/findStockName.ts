export const stock_list = [
  {
    stock_name: "삼성전자",
    stock_code: "005930",
  },
  {
    stock_name: "SK하이닉스",
    stock_code: "000660",
  },
  {
    stock_name: "현대차",
    stock_code: "005380",
  },
  {
    stock_name: "셀트리온",
    stock_code: "068270",
  },
  {
    stock_name: "KB금융",
    stock_code: "105560",
  },
  {
    stock_name: "POSCO홀딩스",
    stock_code: "005490",
  },
  {
    stock_name: "기아",
    stock_code: "000270",
  },
  {
    stock_name: "신한지주",
    stock_code: "055550",
  },
  {
    stock_name: "NAVER",
    stock_code: "035420",
  },
  {
    stock_name: "삼성SDI",
    stock_code: "006400",
  },
  {
    stock_name: "삼성바이오로직스",
    stock_code: "207940",
  },
  {
    stock_name: "LG화학",
    stock_code: "051910",
  },
  {
    stock_name: "하나금융지주",
    stock_code: "086790",
  },
  {
    stock_name: "LG에너지솔루션",
    stock_code: "373220",
  },
  {
    stock_name: "현대모비스",
    stock_code: "012330",
  },
  // {
  //   stock_name: "삼성물산",
  //   stock_code: "028260",
  // },
  // {
  //   stock_name: "LG전자",
  //   stock_code: "066570",
  // },
  // {
  //   stock_name: "카카오",
  //   stock_code: "035720",
  // },
  // {
  //   stock_name: "삼성화재",
  //   stock_code: "000810",
  // },
  // {
  //   stock_name: "우리금융지주",
  //   stock_code: "316140",
  // },
  // {
  //   stock_name: "크래프톤",
  //   stock_code: "259960",
  // },
  // {
  //   stock_name: "KT",
  //   stock_code: "030200",
  // },
  // {
  //   stock_name: "SK텔레콤",
  //   stock_code: "017670",
  // },
  // {
  //   stock_name: "삼성생명",
  //   stock_code: "032830",
  // },
  // {
  //   stock_name: "LG",
  //   stock_code: "003550",
  // },
  // {
  //   stock_name: "삼성전기",
  //   stock_code: "009150",
  // },
  // {
  //   stock_name: "카카오뱅크",
  //   stock_code: "323410",
  // },
  // {
  //   stock_name: "삼성중공업",
  //   stock_code: "010140",
  // },
  // {
  //   stock_name: "SK이노베이션",
  //   stock_code: "096770",
  // },
  // {
  //   stock_name: "삼성에스디에스",
  //   stock_code: "018260",
  // },
  // {
  //   stock_name: "대한항공",
  //   stock_code: "003490",
  // },
  // {
  //   stock_name: "SK",
  //   stock_code: "034730",
  // },
  // {
  //   stock_name: "DB손해보험",
  //   stock_code: "005830",
  // },
  // {
  //   stock_name: "HD현대중공업",
  //   stock_code: "329180",
  // },
  // {
  //   stock_name: "기업은행",
  //   stock_code: "024110",
  // },
  // {
  //   stock_name: "한국항공우주",
  //   stock_code: "047810",
  // },
  // {
  //   stock_name: "엔씨소프트",
  //   stock_code: "036570",
  // },
  // {
  //   stock_name: "하이브",
  //   stock_code: "352820",
  // },
  // {
  //   stock_name: "LG디스플레이",
  //   stock_code: "034220",
  // },
  // {
  //   stock_name: "SK바이오팜",
  //   stock_code: "326030",
  // },
];

export const findStockName = (stock_code: string): string => {
  const stock = stock_list.find((stock) => stock.stock_code === stock_code);
  return stock ? stock.stock_name : stock_code;
};
