import { URL } from "react-native-url-polyfill";

const getCoordinates = async (place) => {
  const geoCodeUrl = new URL("https://geocode.maps.co/search");

  geoCodeUrl.searchParams.append("q", place);
  geoCodeUrl.searchParams.append(
    "api_key",
    process.env.EXPO_PUBLIC_GEOCODING_API_KEY
  );

  const response = await fetch(geoCodeUrl);
  const data = await response.json();
  const result = data[0]; // Assuming the first result is the correct one
  const { lat: latitude, lon: longitude } = result; // Get the latitude and longitude from the result

  // Convert the results to a number
  return {
    longitude: parseFloat(longitude),
    latitude: parseFloat(latitude),
  };
};

export default getCoordinates;
