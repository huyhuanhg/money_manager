import { Button, Field } from "../common";
import { FC, useEffect, useState } from "react";
import CreateCategoryDrawerProps from "./CreateCategoryDrawer.props";
import Container from "./CreateCategoryDrawer.style";
import * as FieldStyle from "@/components/common/Field/Field.style";
import { Input, Space } from "antd";
import { useUserContext } from "@/layouts/AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { DownOutlined } from "@ant-design/icons";
import ChoiceCategoryDrawer from "../ChoiceCategoryDrawer";
import CategoryReducerType from "@/types/reducers/CategoryReducerType";
import Category from "@/types/entities/CategoryType";
import { fetchStoreCategory } from "@/stores/category/action";

const CreateCategoryDrawer: FC<CreateCategoryDrawerProps> = ({
  isOpen,
  setDisplay,
  height,
  placement,
}) => {
  const { user } = useUserContext();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data: categories } = useSelector(
    ({ categoryReducer: categories }: Record<string, CategoryReducerType>) =>
      categories
  );
  const [isOpenParentCategoryDrawer, setIsOpenParentCategoryDrawer] =
    useState<boolean>(false);
  const [formState, setFormState] = useState<Record<string, any>>({
    category: {
      value: undefined,
      error: "",
    },
    parent_category: {
      value: undefined,
      label: "",
    },
  });
  const onClose = () => {
    setDisplay(false);
  };
  const onOpenParentCategoryDrawer = () => {
    setIsOpenParentCategoryDrawer(true);
  };
  const handleChangeFormState = (
    key: string,
    value: Record<string, unknown>
  ) => {
    setFormState({
      ...formState,
      [key]: {
        ...formState[key],
        ...value,
      },
    });
  };

  const onChangeParentCategory = (category: Category) => {
    handleChangeFormState("parent_category", {
      value: category.id,
      label: category.title,
      error: "",
    });

    setIsOpenParentCategoryDrawer(false);
  };

  const parseData = () => {
    const cloneData = { ...formState };
    let hasError = false;

    const validateRequired = (data: Record<string, any>, error: boolean) => {
      if (!data.value) {
        data.error = "Bắt buộc";

        return true;
      }

      return error;
    };

    for (const key in cloneData) {
      switch (key) {
        case "category":
          hasError = validateRequired(cloneData[key], hasError);
          break;
      }
    }

    if (hasError) {
      setFormState(cloneData);
      return false;
    }

    return {
      title: cloneData.category.value as string,
      icon: (cloneData.category.value as string).charAt(0).toUpperCase(),
      user: user?.email,
      parent_id: cloneData.parent_category.value || "",
    };
  };

  const onSubmit = () => {
    const data = parseData();

    if (!data) {
      return;
    }
    dispatch(fetchStoreCategory({ data })).then(() => setDisplay(false));
  };
  return (
    <Container
      height={height ?? "auto"}
      title="Danh mục mới"
      placement={placement ?? "top"}
      open={isOpen}
      onClose={onClose}
      footer={<Button onClick={onSubmit}>Lưu</Button>}
    >
      <Field prefix={"ICON"} required errorMsg={formState.category.error}>
        <FieldStyle.Input>
          <Input
            placeholder="Tên danh mục"
            value={formState.category.value}
            onChange={(e) =>
              handleChangeFormState("category", { value: e.target.value })
            }
            onFocus={() => {
              handleChangeFormState("category", { error: "" });
            }}
          />
        </FieldStyle.Input>
      </Field>
      <Field prefix={"ICON"} onClick={onOpenParentCategoryDrawer}>
        <FieldStyle.DrawerControl>
          <Space>
            {formState.parent_category.value ? (
              <span className="value">{formState.parent_category.label}</span>
            ) : (
              <span className="placeholder">Chọn danh mục cha</span>
            )}
            <span className="down-icon">
              <DownOutlined />
            </span>
          </Space>
        </FieldStyle.DrawerControl>
      </Field>
      <ChoiceCategoryDrawer
        isOpen={isOpenParentCategoryDrawer}
        setDisplay={setIsOpenParentCategoryDrawer}
        height="100vh"
        placement="bottom"
        onChange={onChangeParentCategory}
        data={categories.filter((category) => !category.parent_id)}
        footer={
          <Button onClick={() => setIsOpenParentCategoryDrawer(false)}>
            Hủy
          </Button>
        }
      />
    </Container>
  );
};

export default CreateCategoryDrawer;
