import styles from "./AuthLayout.module.css";
import type { ReactNode } from "react";
import boySvg from "../../assets/boy.svg";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* LEFT SECTION */}
        <div className={styles.leftSection}>
          <div className={styles.leftSectionTextContainer}>
            <span className={styles.subtitle}>Let's get started</span>
            <h1 className={styles.title}>Create your account</h1>
            <p className={styles.description}>
              Follow the steps to create your account
            </p>
          </div>

          <div className={styles.imageContainer}>
            <img src={boySvg} alt="illustration" className={styles.image} />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className={styles.rightSection}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
