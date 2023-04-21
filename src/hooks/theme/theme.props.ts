import { ComponentTokenMap } from "antd/es/theme/interface";
import { AliasToken } from "antd/es/theme/internal";

export default interface ThemeProps {
  key?: AliasToken & ComponentTokenMap
}
