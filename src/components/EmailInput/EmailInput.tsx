import { forwardRef } from "react";
import type { AccountInfoRef } from "../CreateAccount/CreateAccount";

type EmailInputProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const EmailInput = forwardRef<AccountInfoRef, EmailInputProps>(
  ({ setCurrentStep }, ref) => {
    return <>EmailInput</>;
  },
);

export default EmailInput;
