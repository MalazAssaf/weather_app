import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import WeatherInfo from "./WeatherInfo";

const theme = createTheme({
  typography: { fontFamily: ["IBM"] },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <WeatherInfo />
      </ThemeProvider>
    </div>
  );
}

export default App;
