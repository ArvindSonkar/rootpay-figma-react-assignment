import { forwardRef, useCallback, useState } from "react";
import styles from "./AccountType.module.css";
import checkSvg from "../../assets/check.svg";
import PersonalIcon from "../Icons/PersonalIcon";
import BusinessIcon from "../Icons/BusinessIcon";
import type { AccountInfoRef } from "../CreateAccount/CreateAccount";
import Controls from "../Controls/Controls";

type AccountTypeProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const AccountType = forwardRef<AccountInfoRef, AccountTypeProps>(
  ({ setCurrentStep }, ref) => {
    const [selectedAccountType, setSelectedAccountType] = useState("Personal");
    const accountTypeOptions = [
      {
        accountType: "Personal",
        title: "Personal",
        icon: <PersonalIcon />,
      },
      {
        accountType: "Business",
        title: "Business",
        icon: <BusinessIcon />,
      },
    ];

    const onAccountTypeChange = useCallback(
      (accountType: "Personal" | "Business") => {
        setSelectedAccountType(accountType);

        if (ref && typeof ref !== "function") {
          if (ref.current) {
            ref.current.accountType = accountType;
          }
        }
      },
      [ref],
    );

    const handleContinue = useCallback(
      () => setCurrentStep((prev) => prev + 1),
      [setCurrentStep],
    );

    return (
      <>
        <div className={styles.titleButtonContainer}>
          <div className={styles.titleContainer}>
            <span className={styles.title}>To join us tell us </span>
            <span className={styles.boldTitle}>what type of account</span>
            <div className={styles.title}>you are opening</div>
          </div>
          <div className={styles.buttonContainer}>
            {accountTypeOptions.map(({ accountType, title, icon }) => {
              const isSelected = accountType === selectedAccountType;
              return (
                <button
                  onClick={() =>
                    onAccountTypeChange(accountType as "Personal" | "Business")
                  }
                  className={`${styles.option} ${isSelected ? styles.selectedOption : ""}`}
                >
                  <div className={styles.iconText}>
                    {icon}
                    <span className={styles.optionText}>{title}</span>
                  </div>

                  {isSelected && (
                    <span className={styles.check}>
                      <img src={checkSvg} alt="check icon" />
                    </span>
                  )}
                </button>
              );
            })}
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

export default AccountType;
