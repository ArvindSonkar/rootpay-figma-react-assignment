import { forwardRef, useCallback } from "react";
import styles from "./OtpVerification.module.css";
import type { AccountInfoRef } from "../CreateAccount/CreateAccount";
import Controls from "../Controls/Controls";

type OtpVerificationProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
const OtpVerification = forwardRef<AccountInfoRef, OtpVerificationProps>(
  ({ setCurrentStep }, ref) => {
    const handleContinue = useCallback(
      () => setCurrentStep((prev) => prev + 1),
      [setCurrentStep],
    );
    return (
      <>
        <div className={styles.otpInputContainer}></div>
        <Controls
          handleContinue={handleContinue}
          setCurrentStep={setCurrentStep}
        />
      </>
    );
  },
);

export default OtpVerification;
