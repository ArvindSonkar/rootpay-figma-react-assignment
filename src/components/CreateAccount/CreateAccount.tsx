import { useCallback, useRef, useState, type ReactNode } from "react";
import { CREATE_ACCOUNT_FLOW_STEPS } from "../../constants/create-account-flow.contant";
import styles from "./CreateAccount.module.css";
import AccountType from "../AccountType/AccountType";
import PhoneNumberInput from "../PhoneNumberInput/PhoneNumberInput";
import OtpVerification from "../OtpVerification/OtpVerification";
import UserInfo from "../UserInfo/UserInfo";
import CreatePassword from "../CreatePassword/CreatePassword";
import EmailInput from "../EmailInput/EmailInput";

export type AccountInfoRef = {
  accountType: "Personal" | "Business";
  name: string;
  phoneNumber: string;
  email: string;
};
const CreateAccount = () => {
  const [currentStep, setCurrentStep] = useState(
    CREATE_ACCOUNT_FLOW_STEPS.Role,
  );

  const accountInfoRef = useRef<AccountInfoRef | null>({
    accountType: "Personal",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const renderCurrentStep: () => ReactNode = useCallback(() => {
    switch (currentStep) {
      case CREATE_ACCOUNT_FLOW_STEPS.Role:
        return <AccountType ref={accountInfoRef} />;
      case CREATE_ACCOUNT_FLOW_STEPS.PhoneNumber:
        return <PhoneNumberInput ref={accountInfoRef} />;
      case CREATE_ACCOUNT_FLOW_STEPS.OtpVerification:
        return <OtpVerification ref={accountInfoRef} />;
      case CREATE_ACCOUNT_FLOW_STEPS.Email:
        return <EmailInput ref={accountInfoRef} />;
      case CREATE_ACCOUNT_FLOW_STEPS.FirstAndLastName:
        return <UserInfo ref={accountInfoRef} />;
      case CREATE_ACCOUNT_FLOW_STEPS.CreatePassword:
        return <CreatePassword ref={accountInfoRef} />;
      default:
        return <></>;
    }
  }, [currentStep]);

  const nextStep = useCallback(() => setCurrentStep((prev) => prev + 1), []);
  const previousStep = useCallback(
    () => setCurrentStep((prev) => (prev - 1 > 0 ? prev - 1 : 1)),
    [],
  );

  return (
    <div className={styles.createAccountFlowContainer}>
      {renderCurrentStep()}
      <div className={styles.actions}>
        <button className={styles.back} onClick={previousStep}>
          Back
        </button>
        <button className={styles.continue} onClick={nextStep}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
