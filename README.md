# Weather App

A responsive weather application that provides real-time weather information based on the user’s location. Built with React and Redux, it fetches current weather data from the OpenWeatherMap API and manages API requests and state efficiently.

## Features

- **Auto-detects User Location**: Automatically retrieves your geographical location using the browser's Geolocation API.  
- **Real-time Weather Data**: Displays current temperature, weather description, minimum and maximum temperatures, and a weather icon.  
- **State Management with Redux**: Manages weather data, loading state, error messages, and location through Redux.  
- **Responsive Design**: Optimized for desktop and mobile devices.  
- **Language Support**: Switch between Arabic and English for date, time, and weather descriptions.

## Technologies Used

- **Frontend**: React, Material-UI  
- **State Management**: Redux Toolkit  
- **Weather API**: OpenWeatherMap API  
- **Date & Time**: Moment.js  
- **Translation**: i18next.js  
- **Deployment**: Netlify  

## How It Works

1. The app requests permission to access the user’s location.  
2. Once permission is granted, it dispatches a Redux action to fetch weather data for the current location.  
3. Redux manages the loading state, error state, and stores the retrieved weather information.  
4. A loading indicator is displayed while the data is being fetched.  
5. Users can switch the language between Arabic and English at any time.

## Live Demo

Check out the app here: [Weather App by Malaz](https://weather-by-malaz-location.netlify.app/)

# Weather App

A responsive weather application that provides real-time weather information based on the user’s location. Built with React and Redux, it fetches current weather data from the OpenWeatherMap API and manages API requests and state efficiently.

## Features

- **Auto-detects User Location**: Automatically retrieves your geographical location using the browser's Geolocation API.  
- **Real-time Weather Data**: Displays current temperature, weather description, minimum and maximum temperatures, and a weather icon.  
- **State Management with Redux**: Manages weather data, loading state, error messages, and location through Redux.  
- **Responsive Design**: Optimized for desktop and mobile devices.  
- **Language Support**: Switch between Arabic and English for date, time, and weather descriptions.

## Technologies Used

- **Frontend**: React, Material-UI  
- **State Management**: Redux Toolkit  
- **Weather API**: OpenWeatherMap API  
- **Date & Time**: Moment.js  
- **Translation**: i18next.js  
- **Deployment**: Netlify  

## How It Works

1. The app requests permission to access the user’s location.  
2. Once permission is granted, it dispatches a Redux action to fetch weather data for the current location.  
3. Redux manages the loading state, error state, and stores the retrieved weather information.  
4. A loading indicator is displayed while the data is being fetched.  
5. Users can switch the language between Arabic and English at any time.

## Live Demo

Check out the app here: [Weather App by Malaz](https://weather-by-malaz-location.netlify.app/)

## License

This project is licensed under the MIT License.
