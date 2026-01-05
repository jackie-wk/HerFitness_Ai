# tests/test_api.py
from pdb import run
import pytest
from fastapi.testclient import TestClient
from backend.app import app

# Create the TestClient once for all tests
client = TestClient(app)

def test_health_endpoint():
    """Test the /health endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert data["status"] == "ok"
    print("health ->", data)

def test_generate_plan_endpoint():
    """Test the /generate_plan endpoint"""
    payload = {
        "age": 25,
        "height_cm": 165,
        "weight_kg": 70,
        "goal": "fat loss",
        "workout_days": 4
    }
    response = client.post("/generate_plan", json=payload)
    assert response.status_code == 200
    data = response.json()
    
    # Basic checks on returned data
    assert isinstance(data, dict)
    assert "plan" in data or "message" in data  
    print("generate_plan ->", data)

if __name__ == "__main__":
    print("Running tests...")
    test_health_endpoint()
    test_generate_plan_endpoint()
    

