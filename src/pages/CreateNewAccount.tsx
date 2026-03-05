import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import CreateAccount, {
  type AccountInfoRef,
} from "../components/CreateAccount/CreateAccount";
import { useState } from "react";
import { CreateNewAccountContext } from "../contexts/CreateNewAccountContext";

const CreateNewAccount = () => {
  const [isNewAccountCreated, setIsNewAccountCreated] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfoRef | null>(null);

  return (
    <CreateNewAccountContext.Provider
      value={{
        isNewAccountCreated,
        setIsNewAccountCreated,
        accountInfo,
        setAccountInfo,
      }}
    >
      <AuthLayout>
        <CreateAccount />
      </AuthLayout>
    </CreateNewAccountContext.Provider>
  );
};

export default CreateNewAccount;
