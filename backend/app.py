from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional
from pathlib import Path

app = FastAPI(title="HerFitness API")

# Serve static files
static_dir = Path(__file__).parent.parent / "static"
if static_dir.exists():
    app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")


class UserProfile(BaseModel):
    age: int
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    goal: Optional[str] = "general wellness"
    workout_days: Optional[int] = 3
    last_period_days_ago: Optional[int] = None
    cycle_length: Optional[int] = 28


@app.get("/")
def index():
    return {"message": "HerFitness API running. Visit http://localhost:8000/static/index.html"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/generate_plan")
def generate_plan(profile: UserProfile):
    # Import inside function to avoid import errors on startup
    try:
        from .llm_service import generate_wellness_plan
        profile_dict = profile.model_dump()
        result = generate_wellness_plan(profile_dict)
        return {"plan": result}
    except ImportError as e:
        return {
            "error": f"Gemini package not installed: {str(e)}",
            "plan": None
        }
    except Exception as e:
        return {
            "error": str(e),
            "plan": None
        }
