import React from 'react';
import './WeatherCard.styles.css';
import { WeatherData } from '../../Interfaces/WeatherResponse';
import { cardinalFromDegree } from 'cardinal-direction';

interface WeatherCardProps {
  weatherData: WeatherData | null;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;
  const weatherDescription = weatherData?.weather?.[0].description
    ? `${weatherData.weather[0].description
        .charAt(0)
        .toUpperCase()}${weatherData.weather[0].description.slice(1)}`
    : '';

  return (
    <div role='region' aria-labelledby='weather card region'>
      {weatherData && (
        <div className='card'>
          <h1>{weatherData.name}</h1>
          <img src={weatherIconUrl} alt='weather icon' />
          <h2>Current Weather:</h2>
          {weatherDescription && weatherData.main.temp && (
            <h3>
              {weatherDescription} with a temperature of{' '}
              {Math.round(weatherData.main.temp)}°F
            </h3>
          )}
          {weatherData.wind && (
            <div className='wind'>
              <div>
                Wind is {Math.round(weatherData.wind.speed)}mph from the
                {' ' + cardinalFromDegree(weatherData.wind.deg)}
              </div>
            </div>
          )}
          {weatherData.main.temp_max && weatherData?.main.temp_min && (
            <div className='temps'>
              <h3>Today's Temperature Range:</h3>
              <div>High of {Math.round(weatherData.main.temp_max)}°F</div>
              <div>Low of {Math.round(weatherData.main.temp_min)}°F</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
