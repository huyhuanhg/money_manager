import styled from "styled-components";

const Container = styled.div<{ bg?: string }>`
  display: flex;
  background-color: ${({ bg }: any) => (bg ? bg : "#1e1e1e")};
  gap: 10px;
  padding: 20px 10px;
  cursor: pointer;
`;
export const WalletPrefix = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;
`;
export const WalletBody = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  line-height: 30px;
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
`;
export const WalletSuffix = styled.div`
  font-size: 1.1rem;
  line-height: 30px;
  color: #20c997;
  font-weight: bold;
`;

export default Container;
