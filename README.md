# Weather App

A responsive weather application that provides real-time weather information based on the user’s location. Built with React and deployed online, it fetches current weather data from the OpenWeatherMap API.

## Features

- **Auto-detects User Location**: Automatically retrieves your geographical location using the browser's Geolocation API.
- **Real-time Weather Data**: Displays current temperature, weather description, minimum and maximum temperatures, and a weather icon.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Language Support**: Switch between Arabic and English for date, time, and weather descriptions.

## Technologies Used

- **Frontend**: React, Material-UI
- **Weather API**: OpenWeatherMap API
- **Date & Time**: Moment.js
- **Translation**: i18next.js
- **Deployment**: Netlify

## How It Works

1. The app requests permission to access the user’s location.
2. Once permission is granted, it fetches weather data for the current location and displays it in a clean, interactive interface.
3. A loading indicator is shown while the data is being retrieved.
4. Users can switch the language between Arabic and English at any time.

## Live Demo

Check out the app here: [Weather App by Malaz](https://weather-by-malaz-location.netlify.app/)

## License

This project is licensed under the MIT License.
