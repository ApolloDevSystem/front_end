import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #142952;
  padding: 10px 15px;
  color: #fff;
`;

export const MenuIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 3px;
`;

export const UserName = styled.span`
  font-weight: bold;
`;

export const NotificationIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
`;

export const Avatar = styled.div`
  width: 35px;
  height: 35px;
  background-color: #ffca28;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #142952;
`;
