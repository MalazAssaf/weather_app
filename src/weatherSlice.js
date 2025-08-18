import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let cancelAxios = null;

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (location, thunkAPI) => {
    try {
      if (cancelAxios) cancelAxios.cancel("Canceled due to new request");
      cancelAxios = axios.CancelToken.source();
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=262aedaf6764863bb19d7c9d5a68be2a`,
        { cancelToken: cancelAxios.token }
      );
      const main = response.data.main;
      const weatherData = response.data.weather[0];
      return {
        number: Math.round(main.temp - 272.15),
        min: Math.round(main.temp_min - 272.15),
        max: Math.round(main.temp_max - 272.15),
        description: weatherData.description,
        cityOfUser: response.data.name,
        icon: `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`,
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        return thunkAPI.rejectWithValue("Request canceled");
      }
      return thunkAPI.rejectWithValue(
        error.message || "Error fetching weather"
      );
    }
  }
);

export const weatherSilce = createSlice({
  name: "weather",
  initialState: {
    weather: {},
    isLoading: true,
    location: {
      lat: null,
      lon: null,
    },
    error: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location.lat = action.payload.lat;
      state.location.lon = action.payload.lon;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setLocation } = weatherSilce.actions;

export default weatherSilce.reducer;
