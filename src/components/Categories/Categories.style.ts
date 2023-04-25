import styled, { css } from "styled-components";

const Container = styled.ul`
  display: flex;
  flex-direction: column;
`;

const borderParent = css`
  &::before {
    content: "";
    display: block;
    border-left: 1px dashed #389e0d;
    width: 0;
    height: calc(100% - 72.5px);
    position: absolute;
    left: 37.5px;
    top: 45px;
    z-index: 100000;
  }
`;

const borderChild = css`
  &::before {
    content: "";
    display: block;
    border-top: 1px dashed #389e0d;
    width: 20px;
    position: absolute;
    left: 40px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100000;
  }
`;

export const CategoryItem = styled.li<{ hasChild?: boolean }>`
  position: relative;
  list-style: none;
  color: #fff;
  .category--wrapper {
    display: flex;
    padding: 10px 20px;
    cursor: pointer;
    .category--icon {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 35px;
      border-radius: 50%;
      background-color: #595959;
    }
    .category--title {
      line-height: 35px;
      flex: 1;
      margin-left: 10px;
      font-size: 18px;
    }
    &:hover {
      background: #595959;
    }
  }

  ul li {
    position: relative;
    padding: 0;
    ${(props) => props.hasChild && `${borderChild}`}

    .category--wrapper {
      display: flex;
      padding: 10px 20px 10px 60px;
    }
  }
  ${(props) => props.hasChild && `${borderParent}`}
`;

export default Container;
