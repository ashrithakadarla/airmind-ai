# API Contract

Base URL

http://localhost:8000

---

## GET /

Description

Check server status.

Response

{
    "message": "AirMind AI Backend Running"
}

---

## GET /aqi/latest

Description

Returns latest AQI.

Response

{
    "city":"Hyderabad",
    "aqi":128,
    "pm25":52,
    "pm10":81,
    "temperature":31,
    "humidity":68,
    "timestamp":"2026-07-14T10:30:00"
}

---

## GET /aqi/history

Description

Returns historical AQI.

Response

[
    {
        "city":"Hyderabad",
        "aqi":124,
        "timestamp":"2026-07-13"
    },
    {
        "city":"Hyderabad",
        "aqi":128,
        "timestamp":"2026-07-14"
    }
]

---

## GET /forecast

Description

Returns predicted AQI.

Response

{
    "city":"Hyderabad",
    "predicted_aqi":142,
    "prediction_time":"24 Hours"
}

---

## GET /health

Description

Returns health recommendation.

Response

{
    "risk":"Moderate",
    "recommendation":"People with asthma should avoid outdoor exercise."
}

---

## GET /hotspots

Description

Returns pollution hotspot locations.

Response

[
    {
        "latitude":17.3850,
        "longitude":78.4867,
        "aqi":190
    }
]

---

## POST /user

Description

Create user.

Request

{
    "name":"Ashritha",
    "email":"example@email.com"
}

Response

{
    "message":"User created successfully."
}