"use client";
import { useRouter } from "next/navigation";
import styles from '../../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faArrowLeft, faEnvelope, faEyeSlash, faAppleAlt, faGamepad, faG, faF, faDove } from '@fortawesome/free-solid-svg-icons';
// import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";


export default function LoginPage() {
  const router = useRouter();

  return (
    <div className={styles.loginPage}>
      <header className={styles.header}>
        <div className={styles.cercleArrow}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <FontAwesomeIcon className={styles.arrowLeft} icon={faArrowLeft} />
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.divTitle}>
          <h1 className={styles.title}>Welcome back
            <br /> to Smartli!
          </h1>
        </div>

        <form className={styles.loginForm} method="post">
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email address</label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faEnvelope} />
              <input type="email" id="email" className={styles.input} placeholder="hello.john@email.com" required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faLock} />
              <input type="password" id="password" className={styles.input} placeholder="********" required />
              <span className={styles.toggleVisibility}><FontAwesomeIcon icon={faEyeSlash} /></span>
            </div>
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>

          <button type="submit" className={styles.signInButton}>Sign In</button>

          <div className={styles.orSeparator}>or with</div>

          <div className={styles.socialLogin}>
            <button className={styles.socialButton}><FontAwesomeIcon color="" icon={faAppleAlt} /></button>
            <button className={styles.socialButton}><FontAwesomeIcon color="#FBBC05" icon={faG} /></button>
            <button className={styles.socialButton}><FontAwesomeIcon color="#55ACEE" icon={faF} /></button>
            <button className={styles.socialButton}><FontAwesomeIcon icon={faDove} color=' rgba(0, 114, 233, 1)' /></button>
          </div>
        </form>

        <footer className={styles.footer}>
          <span>New User?</span>
          <a href="#" className={styles.signUpLink}>Sign Up</a>
        </footer>
      </main>
    </div>
  );
}