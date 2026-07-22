import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();

export function CityProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("selectedCity") || "Hyderabad";
  });
  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);
  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}