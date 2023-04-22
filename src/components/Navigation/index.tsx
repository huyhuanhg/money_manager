import {
  BarsOutlined,
  LineChartOutlined,
  MoneyCollectOutlined,
  PlusOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Container, * as Style from "./Navigation.style";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter()

  const onChange = (key: string) => {
    router.push(key)
  }

  return (
    <Container>
      <ul>
        <Style.NavItem isActive={router.pathname === '/'} onClick={() => onChange('/')}>
          <WalletOutlined className="icon" />
          <span className="label">Ví</span>
        </Style.NavItem>
        <Style.NavItem isActive={router.pathname === '/budget'} onClick={() => onChange('/budget')}>
          <MoneyCollectOutlined className="icon" />
          <span className="label">Ngân sách</span>
        </Style.NavItem>
        <Style.NavItem isAction onClick={() => onChange('/transaction')}>
          <span className="icon">
            <PlusOutlined />
          </span>
        </Style.NavItem>
        <Style.NavItem isActive={router.pathname === '/report'} onClick={() => onChange('/report')}>
          <LineChartOutlined className="icon" />
          <span className="label">Báo cáo</span>
        </Style.NavItem>
        <Style.NavItem isActive={router.pathname === '/other'} onClick={() => onChange('/other')}>
          <BarsOutlined className="icon" />
          <span className="label">Khác</span>
        </Style.NavItem>
      </ul>
    </Container>
  );
};

export default Navigation;
