import { forwardRef, useCallback, useState } from "react";
import styles from "./PhoneNumberInput.module.css";
import type { AccountInfoRef } from "../CreateAccount/CreateAccount";
import Controls from "../Controls/Controls";

type PhoneNumberInputProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
const PhoneNumberInput = forwardRef<AccountInfoRef, PhoneNumberInputProps>(
  ({ setCurrentStep }, ref) => {
    const [error, setError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const handlePhoneChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        e.target.value = value;
        setPhoneNumber(value);
      },
      [],
    );

    const handleContinue = useCallback(() => {
      console.log(phoneNumber, "phoneNumber");
      if (phoneNumber.length !== 10) {
        setError(true);
        return;
      } else {
        setError(false);
        if (ref && typeof ref !== "function") {
          if (ref.current) {
            ref.current.phoneNumber = phoneNumber;
          }
          setCurrentStep((prev) => prev + 1);
        }
      }
    }, [phoneNumber, ref, setCurrentStep]);
    return (
      <>
        <div className={styles.mobileNumberInputContainer}>
          <div className={styles.title}>What is your mobile number ?</div>
          <div className={styles.phoneNumberRow}>
            <div className={styles.label}>
              Mobile Number <span className={styles.star}>*</span>
            </div>

            <div className={styles.phoneNumberInputContainer}>
              <div className={styles.countryCodeSelect}>
                <span className="fi fi-us"></span>
                <select
                  defaultValue="+1"
                  aria-label="Country code"
                  className={styles.code}
                >
                  <option value="+1">+1</option>
                </select>
              </div>
              <div>
                <input
                  type="tel"
                  className={styles.phoneNumberInput}
                  placeholder="8343989239"
                  aria-label="Phone number"
                  minLength={10}
                  maxLength={10}
                  inputMode="numeric"
                  onChange={handlePhoneChange}
                />
                {error && (
                  <div className={styles.errorMessage}>
                    Phone number must be 10 digits
                  </div>
                )}
              </div>
            </div>
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

export default PhoneNumberInput;
