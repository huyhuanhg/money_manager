import { FC, MouseEventHandler } from "react";
import { Title, Wrapper, ControlGroup, Control } from "./style";
import {} from "./style";
import { useRouter } from "next/router";

const CreateHeader: FC = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <Title>Thêm giao dịch</Title>
      <ControlGroup>
        <Control onClick={() => router.back()}>Hủy</Control>
      </ControlGroup>
    </Wrapper>
  );
};

export default CreateHeader;
