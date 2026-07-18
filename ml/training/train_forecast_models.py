import os
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Load dataset
df = pd.read_csv("datasets/forecast_dataset_v2.csv")

# Features
X = df.drop(
    ["Future_AQI_24", "Future_AQI_72", "Date", "AQI_Bucket"],
    axis=1
)

# One-hot encode City
X = pd.get_dummies(X, columns=["City"], dtype=int)

# Save feature names
os.makedirs("models", exist_ok=True)
joblib.dump(X.columns.tolist(), "models/forecast_features.pkl")

targets = {
    "24": df["Future_AQI_24"],
    "72": df["Future_AQI_72"]
}

for horizon, y in targets.items():

    print(f"\nTraining {horizon}-Hour Forecast Model")

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    model = RandomForestRegressor(
        n_estimators=200,
        max_depth=20,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42
    )

    model.fit(X_train, y_train)

    pred = model.predict(X_test)

    print("MAE :", round(mean_absolute_error(y_test, pred), 2))
    print("R²  :", round(r2_score(y_test, pred), 4))

    joblib.dump(model, f"models/forecast_{horizon}_model.pkl")

print("\nBoth forecast models saved successfully!")