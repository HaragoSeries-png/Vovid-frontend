import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../api/apicount";

const CountryPicker = (props) => {
  console.log("crp : ",props);
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
      >
        <option value="">Global</option>
        <option value="Thailand">TH</option>
        <option value="US">US</option>
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
