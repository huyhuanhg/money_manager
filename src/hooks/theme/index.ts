import { GlobalToken, theme } from 'antd';
import React, { useState, useEffect } from "react";
import ThemeProps from "./theme.props";

const useTheme = () => {
  const { token } = theme.useToken();
  console.log('token :>> ', token);
  return token
};

export default useTheme;
