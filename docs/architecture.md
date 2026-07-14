# AirMind AI - System Architecture

## Overview

AirMind AI is an AI-powered Urban Air Quality Intelligence platform that collects live air quality and weather data, predicts future AQI using Machine Learning, visualizes pollution hotspots on an interactive map, and provides health recommendations for citizens.

---

## Architecture Diagram

                    +-----------------------+
                    |     AQI APIs          |
                    | (OpenAQ / CPCB)       |
                    +-----------+-----------+
                                |
                    +-----------v-----------+
                    |    Weather API        |
                    |    OpenWeatherMap     |
                    +-----------+-----------+
                                |
                    +-----------v-----------+
                    |  Data Collection      |
                    |  (Python Services)    |
                    +-----------+-----------+
                                |
                    +-----------v-----------+
                    |     MongoDB Atlas     |
                    +-----------+-----------+
                                |
            +-------------------+-------------------+
            |                                       |
+-----------v-----------+               +-----------v-----------+
| Machine Learning      |               | FastAPI Backend       |
| AQI Prediction Model  |               | REST APIs             |
+-----------+-----------+               +-----------+-----------+
            |                                       |
            +-------------------+-------------------+
                                |
                    +-----------v-----------+
                    | React Dashboard       |
                    | Maps + Charts         |
                    +-----------+-----------+
                                |
                    +-----------v-----------+
                    | End Users             |
                    | Admin / Citizens      |
                    +-----------------------+

---

## Modules

### 1. Data Collection

Responsible:
Member 1

Functions

- Fetch AQI data
- Fetch Weather Data
- Preprocess data
- Store in MongoDB

---

### 2. Backend

Responsible:
Member 2

Functions

- REST APIs
- Database connection
- User management
- API integration

---

### 3. Machine Learning

Responsible:
Member 3

Functions

- Train prediction model
- Predict AQI
- Health recommendation engine

---

### 4. Frontend

Responsible:
Member 4

Functions

- Interactive maps
- AQI dashboard
- Forecast visualization
- Charts
- User Interface

---

## Technology Stack

Frontend
- React
- Leaflet
- Chart.js

Backend
- FastAPI

Database
- MongoDB Atlas

Machine Learning
- Scikit-learn
- Pandas
- NumPy

Deployment
- Render
- Vercel

Version Control
- Git
- GitHub