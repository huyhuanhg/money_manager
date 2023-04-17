import styles from "@/styles/Navigation.module.css";
import {
  BarsOutlined,
  LineChartOutlined,
  MoneyCollectOutlined,
  PlusOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li className={`${styles.menuItem} ${styles.active}`}>
          <WalletOutlined className={styles.icon} />
          <span className={styles.label}>Ví</span>
        </li>
        <li className={styles.menuItem}>
          <MoneyCollectOutlined className={styles.icon} />
          <span className={styles.label}>Ngân sách</span>
        </li>
        <li className={`${styles.menuItem} ${styles.newTrans}`}>
          <span className={styles.newTransIcon}><PlusOutlined /></span>
        </li>
        <li className={styles.menuItem}>
          <LineChartOutlined className={styles.icon} />
          <span className={styles.label}>Báo cáo</span>
        </li>
        <li className={styles.menuItem}>
          <BarsOutlined className={styles.icon} />
          <span className={styles.label}>Khác</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation
