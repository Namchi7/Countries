import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import styles from "./css/country.module.css";
import CountryList from "../assets/json/Countries2.json";
import NotFound from "./NotFound";

function validateCountryName() {
  const countryName = window.location.pathname.substring(9).split("/")[0];
  if (CountryList.includes(countryName)) {
    console.log("Valid Country Name");
  } else {
    console.log("inValid Country Name");
  }
}

async function fetchCountryData(setCountry, setLoading) {
  const path = window.location.pathname;
  const cont = path.substring(9);
  console.log(cont.length);

  const url =
    cont.length > 3
      ? `https://restcountries.com/v3.1/name/${cont}?fullText=true`
      : `https://restcountries.com/v3.1/alpha/${cont}`;

  // const url = `https://restcountries.com/v3.1/name/${cont}?fullText=true`;

  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) setCountry(data[0]);
      else setCountry(data);
      // setCountry(data[0]);
      setLoading(false);
    });
}

function resolveData(countryData) {
  console.log(countryData);
  const resolveNative = (val) => {
    const allKeys = Object.keys(val);
    const nonEngKey = allKeys.filter((k) => {
      if (k !== "eng") return val[k];
    });
    nonEngKey.push("eng");
    return val[nonEngKey[0]].common;
  };

  // console.log(resolveNative(countryData.name.nativeName));
  const resolvedCountry = {
    countryName: countryData.name.common,
    nativeName: resolveNative(countryData.name.nativeName),
    officialCountryName: countryData.name.official,
    capital: countryData.capital[0],
    region: countryData.region,
    subRegion: countryData.subregion,
    latitude: countryData.latlng[0],
    longitude: countryData.latlng[1],
    timezones: countryData.timezones,
    flag: countryData.flags,
    currency: countryData.currencies,
    borders: countryData.hasOwnProperty("borders") ? countryData.borders : null,
    area: countryData.area,
    languages: countryData.languages,
    translations: countryData.translations,
    altSpellings: countryData.altSpellings,
    carSide: countryData.car.side,
    googleMap: countryData.maps.googleMaps,
    postalCode: countryData.postalCode,
    independent: countryData.independent,
    unMember: countryData.unMember,
    landlocked: countryData.landlocked,
    population: countryData.population,
    iddPrefix: countryData.idd,
    startOfWeek: countryData.startOfWeek,
    tld: countryData.tld,
  };
  return resolvedCountry;
}

function Country() {
  const navigate = useNavigate();

  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  let countryRes;
  const { cnt } = useParams();

  // const countryInfo = useSelector((state) => state.country.info);

  function setBackgroundImage(bgImage) {
    const body = document.body;
    body.style.backgroundImage = `url(${bgImage})`;
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
    body.style.backgroundColor = "rgb(153, 153, 153,0.25)";
  }

  const path = window.location.pathname;
  const countryName = path.includes("country")
    ? path.substring(9)
    : path.split("/")[2];
  // const countryName = window.location.pathname.substring(9).split("/")[0];
  console.log(countryName);

  console.log(loading);
  if (loading === false) {
    if (country.status !== 404) {
      countryRes = resolveData(country);
      console.log(countryRes);
      setBackgroundImage(countryRes.flag.svg);
    } else {
      navigate(`/404/${countryName}`);
    }
  }

  // console.log(contData);

  useEffect(() => {
    // dispatch(setLoading);
    fetchCountryData(setCountry, setLoading);
    console.log(country);
    validateCountryName();
    // dispatch(getCountry(country));
  }, [cnt]);

  return (
    <div className={styles.container}>
      {loading === false ? (
        <>
          <div className={styles.firstFours}>
            <div className={styles.basicInfo}>
              <div className={styles.basicInfoItem}>
                <h1>{countryRes.countryName}</h1>
                <span>{countryRes.nativeName}</span>
              </div>

              <div className={styles.basicInfoItem}>
                <span className={styles.basicInfoItemLabel}>
                  Official Country Name:
                </span>
                <span>{countryRes.officialCountryName}</span>
              </div>

              <div className={styles.basicInfoItem}>
                <span className={styles.basicInfoItemLabel}>Capital:</span>
                <span>{countryRes.capital}</span>
              </div>

              <div className={styles.basicInfoItem}>
                <span className={styles.basicInfoItemLabel}>Region:</span>
                <span>{countryRes.region}</span>
              </div>

              <div className={styles.basicInfoItem}>
                <span className={styles.basicInfoItemLabel}>Sub-Region:</span>
                <span>{countryRes.subRegion}</span>
              </div>

              <div className={styles.basicInfoItem}>
                <span className={styles.basicInfoItemLabel}>Latitude:</span>
                <span>{countryRes.latitude}</span>
              </div>

              <div className={styles.basicInfoItem}>
                <span className={styles.basicInfoItemLabel}>Longitude:</span>
                <span>{countryRes.longitude}</span>
              </div>

              <div className={styles.basicInfoItem}>
                <span className={styles.basicInfoItemLabel}>Timezone:</span>
                <span>{countryRes.timezones[0]}</span>
              </div>
            </div>

            <div className={styles.countryFlagContainer}>
              <img
                src={countryRes.flag.svg}
                alt={countryRes.flag.alt}
                className={styles.countryFlag}
                data-country-flag
              />
            </div>

            <div className={styles.otherInfo}>
              <div className={styles.otherInfoTile}>
                <div className={styles.otherInfoHeader}>Currency</div>
                <div className={styles.otherInfoContent}>
                  <div className={styles.currency}>
                    {Object.values(countryRes.currency)[0].symbol}
                  </div>
                  <div className={styles.currencyName}>
                    {Object.values(countryRes.currency)[0].name}
                  </div>
                </div>
              </div>

              <div className={styles.otherInfoTile}>
                <div className={styles.otherInfoHeader}>
                  Borders({countryRes.borders.length})
                </div>
                <div className={styles.otherInfoContent}>
                  <div className={styles.allBorders}>
                    {countryRes.borders !== null ? (
                      countryRes.borders.map((border) => (
                        <div className={styles.border}>
                          <Link to={`/country/${border}`}>{border}</Link>
                        </div>
                      ))
                    ) : (
                      <div>No Borders</div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.otherInfoTile}>
                <div className={styles.otherInfoHeader}>Area</div>
                <div className={styles.otherInfoContent}>
                  <div className={styles.area}>{countryRes.area}</div>
                  <div className={styles.areaUnit}>sq. km.</div>
                </div>
              </div>

              <div className={styles.otherInfoTile}>
                <div className={styles.otherInfoHeader}>Languages</div>
                <div className={styles.otherInfoContent}>
                  <div className={styles.languages}>
                    {Object.values(countryRes.languages).map((language) => (
                      <div className={styles.language}>{language}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.misc}>
              <div className={styles.translations}>
                <div className={styles.miscHeaders}>Translations</div>
                <ul className={styles.translationList} data-translation-list>
                  {Object.values(countryRes.translations).map((ctry) => (
                    <li>{ctry.common}</li>
                  ))}
                </ul>
              </div>

              <hr />

              <div className={styles.miscTwo}>
                <div className={styles.miscTwoOne}>
                  <div className={styles.altSpell}>
                    <div className={styles.miscHeaders}>
                      Alternate Spellings
                    </div>
                    <ul className={styles.altSpellList} data-altspell-list>
                      {countryRes.altSpellings.map((altSpell) => (
                        <li>{altSpell}</li>
                      ))}
                    </ul>
                  </div>

                  <hr />

                  <div className={styles.carMap}>
                    <div className={styles.car}>
                      <div className={styles.miscHeaders}>Car</div>
                      <div className={styles.capitalize}>
                        {countryRes.carSide}
                      </div>
                    </div>

                    <hr />

                    <div className={styles.map}>
                      <div className={styles.miscHeaders}>Map Link</div>
                      <div>
                        <Link
                          to={countryRes.googleMap}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Google Maps
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className={styles.postalCode}>
                  <div className={styles.miscHeaders}>Postal Code</div>
                  {countryRes.postalCode !== undefined ? (
                    <div className={styles.postalCodes}>
                      <span>Format: {countryRes.postalCode.format}</span>

                      <hr />

                      <span>Regex: {countryRes.postalCode.regex}</span>
                    </div>
                  ) : (
                    <div>No Data</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.moreInfo}>
            <div className={styles.moreInfoHeading}>More Info</div>
            <div className={styles.moreInfoContent}>
              <div className={styles.moreInfoItem}>
                <div className={styles.moreInfoTopics}>Independent</div>
                <div>{countryRes.independent ? "Yes" : "No"}</div>
              </div>

              <div className={styles.moreInfoItem}>
                <div className={styles.moreInfoTopics}>UN Member</div>
                <div>{countryRes.unMember ? "Yes" : "No"}</div>
              </div>

              <div className={styles.moreInfoItem}>
                <div className={styles.moreInfoTopics}>Land-Locked</div>
                <div>{countryRes.landlocked ? "Yes" : "No"}</div>
              </div>

              <div className={styles.moreInfoItem}>
                <div className={styles.moreInfoTopics}>Population</div>
                <div>{countryRes.population}</div>
              </div>

              <div className={styles.moreInfoItem}>
                <div className={styles.moreInfoTopics}>IDD Prefix</div>
                <ul className={styles.iddPrefixes}>
                  {countryRes.iddPrefix.suffixes.map((suffix) => (
                    <li>{countryRes.iddPrefix.root + suffix}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.moreInfoItem}>
                <div className={styles.moreInfoTopics}>Start of Week</div>
                <div className={styles.capitalize}>
                  {countryRes.startOfWeek}
                </div>
              </div>

              <div className={styles.moreInfoItem}>
                <div className={styles.moreInfoTopics}>TLD</div>
                <div>{countryRes.tld}</div>
              </div>
            </div>
          </div>
          {/* <div className={styles.loading}>
            <div className={styles.loader}></div>
          </div> */}
        </>
      ) : (
        <div className={styles.loading}>
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
}

export default Country;
