# Database Schema

Database

airmind_ai

---

Collection

aqi_data

Fields

_id

city

state

country

latitude

longitude

aqi

pm25

pm10

no2

so2

co

o3

temperature

humidity

wind_speed

timestamp

---------------------------------------------------

Collection

forecast

Fields

_id

city

predicted_aqi

prediction_time

model_name

created_at

---------------------------------------------------

Collection

users

Fields

_id

name

email

created_at

---------------------------------------------------

Collection

health_advisories

Fields

_id

aqi_range

risk_level

advisory

language

---------------------------------------------------

Relationships

AQI Data
        |
        |
        +------> Forecast

AQI Data
        |
        |
        +------> Health Advisory

Users
        |
        |
        +------> Personalized Alerts