# AirMind AI — Backend Engine ⚡

> High-performance FastAPI REST API & MongoDB Data Service for Urban Air Quality Intelligence. Developed for the ET AI Hackathon 2026.

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Swagger UI](https://img.shields.io/badge/Swagger-Interactive_Docs-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](http://localhost:8000/docs)

---

## 📖 Backend Overview

The **AirMind AI Backend** serves as the central data engine and inference gateway for the AirMind AI platform. Built with **FastAPI** and **MongoDB Atlas**, it orchestrates the ingestion of live environmental data, manages historical data storage, loads pre-trained **Scikit-learn** machine learning models from the `ml/` module, and delivers real-time air quality metrics, multi-horizon forecasts, and health advisories to the React frontend dashboard.

---

## ⚙️ Responsibilities of Backend

The backend engine is engineered to handle five core operational responsibilities:

- 🛰️ **Live Environmental Ingestion**: Integrates with external OpenWeather APIs (Air Pollution, Current Weather, Geocoding) to collect live ambient pollutant concentrations (`PM2.5`, `PM10`, `NO2`, `SO2`, `CO`, `O3`, `NH3`) and meteorological parameters.
- 💾 **Asynchronous Spatial-Temporal Storage**: Persists historical air quality records and environmental snapshots in MongoDB Atlas using the asynchronous `Motor` driver.
- 🤖 **ML Model Inference & Serving**: Serves as the production runtime interface for trained machine learning models, executing real-time AQI estimation and multi-horizon trend forecasts (24-hour and 72-hour).
- 🏥 **Health Intelligence Engine**: Evaluates predicted AQI values and maps them into actionable, category-specific health recommendations for general citizens and vulnerable groups.
- 🔌 **REST API Delivery**: Exposes structured, type-safe RESTful API endpoints validated via Pydantic schemas for consumption by the React dashboard.

---

## 🏗️ Architecture Diagram

```text
┌─────────────────────────────────────────────────────────────┐
│                       OpenWeather APIs                      │
└──────────────────────────────┬──────────────────────────────┘
                               │ Live Weather & Pollutant Data
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      FastAPI Backend                        │
│ ┌───────────────┐   ┌────────────────┐   ┌────────────────┐ │
│ │  API Routes   │   │ Services Layer │   │  Repositories  │ │
│ └───────────────┘   └────────────────┘   └────────────────┘ │
└──────────┬───────────────────┬───────────────────┬──────────┘
           │                   │                   │
           ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  MongoDB Atlas   │ │   ML Predictor   │ │  Health Engine   │
│ (Historical Data)│ │  (Scikit-Learn)  │ │   (Advisories)   │
└──────────┬───────┘ └─────────┬────────┘ └────────┬─────────┘
           │                   │                   │
           └───────────────────┼───────────────────┘
                               │ Unified JSON Payload
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       React Frontend                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Backend Workflow

The data and prediction flow moves sequentially through the following pipeline:

```text
OpenWeather APIs
       ↓
    FastAPI
       ↓
    MongoDB
       ↓
   ML Models
       ↓
    Frontend
```

1. **OpenWeather APIs**: Live air quality, weather, and coordinate data are requested by the backend integration service.
2. **FastAPI**: Validates raw HTTP response payloads against Pydantic models, handles routing, and coordinates processing.
3. **MongoDB**: Stores structured environmental documents and retrieves historical data for trend analysis.
4. **ML Models**: Loads serialized regression models into memory to predict current AQI and 24h/72h forecasts with health advisories.
5. **Frontend**: Receives clean JSON payloads over REST endpoints for real-time visualization on the React dashboard.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **FastAPI** | Modern, high-performance web framework for building APIs with Python 3.10+ |
| **Language** | **Python 3.10+** | Core server development and machine learning execution environment |
| **Database** | **MongoDB Atlas** | Fully managed cloud NoSQL database for spatial-temporal AQI records |
| **Database Driver** | **Motor** | Non-blocking, asynchronous Python driver for MongoDB |
| **Validation** | **Pydantic** | Strict runtime data validation and serialization schemas |
| **HTTP Client** | **Requests** | Synchronous/Asynchronous HTTP requests for OpenWeather integrations |
| **ASGI Server** | **Uvicorn** | Lightning-fast ASGI web server implementation |

---

## 📂 Folder Structure

```text
backend/
├── app/
│   ├── api/              # FastAPI endpoint routers (aqi.py, prediction.py, environment.py)
│   ├── database/         # MongoDB Atlas client connection & lifespan handlers
│   ├── integrations/     # OpenWeather API integration services & geocoding
│   ├── models/           # Pydantic data schemas & document models
│   ├── repositories/     # Database CRUD access layer (Motor driver calls)
│   ├── services/         # Core business logic & ML predictor wrappers
│   ├── utils/            # Path resolution & environment setup helpers
│   └── main.py           # FastAPI main application entrypoint & middleware
├── requirements.txt      # Backend Python dependencies
└── README.md             # Backend documentation
```

---

## 🔌 API Overview

The backend provides clean, RESTful JSON APIs. Major endpoints are detailed below:

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| **POST** | `/aqi/collect/{city}` | Fetches live environmental data from OpenWeather and stores it in MongoDB |
| **GET** | `/aqi/latest` | Retrieves the most recent recorded AQI entry for a specific city |
| **GET** | `/aqi/history` | Fetches historical AQI data points for trend analysis and charting |
| **GET** | `/prediction/current` | Predicts current AQI and generates category-specific health advisories |
| **GET** | `/prediction/forecast` | Predicts 24-hour and 72-hour AQI forecasts for a given location |
| **GET** | `/prediction/all` | Returns complete bundle of current predictions, forecasts, and health advisories |

---

## 🗄️ MongoDB Collections Used

The application utilizes two dedicated document collections in MongoDB Atlas:

1. **`aqi`**: Stores parsed AQI records, city names, coordinates, calculated scores, and creation timestamps for quick historical queries.
2. **`environmental_data`**: Stores full raw snapshots fetched from OpenWeather, including individual pollutant concentrations (`PM2.5`, `PM10`, `NO2`, `SO2`, `CO`, `O3`, `NH3`) and weather attributes (temperature, humidity, wind speed).

---

## 🔑 Environment Variables

The backend requires the following environment variables. Ensure a `.env` file exists in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
DATABASE_NAME=airmind_ai

# External Weather & Air Quality API
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

---

## 🚀 Installation & Running

### 1. Prerequisites
- **Python 3.10** or higher
- **MongoDB Atlas** cluster (or local MongoDB instance)
- **OpenWeather API Key**

### 2. Set Up Virtual Environment

Navigate to the `backend/` folder:

```bash
cd backend
```

Create and activate a virtual environment:

- **Windows (PowerShell)**:
  ```powershell
  python -m venv venv
  .\venv\Scripts\activate
  ```

- **macOS / Linux (Bash)**:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the Server

Run the development server using **Uvicorn**:

```bash
uvicorn app.main:app --reload --port 8000
```

Alternatively, invoke via Python:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

The server will start at: `http://localhost:8000`

---

## 📑 Interactive Swagger Documentation

FastAPI automatically generates interactive OpenAPI documentation out of the box.

Once the backend server is running, access the interactive Swagger UI sandbox at:

👉 **[http://localhost:8000/docs](http://localhost:8000/docs)**

---

<div align="center">

**AirMind AI Backend • ET AI Hackathon 2026**

*FastAPI • Python 3.10+ • MongoDB Atlas • Motor • Scikit-Learn*

</div>
