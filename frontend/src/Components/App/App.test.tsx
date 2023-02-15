import { render, screen, fireEvent } from '@testing-library/react';
import App from './App.component';
import axios from 'axios';
jest.mock('axios');

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
    const zipCodeInput = screen.getByPlaceholderText(/enter zip code/i);
    expect(zipCodeInput).toBeInTheDocument();
  });

  it('renders the correct elements', () => {
    render(<App />);
    const zipCodeInput = screen.getByPlaceholderText(/enter zip code/i);
    const getWeatherButton = screen.getByText(/get weather/i);
    expect(zipCodeInput).toBeInTheDocument();
    expect(getWeatherButton).toBeInTheDocument();
  });

  it('updates zip code on input change', () => {
    render(<App />);
    const zipCodeInput = screen.getByPlaceholderText(
      /enter zip code/i
    ) as HTMLInputElement;
    fireEvent.change(zipCodeInput, { target: { value: '11211' } });
    expect(zipCodeInput.value).toBe('11211');
  });

  it('displays error message when zip code is not 5 digits', () => {
    render(<App />);
    const getWeatherButton = screen.getByText(/get weather/i);
    fireEvent.click(getWeatherButton);
    const errorMessage = screen.getByText(/zipcode must be 5 digits/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays error message when axios call fails', async () => {
    const zipCode = '11211';
    const errorMessage = 'Error';
    (axios.get as jest.Mock).mockRejectedValue({
      message: errorMessage,
    });
    render(<App />);
    const zipCodeInput = screen.getByPlaceholderText('Enter zip code');
    const getWeatherButton = screen.getByText('Get Weather');

    fireEvent.change(zipCodeInput, { target: { value: zipCode } });
    fireEvent.click(getWeatherButton);

    const error = await screen.findByText(/error/i);

    expect(error).toBeInTheDocument();
  });

  it('renders loading component when zip code is 5 digits and axios call is initiated', async () => {
    render(<App />);
    const zipCodeInput = screen.getByPlaceholderText(/enter zip code/i);
    fireEvent.change(zipCodeInput, { target: { value: '11211' } });
    const getWeatherButton = screen.getByText(/get weather/i);
    fireEvent.click(getWeatherButton);
    await screen.findByText(/loading.../i);
  });

  it('renders the WeatherCard component when axios call succeeds', async () => {
    const zipCode = '11211';
    const weatherData = {
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
    (axios.get as jest.Mock).mockResolvedValue({ data: weatherData });

    render(<App />);
    const zipCodeInput = screen.getByPlaceholderText(/Enter zip code/i);
    const getWeatherButton = screen.getByText(/Get Weather/i);

    fireEvent.change(zipCodeInput, { target: { value: zipCode } });
    fireEvent.click(getWeatherButton);

    const weatherCard = await screen.findByText(/Current Weather:/i);
    expect(weatherCard).toBeInTheDocument();
  });
});
