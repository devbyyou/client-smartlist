"use client";
import { useRouter } from "next/navigation";
import styles from '../../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faArrowLeft, faEnvelope, faEyeSlash, faAppleAlt, faGamepad, faG, faF, faDove, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ChangeEvent, FormEvent } from "react";
import { changeCredentialsField, register } from "../../store/reducers/register";



export default function RegisterPage() {
    // const router = useRouter();
    const router = useRouter();
    const email = useAppSelector((state) => state.register.credentials.email);
    const password = useAppSelector((state) => state.register.credentials.password);
    const name = useAppSelector((state) => state.register.credentials.name);
    const errorLogin = useAppSelector((state) => state.register.errorLogin);
    const isRegister = useAppSelector((state) => state.register.isRegister);
    const dispatch = useAppDispatch();
    const HandlerChangeField = (field: 'email' | 'password' | 'name') =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            dispatch(changeCredentialsField({
                value,
                field,
            }));
        };

    async function handlerSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        await dispatch(register());
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
                    <h1 className={styles.title}>Welcome to Smartli!
                    </h1>
                </div>

                <form onSubmit={handlerSubmit} className={styles.loginForm} method="POST" action="submit">
                    {/* input */}

                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>Full name</label>
                        <div className={styles.inputWrapper}>
                            <FontAwesomeIcon icon={faPerson} />
                            <input
                                onChange={HandlerChangeField('name')}
                                type="text"
                                value={name}
                                name="name"
                                id="name"
                                className={styles.input}
                                placeholder="John Xavier"
                            />
                        </div>
                    </div>

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
                        {/* <a href="#" className={styles.forgotPassword}>Forgot password?</a> */}
                    </div>
                    {/* Message d'erreur avec Tailwind */}
                    {errorLogin &&
                        <p className="text-red-500 text-sm mt-2">
                            {errorLogin}
                        </p>}

                    {isRegister &&
                        <p className="text-green-500 text-sm mt-2">
                            Enregistré avec succès !
                        </p>}

                    {/* Message d'erreur avec Tailwind */}
                    <button type="submit" className={styles.signInButton}>Sign Up</button>
                    <div className={styles.orSeparator}>or with</div>
                    <div className={styles.socialLogin}>
                        <button className={styles.socialButton}><FontAwesomeIcon color="black" icon={faAppleAlt} /></button>
                        <button className={styles.socialButton}><FontAwesomeIcon color="#FBBC05" icon={faG} /></button>
                        <button className={styles.socialButton}><FontAwesomeIcon color="#55ACEE" icon={faF} /></button>
                        <button className={styles.socialButton}><FontAwesomeIcon icon={faDove} color=' rgba(0, 114, 233, 1)' /></button>
                    </div>
                </form>

                <footer className={styles.footer}>
                    <span>Already have an account ?</span>
                    <a onClick={() => router.push('/login')}className={styles.signUpLink}>Sign In</a>
                </footer>
            </main>
        </div>
    );
}