# ...existing code...
import os
from dotenv import load_dotenv
import tempfile
import subprocess
import shutil
import sys
import re
from pathlib import Path

load_dotenv()

# Try both old and new google genai packages if present
try:
    import google.genai as genai_new
except Exception:
    genai_new = None

try:
    import google.generativeai as genai_legacy
except Exception:
    genai_legacy = None

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")


def _call_genai(prompt: str) -> str | None:
    # Try new google.genai patterns
    if genai_new:
        try:
            # some versions expose a Client or GenerativeModel class
            if hasattr(genai_new, "Client"):
                client = genai_new.Client(api_key=api_key)
                if hasattr(client, "generate_text"):
                    resp = client.generate_text(model="gemini-2.0-flash", input=prompt)
                    return getattr(resp, "text", str(resp))
            if hasattr(genai_new, "GenerativeModel"):
                model = genai_new.GenerativeModel("gemini-2.0-flash")
                resp = model.generate_content(prompt)
                return getattr(resp, "text", str(resp))
        except Exception:
            pass

    # Try legacy google.generativeai pattern
    if genai_legacy:
        try:
            if hasattr(genai_legacy, "configure"):
                genai_legacy.configure(api_key=api_key)
            # many legacy examples provide a generate_text or generate call
            if hasattr(genai_legacy, "generate_text"):
                resp = genai_legacy.generate_text(model="text-bison-001", prompt=prompt)
                return getattr(resp, "text", str(resp))
            if hasattr(genai_legacy, "generate"):
                resp = genai_legacy.generate(model="text-bison-001", prompt=prompt)
                return getattr(resp, "text", str(resp))
        except Exception:
            pass

    return None


def generate_wellness_plan(user_profile: dict) -> dict:
    """
    Use an available GenAI client (new or legacy) to generate a personalized plan.
    Falls back to a deterministic summary if no client works.
    """
    prompt = f"""You are a female fitness coach specializing in hormonal cycle-based training and nutrition.

Based on this user profile, provide a detailed, actionable plan:
- Age: {user_profile.get('age', 'N/A')}
- Height (cm): {user_profile.get('height_cm', 'N/A')}
- Weight (kg): {user_profile.get('weight_kg', 'N/A')}
- Goal: {user_profile.get('goal', 'general wellness')}
- Workout days per week: {user_profile.get('workout_days', 3)}
- Days since last period: {user_profile.get('last_period_days_ago', 'N/A')}
- Average cycle length: {user_profile.get('cycle_length', 28)} days

Return a JSON-formatted response with:
1. cycle_phase
2. nutrition_recommendations
3. workout_recommendations
4. supplements
5. general_tips
Be specific, actionable, and supportive."""

    # Prefer running Jac agents if `jac` CLI is available in this environment.
    jac_path = shutil.which("jac")
    if not jac_path:
        # Try to locate jac next to the Python executable (venv/Scripts)
        possible = Path(sys.executable).parent / "jac.exe"
        if possible.exists():
            jac_path = str(possible)

    if jac_path:
        try:
            # Create a temporary Jac runner that constructs the user and invokes generate_plan
            with tempfile.NamedTemporaryFile("w", suffix=".jac", delete=False) as f:
                tmp_path = f.name
                # Build a small Jac program that imports nutrition and calls generate_nutrition_plan
                f.write("import nutrition;\n")
                f.write("with entry {\n")
                f.write(f"    p = nutrition.generate_nutrition_plan(age={int(user_profile.get('age',25))}, weight_kg={float(user_profile.get('weight_kg',70))}, height_cm={float(user_profile.get('height_cm',165))}, goal=\"{user_profile.get('goal','general wellness')}\", workout_days={int(user_profile.get('workout_days',3))}, cycle_phase=\"{user_profile.get('cycle_phase','Follicular')}\");\n")
                f.write("    print(p);\n")
                f.write("}\n")

            # Run jac and capture stdout
            proc = subprocess.run([jac_path, "run", tmp_path], capture_output=True, text=True, timeout=20)
            try:
                os.remove(tmp_path)
            except Exception:
                pass

            if proc.returncode == 0 and proc.stdout:
                out = proc.stdout.strip()
                # Try to parse a NutritionPlan(...) output into a dict
                m = re.search(r"NutritionPlan\((.*)\)", out)
                if m:
                    kvs = m.group(1)
                    data = {}
                    for part in kvs.split(','):
                        if '=' in part:
                            k, v = part.split('=', 1)
                            k = k.strip()
                            v = v.strip()
                            # remove possible surrounding quotes
                            if v.startswith('"') and v.endswith('"'):
                                v = v[1:-1]
                            else:
                                try:
                                    v = int(v)
                                except Exception:
                                    try:
                                        v = float(v)
                                    except Exception:
                                        pass
                            data[k] = v
                    return {"success": True, "jac_response": data}
                # If parsing failed, return raw output
                return {"success": True, "jac_response_raw": out}
        except Exception:
            # If jac invocation fails, fall through to GenAI/fallback
            pass

    # Fall back to calling Gemini/GenAI clients
    text = _call_genai(prompt)
    if text:
        return {"success": True, "gemini_response": text}

    # Deterministic fallback
    phase = "follicular"
    nutrition = {
        "calories_per_day": int(24 * float(user_profile.get("weight_kg", 70))),
        "meals": {
            "breakfast": "Oats with fruit and protein",
            "lunch": "Grilled chicken, rice, vegetables",
            "dinner": "Fish, sweet potato, salad",
            "snack": "Greek yogurt or nuts"
        }
    }
    workout = {
        "focus": "moderate resistance + cardio",
        "weekly_split": f"{user_profile.get('workout_days', 3)} days"
    }
    return {
        "success": True,
        "fallback": True,
        "cycle_phase": phase,
        "nutrition_recommendations": nutrition,
        "workout_recommendations": workout,
        "supplements": ["vitamin D", "omega-3"],
        "general_tips": ["sleep 7-9h", "stay hydrated"]
    }
# ...existing code...
