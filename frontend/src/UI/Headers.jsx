import { useSelector } from "react-redux";
import Logout from "../pages/Login/Logout";
import styles from "./Headers.module.css";
import { Link } from "react-router-dom";

function Headers() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className={styles.header}>
      <ul>
        <li className={styles.username}>
          <Link to="/hotels">Home</Link>
        </li>
        <li className={styles.username}>
          <Link to="/bookings">Booking</Link>
        </li>
        <li className={styles.username}>{user.username}</li>
        <li>
          <Logout />
        </li>
      </ul>
    </header>
  );
}

export default Headers;
