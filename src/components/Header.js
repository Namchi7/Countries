import { Link } from "react-router-dom";

import styles from "./css/header.module.css";
import logo from "../assets/images/logo.svg";

function Header() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="LSCountry" />
        </Link>
        <Link to="/about">
          <span className={styles.about} id="about-page" data-about-page>
            About
          </span>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
