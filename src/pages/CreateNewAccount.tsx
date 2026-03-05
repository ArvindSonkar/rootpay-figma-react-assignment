import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import CreateAccount from "../components/CreateAccount/CreateAccount";

const CreateNewAccount = () => {
  return (
    <AuthLayout>
      <CreateAccount />
    </AuthLayout>
  );
};

export default CreateNewAccount;