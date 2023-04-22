import { AuthComponentProps } from "@/types/props/AuthComponentProps";
import Layout from "@/layouts/TransactionLayout";
import { useState } from "react";
import { Input, Space, Switch } from "antd";
import * as FieldStyle from "@/components/common/Field/Field.style";
import { DatePicker, Field } from "@/components/common";
import { DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";

const TransactionCreate = ({ user }: AuthComponentProps) => {
  const [mode, setMode] = useState({
    type: "trans",
    title: "Thêm giao dịch",
  });

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <Layout title={mode.title} type={mode.type}>
      <Field prefix={"ICON"} errorMsg="Bắt buộc" required>
        <FieldStyle.FieldNumber
          addonAfter="đ"
          placeholder="Nhập số tiền"
          formatter={(value) =>
            `${(value as string).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          }
        />
      </Field>
      <Field prefix={"ICON"} errorMsg="Bắt buộc" required>
        <FieldStyle.DrawerControl>
          <Space>
            <span className="placeholder">Chọn danh mục</span>
            <span className="down-icon">
              <DownOutlined />
            </span>
          </Space>
        </FieldStyle.DrawerControl>
      </Field>
      <Field prefix={"ICON"} errorMsg="Bắt buộc" required>
        <FieldStyle.DrawerControl>
          <Space>
            <span className="placeholder">Chọn ví</span>
            <span className="down-icon">
              <DownOutlined />
            </span>
          </Space>
        </FieldStyle.DrawerControl>
      </Field>
      <Field prefix={"ICON"}>
        <FieldStyle.DateTimePicker>
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            disabledDate={disabledDate}
            defaultValue={dayjs()}
            showTime={{ defaultValue: dayjs("HH:mm") }}
          />
        </FieldStyle.DateTimePicker>
      </Field>
      <Field prefix={"ICON"}>
        <FieldStyle.Input>
          <Input placeholder="Ghi chú" />
        </FieldStyle.Input>
      </Field>
      <Field>
        <FieldStyle.ReportMode>
          <span className="label">Không đưa vào báo cáo</span>
          <Switch defaultChecked />
        </FieldStyle.ReportMode>
      </Field>
    </Layout>
  );
};

export default TransactionCreate;
