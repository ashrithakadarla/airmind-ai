# AirMind AI — Machine Learning Engine 🧠🤖

> Predictive modeling, multi-horizon forecasting, and health risk intelligence module for AirMind AI. Developed for the ET AI Hackathon 2026.

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4+-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)
[![Pandas](https://img.shields.io/badge/Pandas-2.0+-150458?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org)
[![NumPy](https://img.shields.io/badge/NumPy-1.26+-013243?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org)

---

## 🧠 Machine Learning Overview

The **AirMind AI ML Module** is the core predictive intelligence engine responsible for estimating current Air Quality Index (AQI) scores, projecting short-term (24-hour) and extended (72-hour) pollution trend forecasts, and translating numerical predictions into actionable public health recommendations.

It handles data preprocessing, feature engineering, model training, evaluation, and production model serving via `predictor.py` for integration with the FastAPI backend.

---

## 🌟 Features

- 🧹 **Data Preprocessing**: Cleans raw environmental inputs, aligns timestamps, and handles missing or zero values.
- ⚙️ **Feature Engineering**: Constructs feature matrices using ambient pollutant levels (`PM2.5`, `PM10`, `NO2`, `SO2`, `CO`, `O3`) and temporal attributes.
- 🏋️ **Model Training**: Fits regression estimators to model complex spatial and temporal pollutant dynamics.
- 📊 **Model Evaluation**: Evaluates regression performance using standard metrics (MAE, RMSE, $R^2$ score).
- 🎯 **Current AQI Estimation**: Real-time evaluation of current ambient air quality index.
- 🔮 **24-Hour Forecast**: Predicts short-term AQI trends 24 hours into the future.
- 🔮 **72-Hour Forecast**: Predicts extended AQI trends 72 hours into the future.
- 🏥 **Health Recommendation Generation**: Auto-maps predicted AQI categories to tailored health advisories.

---

## 📂 Folder Structure

```text
ml/
├── analysis/         # Model evaluation scripts, metrics logging, and performance analysis
├── datasets/         # Storage directory for training datasets (.gitkeep only)
├── models/           # Storage directory for serialized model files (.gitkeep only)
├── notebooks/        # Jupyter notebooks for data exploration and experimentation (.gitkeep only)
├── training/         # Model training, validation, and hyperparameter tuning scripts
├── predict.py        # Standalone CLI prediction script for manual testing
├── predictor.py      # Production inference module loaded by the FastAPI backend
├── requirements.txt  # Machine learning dependencies
└── README.md         # ML module documentation
```

### Detailed Directory Descriptions

- 📁 **`datasets/`**: Directory designated for local training datasets. **Not included in GitHub** (contains `.gitkeep` only). Users must place their own CSV/JSON datasets here before training.
- 📁 **`models/`**: Storage folder for fitted, serialized model files (`.pkl`). **Not included in GitHub** (contains `.gitkeep` only). Users must place trained model files here for inference.
- 📁 **`notebooks/`**: Interactive Jupyter notebooks used for exploratory data analysis (EDA), feature correlation studies, and model prototyping.
- 📁 **`training/`**: Production Python scripts for training regression models, validating features, and saving model artifacts.
- 📄 **`predict.py`**: A standalone command-line script to test prediction pipelines locally.
- 📄 **`predictor.py`**: The production inference module that loads model artifacts into memory and serves predictions to the FastAPI backend.

---

## 🔄 Machine Learning Workflow

```text
Collect Data
     ↓
 Clean Data
     ↓
Feature Engineering
     ↓
 Model Training
     ↓
Model Evaluation
     ↓
Save Trained Model
     ↓
 Prediction
     ↓
Health Recommendation
```

---

## 🛠️ Technology Stack

| Library / Tool | Category | Purpose |
| :--- | :--- | :--- |
| **Python 3.10+** | Language | Core runtime environment for data science and machine learning |
| **Pandas** | Data Processing | Dataframe manipulation, cleaning, and feature alignment |
| **NumPy** | Numerical Computing | Matrix computations and array manipulations |
| **Scikit-learn** | Machine Learning | Regression algorithms, feature scaling, and evaluation metrics |
| **Joblib** | Serialization | Efficient serialization and loading of trained `.pkl` models |

---

## ⚙️ Model Pipeline

### 1. Training Phase
1. **Load Dataset**: Ingest raw historical air quality and weather datasets from `datasets/`.
2. **Clean Data**: Fill missing feature attributes using domain-appropriate defaults and scale input vectors.
3. **Train Regression Model**: Fit regression algorithms (e.g., Random Forest / Gradient Boosting) on target AQI features.
4. **Evaluate Model**: Validate predictive accuracy using MAE, RMSE, and $R^2$ metrics.
5. **Save Model**: Serialize fitted model estimators and feature name mappings as `.pkl` files into `models/`.

### 2. Inference Phase
1. **Load Trained Model**: Deserializes trained model artifacts from `models/` into memory at server startup.
2. **Accept Environmental Input**: Receives live pollutant and coordinate data from backend API calls.
3. **Generate AQI Score**: Computes the estimated current AQI.
4. **Generate Forecasts**: Predicts short-term (24h) and extended (72h) AQI trajectories.
5. **Return Predictions**: Returns structured JSON payload containing AQI scores, category, and health recommendations to backend.

---

## 🚀 Running the ML Module

### 1. Install Dependencies

Navigate to the `ml/` directory and install Python dependencies:

```bash
cd ml
pip install -r requirements.txt
```

### 2. Setup Data & Models

Before running training or prediction:

1. Place your training dataset files inside the `datasets/` folder.
2. Train models using scripts in `training/` **OR** place pre-trained `.pkl` model files inside the `models/` folder.

### 3. Run Standalone Prediction

To test predictions via CLI:

```bash
python predict.py
```

---

## ⚠️ Important Notes

> [!WARNING]
> **Datasets and Trained Models Excluded**: The raw training datasets and serialized model files (`.pkl`) are intentionally excluded from this GitHub repository to keep the repository lightweight and version-control friendly.

Before executing the ML training or prediction pipeline, users must provide:
- **Training datasets** inside the `ml/datasets/` directory.
- **Serialized model files (`.pkl`)** inside the `ml/models/` directory.

---

## 🔮 Future Improvements

- 🧠 **Deep Learning Models**: Implement neural network architectures for complex non-linear spatial interactions.
- 📈 **LSTM Forecasting**: Sequence-to-sequence Long Short-Term Memory (LSTM) networks for continuous time-series forecasting.
- ⚡ **Gradient Boosting Frameworks**: Integrate **XGBoost** and **LightGBM** for improved regression accuracy and speed.
- 🎛️ **Automated Hyperparameter Optimization**: Automated hyperparameter tuning using Optuna.
- 🔄 **Automated Retraining Pipeline**: Scheduled retraining triggers when new ambient dataset snapshots are ingested.
- 🛠️ **MLOps Pipeline**: Integrate MLflow / Weights & Biases for experiment tracking, model registry, and drift detection.

---

<div align="center">

**AirMind AI Machine Learning Module • ET AI Hackathon 2026**

*Python • Scikit-Learn • Pandas • NumPy • Joblib*

</div>
