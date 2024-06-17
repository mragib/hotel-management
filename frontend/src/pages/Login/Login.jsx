import styles from "./Login.module.css";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <main className={styles.main}>
      <h4>Log in to your account</h4>
      <LoginForm />
    </main>
  );
}
