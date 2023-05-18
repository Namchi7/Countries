import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./css/home.module.css";

import Countries from "../assets/json/Countries2.json";

function allEventListeners(setKeyword) {
  // document.body.style.backgroundImage = "none";
  const keyword = document.querySelector("[data-keyword]");
  // const resultsList = document.querySelector("[data-results-list]");
  // const results = document.querySelector("[data-results]");

  if (keyword !== "") {
    keyword.addEventListener("input", () => {
      // console.log(keyword.value);

      setKeyword(keyword.value);

      // if (keyword.value === "") results.style.display = "none";
      // if (resultsList.innerHTML === "") results.style.display = "none";
    });
  }
}

function Home() {
  const [keyword, setKeyword] = useState("");
  const result = Countries.sort().filter((item) =>
    item.toLowerCase().includes(keyword.toLowerCase())
  );

  useEffect(() => {
    // const isHome = window.location.pathname === "/" ? true : false;
    // const results = document.querySelector("[data-results]");

    allEventListeners(setKeyword);

    // console.log(result);

    // if (result.length !== 0) results.style.display = "flex";
    // else results.style.display = "none";
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.searchCountry}>Search Country</h1>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Country Name..."
          className={styles.keyword}
          data-keyword
        />
        {/* <input type="submit" value="Search" className={styles.searchBtn} /> */}
      </div>

      <div className={styles.results} data-results>
        <ul className={styles.resultsList} data-results-list>
          {result.length !== 0 ? (
            result.map((item) => (
              <li
                key={item}
                className={styles.resultItem}
                data-result-countries
              >
                <Link to={`/country/${item}`}>{item}</Link>
              </li>
            ))
          ) : (
            <li className={styles.resultItem} data-result-countries>
              No Matching Results
            </li>
          )}
        </ul>
      </div>

      <span className={styles.instruction}>
        Click on the country name to see full information.
      </span>
    </div>
  );
}
export default Home;
