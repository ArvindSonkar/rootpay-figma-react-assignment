import { forwardRef } from "react";
import type { AccountInfoRef } from "../CreateAccount/CreateAccount";

type UserInfoProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const UserInfo = forwardRef<AccountInfoRef, UserInfoProps>(
  ({ setCurrentStep }, ref) => {
    return <>UserInfo</>;
  },
);

export default UserInfo;
