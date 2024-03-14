import axios from "axios";
import { GEO_API_KEY, FORECAST_API_KEY, GEO_BASE_URL, FORECAST_URL } from "../lib/config";

export const getCordinateByPlaceName = async (location) => {
  return await axios.get(GEO_BASE_URL + `/geo/1.0/direct?q=${location}&limit=5&appid=${GEO_API_KEY}`);
}

export const getWeatherByCoOrds = async ([lat, lon]) => {
  return await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${FORECAST_API_KEY}`);
}