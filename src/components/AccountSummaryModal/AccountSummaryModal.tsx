import styles from "./AccountSummaryModal.module.css";
import sucessSvg from "../../assets/sucess.svg";
import secureSvg from "../../assets/secure.svg";
import type { AccountInfoRef } from "../CreateAccount/CreateAccount";

type AccountSummaryModalProps = {
  isOpen: boolean;
  accountInfo: AccountInfoRef | null;
};

const maskEmail = (email: string) => {
  const [local, domain] = email.split("@");

  if (!local || !domain) {
    return email;
  }

  const visiblePrefix = local.slice(0, 2);
  const maskedLength = Math.max(local.length - visiblePrefix.length, 4);
  return `${visiblePrefix}${"*".repeat(maskedLength)}@${domain}`;
};

const AccountSummaryModal = ({
  isOpen,
  accountInfo,
}: AccountSummaryModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleGoToDashboard = () => {
    window.location.reload();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <div className={styles.checkIconWrap}>
          <img src={sucessSvg} alt="success" className={styles.checkIcon} />
        </div>
        <div className={styles.modalTitle}>You're all set!</div>
        <div className={styles.modalSubtitle}>
          Here's a quick summary of your account details
        </div>
        <div className={styles.summaryPanel}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryKey}>Account Type</span>
            <span className={styles.summaryValue}>
              {accountInfo?.accountType || "-"}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryKey}>Email</span>
            <span className={styles.summaryValue}>
              {accountInfo?.email ? maskEmail(accountInfo.email) : "-"}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryKey}>Name</span>
            <span className={styles.summaryValue}>
              {accountInfo?.name || "-"}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryKey}>Mobile Number</span>
            <span className={styles.summaryValue}>
              {accountInfo?.phoneNumber || "-"}
            </span>
          </div>
        </div>
        <div className={styles.securityNote}>
          <span className={styles.securityIcon}>
            <img src={secureSvg} alt="success" className={styles.checkIcon} />
          </span>
          <span>Your account is secured with bank-grade security</span>
        </div>
        <button
          type="button"
          className={styles.dashboardButton}
          onClick={handleGoToDashboard}
        >
          Go To Dashboard
        </button>
      </div>
    </div>
  );
};

export default AccountSummaryModal;
