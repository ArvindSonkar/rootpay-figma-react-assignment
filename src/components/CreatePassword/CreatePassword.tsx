import { forwardRef } from "react";
import type { AccountInfoRef } from "../CreateAccount/CreateAccount";

type CreatePasswordProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const CreatePassword = forwardRef<AccountInfoRef, CreatePasswordProps>(
  ({ setCurrentStep }, ref) => {
    return <>CreatePassword.tsx</>;
  },
);

export default CreatePassword;
