import pandas as pd

# Load historical dataset
df = pd.read_csv("datasets/improved_cleaned_city_day.csv")

# Sort by city and date
df["Date"] = pd.to_datetime(df["Date"])
df = df.sort_values(["City", "Date"])

# Create future AQI targets
# Since the dataset is daily:
# shift(-1) = next day (~24 hours)
# shift(-3) = 3 days later (~72 hours)

df["Future_AQI_24"] = df.groupby("City")["AQI"].shift(-1)
df["Future_AQI_72"] = df.groupby("City")["AQI"].shift(-3)

# Remove rows where future values don't exist
df = df.dropna(subset=["Future_AQI_24", "Future_AQI_72"])

# Save
df.to_csv("datasets/forecast_dataset_v2.csv", index=False)

print("Dataset created successfully!")
print(df.head())
print("\nColumns:")
print(df.columns.tolist())