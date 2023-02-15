import { useState } from 'react';
import { WeatherData } from '../../Interfaces/WeatherResponse';

import axios, { AxiosError } from 'axios';
import './App.styles.css';
import { Loading } from '../Loading/Loading.component';
import { WeatherCard } from '../WeatherCard/WeatherCard.component';

function App() {
  const [zipCode, setZipCode] = useState('');
  const [weatherData, setWeatherData] = useState<null | WeatherData>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  const getWeatherData = async () => {
    if (zipCode.length === 5 && !isNaN(Number(zipCode))) {
      setShowError(false);
      setIsLoading(true);
      try {
        const weatherResponse = await axios.get<WeatherData>(
          `http://127.0.0.1:8000/weather?zipcode=${zipCode}`
        );
        setWeatherData(weatherResponse.data);
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e.message);
        } else {
          setError('Unspecified Error');
        }
        setShowError(true);
      }
      setIsLoading(false);
    } else {
      setShowError(true);
      setError('ZipCode must be 5 digits');
    }
  };

  return (
    <div className='App'>
      <h1 className='title'>Weather Fetcher</h1>
      <input
        type='text'
        placeholder={'Enter zip code'}
        value={zipCode}
        onChange={(e) => {
          setZipCode(e.target.value);
        }}
      />
      <button onClick={getWeatherData}>Get Weather</button>
      {showError && <h1 className='error'>{error}</h1>}
      {isLoading ? <Loading /> : <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;
