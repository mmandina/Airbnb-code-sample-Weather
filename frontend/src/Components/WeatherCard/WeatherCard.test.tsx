import { render, screen } from '@testing-library/react';
import { WeatherCard } from './WeatherCard.component';
import { WeatherData } from '../../Interfaces/WeatherResponse';

describe('WeatherCard', () => {
  it('renders without crashing', () => {
    render(<WeatherCard weatherData={null} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders the correct elements when weatherData is not null', () => {
    const mockWeatherData: WeatherData = {
      coord: {
        lon: -73.9563,
        lat: 40.7095,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
      base: 'stations',
      main: {
        temp: 52.57,
        feels_like: 49.32,
        temp_min: 48.9,
        temp_max: 54.32,
        pressure: 1024,
        humidity: 38,
      },
      visibility: 10000,
      wind: {
        speed: 13.8,
        deg: 260,
      },
      clouds: {
        all: 0,
      },
      dt: 1675892631,
      sys: {
        type: 2,
        id: 2039034,
        country: 'US',
        sunrise: 1675857527,
        sunset: 1675894877,
      },
      timezone: -18000,
      id: 0,
      name: 'Brooklyn',
      cod: 200,
    };

    render(<WeatherCard weatherData={mockWeatherData} />);
    expect(screen.getByText(/Brooklyn/)).toBeInTheDocument();
    expect(screen.getByAltText(/weather icon/)).toBeInTheDocument();
    expect(screen.getByText(/Current Weather:/)).toBeInTheDocument();
    expect(
      screen.getByText(/Clear sky with a temperature of 53°F/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Wind is 14mph from the WbS/)).toBeInTheDocument();
    expect(screen.getByText(/Today's Temperature Range:/)).toBeInTheDocument();
    expect(screen.getByText(/High of 54°F/)).toBeInTheDocument();
    expect(screen.getByText(/Low of 49°F/)).toBeInTheDocument();
  });

  it('does not render elements when weatherData is null', () => {
    render(<WeatherCard weatherData={null} />);
    expect(screen.queryByText(/Los Angeles/)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/weather icon/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Current Weather:/)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/clear sky with a temperature of 72°F/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Wind is 10mph from the East/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Today's Temperature Range:/)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/High of 75°F/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Low of 68°F/)).not.toBeInTheDocument();
  });
});
