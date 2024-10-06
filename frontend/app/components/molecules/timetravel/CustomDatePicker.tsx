import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import {ArrowLeft, ArrowRight, Button, Wrapper} from "./style";
import {getMonth, getYear} from "date-fns"
import styled from "@emotion/styled";
import {Dispatch, SetStateAction, useState} from "react";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px); /* 위에서 아래로 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px); /* 위로 올라가면서 사라짐 */
  }
`;


const months = [
     'Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const _ = require('lodash')
const hourArr = Array(25).fill(undefined).map((v,i)=> i);
const minuteArr = Array(61).fill(undefined).map((v,i)=> i);

const years = _.range(1980, getYear(new Date()) + 1, 1);
interface IProps {
    date: any ;
    setDate: Dispatch<SetStateAction<any>>;
  }

const DatepickerWrapper = styled.div`
    .react-datepicker__input-container input {
        background-color: rgba(255, 255, 255, 0.1); /* 반투명 배경 */
        color: white; /* 텍스트 색상 흰색 */
        border: 1px solid rgba(255, 255, 255, 0.3); /* 테두리 색상 */
        border-radius: 5px; /* 둥근 모서리 */
        padding: 10px; /* 내부 여백 */
        width: 100%; /* 전체 너비 사용 */
        box-sizing: border-box; /* 패딩 포함한 박스 사이즈 */
        font-size: 16px;
    }
    
    .react-datepicker-ignore-onclickoutside {
        background-color: rgba(255, 255, 255, 0);
        border: none;
        
    }
    

    /* 커스텀 드롭다운 스타일 */
    .react-datepicker__input-container {
        position: relative;
    }

    .react-datepicker{
        border-radius: 25px;
        opacity: 0.95;
        padding : 20px;
        animation: ${fadeIn} 0.4s ease forwards; /* 스르륵 나타나는 효과 */
        transition: opacity 0.4s ease; /* 사라질 때 효과 */

        &.fade-out {
        animation: ${fadeOut} 0.4s ease forwards; /* 스르륵 사라지는 효과 */
        }
    
    .react-datepicker__header {
        background-color: #fff;
        color: #000;
        border-bottom: 1.2px solid #ddd;
        font-weight: bold;
        border-radius: 2px;    
    }

    .react-datepicker__month-container {
        
        padding-bottom : 16px;

        .react-datepicker__day-names{
            
            width : 280px;
            display : flex;
            justify-content : center;
            align-items : center;
            box-sizing : border-box;
            
            .react-datepicker__day-name{
                display : flex;
                width : 40px;
                height : 40px;
                justify-content : center;
                align-items : center;
            }
        }

        .react-datepicker__current-month{
            float : left;
        }

        .react-datepicker__month{
            margin : 0px;
        }

        .react-datepicker__week{

            width : 280px;
            display : flex;
            justify-content : space-around;

            > * {
                display : flex;
                width : 40px;
                height : 40px;
                justify-content : center;
                align-items : center;
                color: var(--neutral-dark-medium, #494A50);
                text-align: center;
              
                font-family: Inter;
                font-size: 12px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
            }

            .react-datepicker__day--selected{
                border-radius: 15px;
                font-size: 15px;
                background: var(--highlight-darkest, #006FFD);
                display: flex;
                width: 40px;
                height: 40px;
                justify-content: center;
                align-items: center;
                color : #fff;
            }
        }
}


}
`;


//연월 선택 셀렉트 박스

const YearMonthSelect = styled.select<{width?: number}>`
  width: 'auto';
  border: none;
  font-size: 16px;
  font-weight: 800;
  padding-right: 20px;
  margin-right: 10px;
  background-color: #fff; /* 배경 색상 */
  border-radius: 5px; /* 테두리 둥글게 */
  padding: 5px;


`;




// YYYY-MM-DD 형태로 변경하는 함수입니다.

export function getDate(date : Date | null) {
	
    if(date !== null){
    
    return date.getFullYear() +
		'-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
		'-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
    }
}

const CustomerDatePicker = ({ date, setDate }: IProps) => {

    const [fade, setFade] = useState(true);

    const handleClose = () => {
        setFade(false); // 닫힐 때 애니메이션 적용
    };
    return (
        <DatepickerWrapper>
            <DatePicker
                formatWeekDay={(nameOfday) => nameOfday.toUpperCase().slice(0, 1)}
                selected={date}
                placeholderText="YYYY-MM-DD"
                onCalendarClose={handleClose} // 달력이 닫힐 때 애니메이션 적용
                onChange={(selectedDate: Date | null) => setDate(selectedDate)} // 수정: Date | null로 변경
                renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                    <div style={{ margin: 10 }}>
                        <Wrapper float="left">
                            <YearMonthSelect width={60}
                                value={getYear(date)}
                                onChange={({ target: { value } }) => changeYear(Number(value))}
                            >
                                {years.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </YearMonthSelect>
                            <YearMonthSelect width={60}
                                value={months[getMonth(date)]}
                                onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                            >
                                {months.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </YearMonthSelect>
                        </Wrapper>
                        <Wrapper float="right">
                            <Button width={12} height={12} style={{ backgroundColor: "transparent" }} position="relative" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                <ArrowLeft />
                            </Button>
                            <Button width={12} height={12} style={{ backgroundColor: "transparent" }} position="relative" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                <ArrowRight />
                            </Button>
                        </Wrapper>
                    </div>
                )}
            >
                {/* <Wrapper marginBottom={15}></Wrapper>
                <Button width={267} height={47}>확인</Button> */}
            </DatePicker>
        </DatepickerWrapper>
    );
};

export default CustomerDatePicker;