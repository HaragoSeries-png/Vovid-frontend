import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../api/apicount";
import "../css/countryPicker.css"
const CountryPicker = (props) => {
  // const [fetchedCountries, setFetchedCountries] = useState([]);
  //effect will only activate if the values in the list change
  //by adding setFechedCountries as parameterts thats enables to pick different countries
  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     setFetchedCountries(await fetchCountries());
  //   };
  //   fetchAPI();
  // }, [setFetchedCountries]);

  return (
    <FormControl >
      <NativeSelect
        defaultValue=""
        onChange={e => props.handleCountryChange(e.target.value)}
        className="mainBlock"
      >
        <option className="subBlock" value="">Global</option>
        <option className="subBlock" value="Thailand">TH</option>
        <option className="subBlock" value="US">US</option>
        {/* {fetchedCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))} */}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
