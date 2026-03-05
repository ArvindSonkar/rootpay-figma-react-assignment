import { forwardRef, useCallback, useState } from "react";
import styles from "./EmailInput.module.css";
import type { AccountInfoRef } from "../CreateAccount/CreateAccount";
import Controls from "../Controls/Controls";

type EmailInputProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const EmailInput = forwardRef<AccountInfoRef, EmailInputProps>(
  ({ setCurrentStep }, ref) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    const handleEmailChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value.trim());
        if (error) {
          setError(false);
        }
      },
      [error],
    );

    const handleContinue = useCallback(() => {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValidEmail) {
        setError(true);
        return;
      }

      setError(false);

      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.email = email;
      }

      setCurrentStep((prev) => prev + 1);
    }, [email, ref, setCurrentStep]);

    return (
      <>
        <div className={styles.emailInputContainer}>
          <div className={styles.title}>What is your email?</div>

          <div className={styles.emailRow}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>

            <input
              id="email"
              type="email"
              className={styles.emailInput}
              placeholder="oliver@example.com"
              aria-label="Email address"
              value={email}
              onChange={handleEmailChange}
            />

            {error && (
              <div className={styles.errorMessage}>
                Please enter a valid email address
              </div>
            )}
          </div>
        </div>

        <Controls
          handleContinue={handleContinue}
          setCurrentStep={setCurrentStep}
        />
      </>
    );
  },
);

export default EmailInput;
