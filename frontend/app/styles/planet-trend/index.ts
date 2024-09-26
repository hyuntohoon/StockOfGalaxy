import styled from '@emotion/styled';

export const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  background: #f7f6f8fb;
  border-radius: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 12px;
  z-index: 2000;
  min-width: 320px; // 최소 너비 유지
  height: 50px;
  width: auto; // 내용에 따라 너비가 자동으로 조절됨
`;


export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 10px;
`;

export const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
  flex: 2;
`;

export const Logo = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 12px;
  border-radius: 20px;
`;

export const CompanyName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
`;

export const StockPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const Change = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.color};
`;
