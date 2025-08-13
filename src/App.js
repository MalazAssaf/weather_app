import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import WeatherInfo from "./WeatherInfo";
import Location from "./Location";

const theme = createTheme({
  typography: { fontFamily: ["IBM"] },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <WeatherInfo />
        {/* <Location /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
