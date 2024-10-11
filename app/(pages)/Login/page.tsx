"use client";
import { useRouter } from "next/navigation";
import styles from '../../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faArrowLeft, faEnvelope, faEyeSlash, faAppleAlt, faGamepad, faG, faF, faDove } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ChangeEvent, FormEvent } from "react";
import { changeCredentialsField, login } from "../../store/reducers/login";



export default function LoginPage() {
  const router = useRouter();
  const email = useAppSelector((state) => state.login.credentials.email);
  const password = useAppSelector((state) => state.login.credentials.password);
  const errorLogin = useAppSelector((state) => state.login.errorLogin);
  const logged = useAppSelector((state) => state.login.logged);
  const dispatch = useAppDispatch();
  const HandlerChangeField = (field: 'email' | 'password') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      dispatch(changeCredentialsField({
        value,
        field,
      }));
    };

  async function handlerSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await dispatch(login());
  }
  if (logged === true) {
    setTimeout(() => {
      router.push("/home");
    }, 100);
  }
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

        <form onSubmit={handlerSubmit} className={styles.loginForm} method="POST" action="submit">
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email address</label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                onChange={HandlerChangeField('email')}
                type="email"
                value={email}
                name="email"
                id="email"
                className={styles.input}
                placeholder="hello.john@email.com"
                required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <FontAwesomeIcon icon={faLock} />
              <input
                onChange={HandlerChangeField('password')}
                value={password}
                name="password"
                type="password"
                id="password"
                className={styles.input}
                placeholder="********"
                required />
              <span className={styles.toggleVisibility}><FontAwesomeIcon icon={faEyeSlash} /></span>
            </div>
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>
          {/* Message d'erreur avec Tailwind */}


          {/* Afficher un message d'erreur si nécessaire */}
          {errorLogin && <p className="text-red-500 text-sm mt-2">{errorLogin}</p>}

          <button type="submit" className={styles.signInButton}>Sign In</button>
          <div className={styles.orSeparator}>or with</div>
          <div className={styles.socialLogin}>
            <button className={styles.socialButton}><FontAwesomeIcon color="black" icon={faAppleAlt} /></button>
            <button className={styles.socialButton}><FontAwesomeIcon color="#FBBC05" icon={faG} /></button>
            <button className={styles.socialButton}><FontAwesomeIcon color="#55ACEE" icon={faF} /></button>
            <button className={styles.socialButton}><FontAwesomeIcon icon={faDove} color=' rgba(0, 114, 233, 1)' /></button>
          </div>
        </form>

        <footer className={styles.footer}>
          <span>New User?</span>
          <a onClick={() => router.push("/register")}
            className={styles.signUpLink}>Sign Up</a>
        </footer>
      </main>
    </div>
  );
}