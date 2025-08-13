// REACT
import { useEffect, useState } from "react";

// MATERIAL UI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CloudIcon from "@mui/icons-material/Cloud";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";

// EXTRENAL LIBRARIES
import axios from "axios";
import moment from "moment/moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

// Css
import "./App.css";

// const cities = [
//   // Saudi Arabia
//   { name: "Riyadh", lat: 24.7136, lon: 46.6753 },
//   { name: "Jeddah", lat: 21.4858, lon: 39.1925 },
//   { name: "Dammam", lat: 26.4207, lon: 50.0888 },
//   { name: "Mecca", lat: 21.3891, lon: 39.8579 },
//   { name: "Medina", lat: 24.5247, lon: 39.5692 },

//   // Syria
//   { name: "Damascus", lat: 33.5138, lon: 36.2765 },
//   { name: "Aleppo", lat: 36.2021, lon: 37.1343 },
//   { name: "Homs", lat: 34.7324, lon: 36.7138 },
//   { name: "Latakia", lat: 35.5131, lon: 35.781 },
//   { name: "Tartus", lat: 34.8951, lon: 35.8866 },

//   // Egypt
//   { name: "Cairo", lat: 30.0444, lon: 31.2357 },

//   // Capitals
//   { name: "London", lat: 51.5072, lon: -0.1276 },
//   { name: "Paris", lat: 48.8566, lon: 2.3522 },
//   { name: "Washington", lat: 38.9072, lon: -77.0369 },
//   { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
//   { name: "Beijing", lat: 39.9042, lon: 116.4074 },

//   // Germany
//   { name: "Berlin", lat: 52.52, lon: 13.405 },
//   { name: "Munich", lat: 48.1351, lon: 11.582 },
//   { name: "Hamburg", lat: 53.5511, lon: 9.9937 },
//   { name: "Cologne", lat: 50.9375, lon: 6.9603 },
//   { name: "Frankfurt", lat: 50.1109, lon: 8.6821 },
//   { name: "Stuttgart", lat: 48.7758, lon: 9.1829 },
//   { name: "Dresden", lat: 51.0504, lon: 13.7373 },
//   { name: "Leipzig", lat: 51.3397, lon: 12.3731 },
//   { name: "Passau", lat: 48.5667, lon: 13.4667 },
//   { name: "Landau", lat: 48.5442, lon: 12.15 },
//   { name: "Regensburg", lat: 49.015, lon: 12.1016 },
// ];

let cancelAxios = null;

export default function WeatherInfo() {
  // City Selection State
  //   const [selectedCity, setselectedCity] = useState("Riyadh");
  //   const selectedCityObject = cities.find((city) => city.name === selectedCity);
  //   const selectedCityLat = selectedCityObject.lat;
  //   const selectedCityLon = selectedCityObject.lon;

  //   Using Auto Location Instead of Selecting Location Manually
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  // Language Changing States
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("ar");
  // Date & Time
  const [dateAndTime, setDateAndTime] = useState("");

  const [temp, setTemp] = useState({
    cityOfUser: "",
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });

  const pageDirection = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    i18n.changeLanguage("ar");
    moment.locale("ar");
  }, []);

  // Set Location of The User
  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm a"));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => setError(err.message),
        { enableHighAccuracy: false }
      );
    } else {
      setError("Geolocation is not supported by this browser!");
    }
  }, []);

  useEffect(() => {
    if (!location.lat || !location.lon) return; // wait until location is set
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=262aedaf6764863bb19d7c9d5a68be2a`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then((response) => {
        const axiosResponse = response.data.main;
        const tempResponse = Math.round(axiosResponse.temp - 272.15);
        const minResponse = Math.round(axiosResponse.temp_min - 272.15);
        const maxResponse = Math.round(axiosResponse.temp_max - 272.15);
        const descriptionResponse = response.data.weather[0].description;
        const cityResponse = response.data.name;
        const iconResponse = response.data.weather[0].icon;
        console.log(response);

        setTemp({
          cityOfUser: cityResponse,
          number: tempResponse,
          description: descriptionResponse,
          min: minResponse,
          max: maxResponse,
          icon: `https://openweathermap.org/img/wn/${iconResponse}@2x.png`,
        });
      })
      .catch((error) => console.log(error));

    return () => {
      cancelAxios();
    };
  }, [location]); // run whenever location changes

  //   Handle Functions
  function handleLanguageChangeClick() {
    if (locale === "ar") {
      setLocale("en");
      moment.locale("en");
      i18n.changeLanguage("en");
    } else {
      setLocale("ar");
      moment.locale("ar");
      i18n.changeLanguage("ar");
    }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm a"));
  }

  // Lists
  //   const cityList = cities.map((city) => {
  //     return (
  //       <MenuItem key={city.name} value={city.name}>
  //         {t(city.name)}{" "}
  //       </MenuItem>
  //     );
  //   });

  return (
    <>
      {/* Loader */}
      {!temp.number && !error && (
        <Backdrop sx={{ background: "rgba(0,0,0,0.9)", zIndex: 1 }} open={true}>
          <CircularProgress style={{ color: "#0048ca" }} />
        </Backdrop>
      )}
      {/* End Loader */}

      {/* // Error Message */}
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
      {/* End Error Message */}

      {/* Container */}
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          direction: pageDirection,
        }}
      >
        {/* Selecting City */}
        {/* <div
        style={{
          background: "#0a3f9e",
          width: "100%",
          margin: "20px",
          borderRadius: "15px",
          boxShadow: "0px 11px 11px rgba(0, 0, 0, 0.3)",
          padding: "15px",
        }}
      >
        <FormControl fullWidth variant="outlined">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity}
            onChange={(event) => {
              setselectedCity(event.target.value);
            }}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              fontWeight: "bold",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            {cityList}
          </Select>
        </FormControl>
      </div> */}
        {/* End Selecting City */}
        {/* Content */}
        <div
          style={{
            color: "white",
            width: "100%",
            background: "#0a3f9e",
            borderRadius: 15,
            boxShadow: "0px 11px 11px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* City and Time */}
          <Stack
            spacing={4}
            direction="row"
            sx={{ alignItems: "center", gap: 2, padding: "5px 25px" }}
            className="dateAndTime"
          >
            {/* City */}
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              {t(temp.cityOfUser)}
            </Typography>
            {/* End City */}
            {/* Time */}
            <Typography>{dateAndTime}</Typography>
            {/* End Time */}
          </Stack>
          {/* End City and Time */}

          <Divider color="white" sx={{ width: "95%", margin: "auto" }} />
          {/* Content */}
          <Grid container spacing={2} sx={{ justifyContent: "space-around" }}>
            {/* Right side -> Temp & Description */}
            <Grid xs={12} xl={8}>
              <Stack sx={{ padding: "5px 25px" }}>
                {/* Temp and Image */}
                <Stack
                  direction={"row"}
                  sx={{ alignItems: "baseline", gap: 2 }}
                >
                  <Typography variant="h1">{temp.number}</Typography>
                  <img src={temp.icon} alt="weather state"></img>
                </Stack>
                {/* End Temp and Image */}
                {/* Description */}
                <Stack sx={{ alignItems: "flex-start" }}>
                  <Typography variant="h6">{t(temp.description)}</Typography>
                </Stack>
                {/* End Description */}
                {/* Min & Max */}
                <Stack direction={"row"} sx={{ alignItems: "flex-start" }}>
                  <Typography variant="h6">
                    {t("min")}: {temp.min}
                  </Typography>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{
                      background: "white",
                      margin: " auto 20px",
                      height: "20px",
                    }}
                  />
                  <Typography variant="h6">
                    {t("max")}: {temp.max}
                  </Typography>
                </Stack>
                {/* End Min & Max */}
              </Stack>
            </Grid>
            {/* End Right side -> Temp & Description */}

            {/* Left Side -> Image of Wheather */}
            <Grid xs={12} xl={8}>
              <CloudIcon sx={{ fontSize: "200px" }}></CloudIcon>
            </Grid>
            {/* End Left Side -> Image of Wheather */}
          </Grid>
        </div>
        {/* End Content */}

        {/* Tranlation Button */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            sx={{
              padding: 0,
              color: "white",
              marginTop: "20px",
            }}
            onClick={handleLanguageChangeClick}
          >
            {t(locale === "en" ? "arabic" : "إنجليزي")}
          </Button>
        </div>
        {/* End Tranlation Button */}
      </Container>
      {/* // End Container */}
    </>
  );
}
