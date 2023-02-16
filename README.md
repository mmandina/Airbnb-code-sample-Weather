### Mini-Project by Max Mandina

### Backend
FastAPI app with 2 endpoints:
- `GET /status`: Returns `{"status": "ok"}`
- `GET /weather`: Uses Python Requests package to send GET request to weather API. ZipCode is verified to be 5 numerical digits (a valid input) in frontend of application. 'GET /weather' then serves the front end an object containing the weather information. API key is stored in backend/config.py file which is in .gitignore.

Setup:
1. Create python virtual env with python 3.7 or greater
2. `pip install -r requirements.txt`
3. `make run` to run the server

### Frontend
The front end receives the data from the 'GET /weather' endpoint and renders it in a component 'WeatherCard'. While loading, a loading component 'Loading' is displayed. Tests are written using Jest and the react-testing-library.

Additional modules used:
- Axios: For ease of fetching data from backend
- React-Loader-Spinner: Loading spinner animation
- Cardinal-Direction: Used to convert wind direction from degrees to cardinal direction (0 degrees -> North)

Setup:
1. `npm install`
2. `npm start` to run the app
3. `npm test` will run jest tests