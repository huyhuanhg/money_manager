import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  ul {
    margin-top: 5px;
    padding: 0px;
    display: flex;
    background-color: #262626;
    border-radius: 5px;
    .mode-icon {
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

export { Nav };
