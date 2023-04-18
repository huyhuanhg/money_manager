import { AuthComponentProps } from "@/types/AuthComponentProps";
import Layout from "@/layouts/TransactionCreateLayout";

const TransactionCreate = ({user}: AuthComponentProps) => {
  return (
    <Layout>
      {user.email}
    </Layout>
  );
};

export default TransactionCreate;
