import type { FC } from "react";
import styles from "./Controls.module.css";

type ControlsProps = {
  handleContinue: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const Controls: FC<ControlsProps> = ({ handleContinue, setCurrentStep }) => {
  return (
    <div className={styles.actions}>
      <button
        className={`${styles.button} ${styles.back}`}
        onClick={() => setCurrentStep((prev) => (prev - 1 > -1 ? prev - 1 : 1))}
      >
        Back
      </button>
      <button
        className={`${styles.button} ${styles.continue}`}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default Controls;
