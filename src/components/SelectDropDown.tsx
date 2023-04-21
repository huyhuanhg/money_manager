import { FC, JSXElementConstructor, ReactElement } from "react";
import { DropDownWrapper } from "@/styles/SelectDropDownStyle";
import { Divider } from "antd";

interface Props {
  footer?: ReactElement<any, any>;
  menu: ReactElement<any, string | JSXElementConstructor<any>>;
}

const SelectDropDown: FC<Props> = ({ menu, footer }) => {
  return (
    <DropDownWrapper>
      {menu}
      {footer && (
        <>
          <Divider style={{ margin: "5px 0" }} />
          {footer}
        </>
      )}
    </DropDownWrapper>
  );
};

export default SelectDropDown;
