import { useCallback, useRef, useState, type FC } from "react";
import styles from "./OtpVerification.module.css";
import Controls from "../Controls/Controls";

type OtpVerificationProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const OtpVerification: FC<OtpVerificationProps> = ({ setCurrentStep }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleContinue = useCallback(() => {
    if (otp.filter(Boolean).length !== 4) {
      setError(true);
    } else {
      setError(false);
      setCurrentStep((prev) => prev + 1);
    }
  }, [otp, setCurrentStep]);

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      const nextValue = value.replace(/\D/g, "").slice(-1);
      setOtp((prev) => {
        const next = [...prev];
        next[index] = nextValue;
        return next;
      });

      if (nextValue && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp.length],
  );

  return (
    <>
      <div className={styles.otpContainer}>
        <div className={styles.title}>OTP Verification</div>

        <div className={styles.content}>
          <div className={styles.subtitle}>
            An OTP has been sent to your mobile number
          </div>

          <div className={styles.otpRow}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(event) => handleOtpChange(index, event.target.value)}
                aria-label={`OTP digit ${index + 1}`}
                className={styles.otpInput}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
              />
            ))}
          </div>
          {error && (
            <div className={styles.errorMessage}>Please enter correct OTP</div>
          )}
          <div className={styles.resendWrap}>
            <span className={styles.resendOtpText}>Did not receive OTP? </span>

            <button type="button" className={styles.resendButton}>
              Resend OTP
            </button>
          </div>
        </div>
      </div>

      <Controls
        handleContinue={handleContinue}
        setCurrentStep={setCurrentStep}
      />
    </>
  );
};

export default OtpVerification;
