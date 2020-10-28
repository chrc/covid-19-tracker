import React, { useState, useEffect } from 'react';

import styles from './App.module.css';
import coronaImage from './images/covid-19.png';

import { Cards, Chart, CountryPicker } from './components';

import { fetchData } from './api';

const App = () => {

  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  const handleCountryChange = async (event) => {
    const { value: selectedCountry } = event.target;

    setData(await fetchData(selectedCountry));
    setCountry(selectedCountry);
  };

  useEffect(() => {
    const load = async () => {
      setData(await fetchData());
    };

    load();
  }, []);


  return (
    <div className={styles.container}>
      <img src={coronaImage} className={styles.image} alt="COVID-19" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
};

export default App;
