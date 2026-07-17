import pandas as pd
import joblib

from sklearn.model_selection import train_test_split

from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor

from sklearn.metrics import mean_absolute_error
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score


# Load dataset
df = pd.read_csv("datasets/ml_ready_dataset.csv")


# Features and Target
X = df.drop("AQI", axis=1)
y = df["AQI"]


# Split dataset into training and testing
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


print("Training Data Shape:", X_train.shape)
print("Testing Data Shape:", X_test.shape)


# Machine Learning Models
models = {
    "Linear Regression": LinearRegression(),

    "Decision Tree": DecisionTreeRegressor(
        random_state=42
    ),

    "Random Forest": RandomForestRegressor(
        n_estimators=100,
        random_state=42
    )
}


results = {}


# Train and Evaluate Models
for name, model in models.items():

    print("\n" + "=" * 50)
    print(name)
    print("=" * 50)

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    mae = mean_absolute_error(y_test, predictions)

    mse = mean_squared_error(y_test, predictions)

    rmse = mse ** 0.5

    r2 = r2_score(y_test, predictions)


    results[name] = r2


    print(f"MAE  : {mae:.2f}")
    print(f"RMSE : {rmse:.2f}")
    print(f"R²   : {r2:.4f}")



# Find Best Model
best_model = max(results, key=results.get)


print("\n" + "=" * 50)
print("🏆 BEST MODEL")
print("=" * 50)

print(best_model)

print(f"R² Score: {results[best_model]:.4f}")



# Get trained best model
best_trained_model = models[best_model]


# Save model
joblib.dump(
    best_trained_model,
    "models/best_aqi_model.pkl"
)


# Save feature names
joblib.dump(
    X.columns.tolist(),
    "models/feature_names.pkl"
)


print("\n✅ Best model saved successfully!")