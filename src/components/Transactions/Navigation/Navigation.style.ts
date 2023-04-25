import styled from "styled-components";

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  ul {
    margin: 5px 0;
    padding: 0px;
    display: flex;
    background-color: #262626;
    border-radius: 5px;
    .icon {
      color: #fff;
      position: relative;
      padding: 5px 15px;
      list-style: none;
      border-radius: 5px;
      cursor: pointer;
      z-index: 1;

      &:not(:last-child)::after {
        position: absolute;
        top: 50%;
        right: 0;
        content: "";
        display: block;
        height: 70%;
        border-right: 1px solid #8c8c8c;
        transform: translateY(-50%);
        z-index: 1;
      }

      &.active {
        background-color: #20c997;
      }
    }
  }
`;

export default Container;
