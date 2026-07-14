from fastapi import FastAPI

app = FastAPI(title="AirMind AI")

@app.get("/")
def root():
    return {"message": "AirMind AI Backend Running"}