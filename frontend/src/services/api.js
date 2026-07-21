const BASE_URL = "http://127.0.0.1:8000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Request failed");
  }

  return response.json();
}

// AQI APIs
export const getLatestAQI = (city) => request(`/aqi/latest?city=${city}`);

export const getAQIHistory = (city, limit = 10) =>
  request(
    `/aqi/history?city=${encodeURIComponent(city)}&limit=${limit}`
  );

export const collectEnvironmentalData = (city) =>
  request(`/aqi/collect?city=${encodeURIComponent(city)}`, {
    method: "POST",
  });

// Prediction APIs
export const getPrediction = (city) =>
  request(`/prediction/all?city=${encodeURIComponent(city)}`);

export const getCurrentPrediction = (city) =>
  request(`/prediction/current?city=${encodeURIComponent(city)}`);

export const getForecastPrediction = (city) =>
  request(`/prediction/forecast?city=${encodeURIComponent(city)}`);

export const getLatestEnvironment = (city) =>
  request(`/environment/latest?city=${encodeURIComponent(city)}`);
