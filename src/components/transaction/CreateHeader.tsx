import { FC, MouseEventHandler } from "react";
import { Title, Wrapper, ControlGroup, Control } from "./style";
import {} from "./style";
import { useRouter } from "next/router";

const CreateHeader: FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ControlGroup>
        <Control onClick={() => router.back()}>Hủy</Control>
      </ControlGroup>
    </Wrapper>
  );
};

export default CreateHeader;
