import styled from "styled-components";

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: black;
  color: #fff;

  ul {
    display: flex;
    justify-content: center;
  }
`;

export const NavItem = styled.li<{ isAction?: boolean, isActive?: boolean }>`
  list-style: none;
  flex: 0 0 ${(props) => (props.isAction ? "40px" : "calc((100% - 40px) / 4)")};
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 6px 0 8px;
  cursor: pointer;

  ${(props) => props.isAction && "justify-content: center;"};
  ${(props) => props.isActive && "color: #20c997;"};

  &:last-of-type {
    border-left: 1px solid #888888;
  }

  &:first-of-type {
    border-right: 1px solid #888888;
  }

  .label {
    font-size: 14px;
  }

  .icon {
    ${(props) =>
      props.isAction
        ? `width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: #20c997;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transform: scale(1.5);`
        : `
          font-size: 18px;
          margin-bottom: 3px;`};
  }
`;

export default Container;
