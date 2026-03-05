import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { CREATE_ACCOUNT_FLOW_STEPS } from "../../constants/create-account-flow.contant";
import styles from "./CreateAccount.module.css";
import AccountType from "../AccountType/AccountType";
import PhoneNumberInput from "../PhoneNumberInput/PhoneNumberInput";
import OtpVerification from "../OtpVerification/OtpVerification";
import UserInfo from "../UserInfo/UserInfo";
import CreatePassword from "../CreatePassword/CreatePassword";
import EmailInput from "../EmailInput/EmailInput";
import LinearProgress from "@mui/material/LinearProgress";
import { useCreateNewAccountContext } from "../../contexts/CreateNewAccountContext";

export type AccountInfoRef = {
  accountType: "Personal" | "Business";
  name: string;
  phoneNumber: string;
  email: string;
};

const initialAccountInfo: AccountInfoRef = {
  accountType: "Personal",
  name: "",
  phoneNumber: "",
  email: "",
};

const CreateAccount = () => {
  const [currentStep, setCurrentStep] = useState(
    CREATE_ACCOUNT_FLOW_STEPS.AccountType,
  );

  const {setIsNewAccountCreated, setAccountInfo } =
    useCreateNewAccountContext();

  const accountInfoRef = useRef<AccountInfoRef | null>({
    ...initialAccountInfo,
  });

  const handleCreatePasswordComplete = useCallback(() => {
    setAccountInfo({ ...(accountInfoRef.current || initialAccountInfo) });
    setIsNewAccountCreated(true);
  }, [setAccountInfo, setIsNewAccountCreated]);

  const renderCurrentStep: () => ReactNode = useCallback(() => {
    switch (currentStep) {
      case CREATE_ACCOUNT_FLOW_STEPS.AccountType:
        return (
          <AccountType setCurrentStep={setCurrentStep} ref={accountInfoRef} />
        );
      case CREATE_ACCOUNT_FLOW_STEPS.PhoneNumber:
        return (
          <PhoneNumberInput
            setCurrentStep={setCurrentStep}
            ref={accountInfoRef}
          />
        );
      case CREATE_ACCOUNT_FLOW_STEPS.OtpVerification:
        return <OtpVerification setCurrentStep={setCurrentStep} />;
      case CREATE_ACCOUNT_FLOW_STEPS.Email:
        return (
          <EmailInput setCurrentStep={setCurrentStep} ref={accountInfoRef} />
        );
      case CREATE_ACCOUNT_FLOW_STEPS.FirstAndLastName:
        return (
          <UserInfo setCurrentStep={setCurrentStep} ref={accountInfoRef} />
        );
      case CREATE_ACCOUNT_FLOW_STEPS.CreatePassword:
        return (
          <CreatePassword
            setCurrentStep={setCurrentStep}
            onComplete={handleCreatePasswordComplete}
          />
        );
      default:
        return <></>;
    }
  }, [currentStep, handleCreatePasswordComplete]);

  const progressBarValue = useMemo(() => currentStep / 5, [currentStep]);

  return (
    <div className={styles.createAccountFlowContainer}>
      {progressBarValue > 0 && (
        <LinearProgress
          variant="determinate"
          value={progressBarValue * 100}
          sx={{
            width: "78%",
            height: "5px",
            borderRadius: "12px",
            backgroundColor: "transparent",
            border: "1px solid #0054FD",
            position: "absolute",
            top: "-1%",
            right: "10%",
            overflow: "hidden",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#0054FD",
              borderRadius: "12px",
            },
          }}
        />
      )}
      {renderCurrentStep()}
    </div>
  );
};

export default CreateAccount;
