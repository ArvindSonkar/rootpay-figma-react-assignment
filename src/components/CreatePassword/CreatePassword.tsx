import { useCallback, useMemo, useState, type FC } from "react";
import styles from "./CreatePassword.module.css";
import Controls from "../Controls/Controls";
import eyeIcon from "../../assets/eye.svg";
import eyeOffIcon from "../../assets/eye-off.svg";

type CreatePasswordProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  onComplete: () => void;
};

const CreatePassword: FC<CreatePasswordProps> = ({
  setCurrentStep,
  onComplete,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isMinLengthValid = useMemo(() => password.length >= 6, [password]);
  const isMatchValid = useMemo(
    () => password.length > 0 && password === confirmPassword,
    [confirmPassword, password],
  );

  const handleContinue = useCallback(() => {
    setSubmitted(true);
    if (!isMinLengthValid || !isMatchValid) {
      return;
    }

    onComplete();
  }, [isMatchValid, isMinLengthValid, onComplete]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Create Password for your account</div>

        <div className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>
              Enter new password
            </label>

            <div className={styles.inputWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Enter new password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-label="Enter new password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <img
                  src={showPassword ? eyeIcon : eyeOffIcon}
                  alt="Toggle password visibility"
                  className={styles.eyeIcon}
                />
              </button>
            </div>

            {submitted && !isMinLengthValid ? (
              <div className={styles.errorText}>Must be atleast 6 characters</div>
            ) : null}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm password
            </label>

            <div className={styles.inputWrapper}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Confirm  password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                aria-label="Confirm password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                <img
                  src={showConfirmPassword ? eyeIcon : eyeOffIcon}
                  alt="Toggle confirm password visibility"
                  className={styles.eyeIcon}
                />
              </button>
            </div>

            {submitted && !isMatchValid ? (
              <div className={styles.errorText}>Both passwords must match</div>
            ) : null}
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

export default CreatePassword;
