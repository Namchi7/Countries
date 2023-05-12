import { Link } from "react-router-dom";
import styles from "./css/notfound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.errorMsg}>404 - Page Not Found</div>
      <Link to="/" className={styles.homeBtn}>
        Go To Homepage
      </Link>
    </div>
  );
}

export default NotFound;
