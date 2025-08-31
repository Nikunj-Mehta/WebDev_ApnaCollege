import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "4586a2d07a7802dcbf1ee1b998a5c6cf";

  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  let getWeatherInfo = async () => {
    try{
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }


  let handleChange = (event) => {
    setCity(event.target.value);
  }

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setCity(""); // This will be done after the function is over so the city var still exists untill the line below is executed
      let newInfo = await getWeatherInfo(); // This is why the city var still has the value when used in this function above.
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };

  return(
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField 
          id="city" 
          label="City Name" 
          variant="outlined" 
          required 
          value={city}
          onChange={handleChange} 
        />
        <br></br>
        <br></br> 
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{color: "red"}}>No such place exists</p>}
      </form>
    </div>
  )
}