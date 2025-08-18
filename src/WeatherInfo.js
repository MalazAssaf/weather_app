// REACT
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, setLocation } from "./weatherSlice";

// MATERIAL UI
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import CloudIcon from "@mui/icons-material/Cloud";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// EXTRENAL LIBRARIES
import moment from "moment/moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

// Css
import "./App.css";
export default function WeatherInfo() {
  const dispatch = useDispatch();
  const { weather, isLoading, error } = useSelector((state) => state.weather);
  // Language Changing States
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("ar");
  // Date & Time
  const [dateAndTime, setDateAndTime] = useState("");
  const pageDirection = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    i18n.changeLanguage("ar");
    moment.locale("ar");
  }, []);

  // useRef is a React hook that allows you to store a value that persists across renders
  // without causing a re-render when it changes. I use didFetch here to prevent React Strict Mode from
  // Sending or mount the Api request twice and I put it as a use Ref to keep its value
  // and preventing re-rendering since it causes mounting!
  const didFetch = useRef(false);
  // Set Location of The User
  useEffect(() => {
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm a"));
    if (didFetch.current) return; // already fetched
    didFetch.current = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        // Setting Location
        dispatch(setLocation(location));
        // Sending Api Request Using the Thunk Function fetchWeather
        dispatch(fetchWeather(location));
      });
    }
  }, []);

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

  return (
    <>
      {/* Loader */}
      {isLoading && (
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
        className="container"
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
              {t(weather.cityOfUser)}
            </Typography>
            {/* End City */}
            {/* Time */}
            <Typography style={{ margin: 0 }}>{dateAndTime}</Typography>
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
                  <Typography variant="h1">{weather.number}</Typography>
                  <img src={weather.icon} alt="weather state"></img>
                </Stack>
                {/* End Temp and Image */}
                {/* Description */}
                <Stack sx={{ alignItems: "flex-start" }}>
                  <Typography variant="h6">{t(weather.description)}</Typography>
                </Stack>
                {/* End Description */}
                {/* Min & Max */}
                <Stack direction={"row"} sx={{ alignItems: "flex-start" }}>
                  <Typography variant="h6">
                    {t("min")}: {weather.min}
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
                    {t("max")}: {weather.max}
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
