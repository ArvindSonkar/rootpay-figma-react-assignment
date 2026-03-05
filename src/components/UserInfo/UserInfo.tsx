import { forwardRef, useCallback, useState } from "react";
import styles from "./UserInfo.module.css";
import type { AccountInfoRef } from "../CreateAccount/CreateAccount";
import Controls from "../Controls/Controls";

type UserInfoProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const UserInfo = forwardRef<AccountInfoRef, UserInfoProps>(
  ({ setCurrentStep }, ref) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(false);

    const handleFirstNameChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
        if (error) {
          setError(false);
        }
      },
      [error],
    );

    const handleLastNameChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
        if (error) {
          setError(false);
        }
      },
      [error],
    );

    const handleContinue = useCallback(() => {
      const first = firstName.trim();
      const last = lastName.trim();

      if (!first || !last) {
        setError(true);
        return;
      }

      setError(false);

      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.name = `${first} ${last}`;
      }

      setCurrentStep((prev) => prev + 1);
    }, [firstName, lastName, ref, setCurrentStep]);

    return (
      <>
        <div className={styles.userInfoContainer}>
          <div className={styles.title}>What is your name?</div>

          <div className={styles.formContainer}>
            <div className={styles.fieldGroup}>
              <label htmlFor="firstName" className={styles.label}>
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className={styles.input}
                placeholder="Oliver"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>

            {error && (
              <div className={styles.errorMessage}>
                Please enter first and last name
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

export default UserInfo;
