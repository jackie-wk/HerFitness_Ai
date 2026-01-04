obj NutritionPlan {
    has calories: int;
    has protein_g: int;
    has carbs_g: int;
    has fats_g: int;
}

sem NutritionPlan =
    "Create a gym nutrition plan for a woman based on her body and fitness goal";

def activity_factor(workout_days: int) -> float {
    if (workout_days <= 1) { return 1.2; }
    elif (workout_days <= 3) { return 1.375; }
    elif (workout_days <= 5) { return 1.55; }
    else { return 1.725; }
}

def protein_multiplier_for(goal: str) -> float {
    if (goal == "muscle_gain" || goal == "bulk") { return 2.0; }
    elif (goal == "weight_loss" || goal == "fat_loss" || goal == "fat loss") { return 1.8; }
    else { return 1.6; }
}

def goal_calorie_adj(goal: str) -> float {
    if (goal == "weight_loss" || goal == "fat_loss" || goal == "fat loss") { return -300.0; }
    elif (goal == "muscle_gain" || goal == "bulk") { return 300.0; }
    else { return 0.0; }
}

def cycle_multiplier(phase: str) -> float {
    if (phase == "Luteal") { return 1.08; }
    else { return 1.0; }
}

def max_val(a: float, b: float) -> float {
    if (a > b) { return a; } else { return b; }
}

def generate_nutrition_plan(
    age: int,
    weight_kg: float,
    height_cm: float,
    goal: str,
    workout_days: int,
    cycle_phase: str
) -> NutritionPlan {

    # sensible clamps
    if (weight_kg < 30) { weight_kg = 30; }
    if (weight_kg > 250) { weight_kg = 250; }
    if (height_cm < 100) { height_cm = 100; }
    if (height_cm > 230) { height_cm = 230; }
    if (age < 14) { age = 14; }
    if (age > 90) { age = 90; }

    # compute calories via BMR * activity + goal adj, then cycle multiplier
    bmr = 10.0 * weight_kg + 6.25 * height_cm - 5.0 * age - 161.0;
    cal = (bmr * activity_factor(workout_days) + goal_calorie_adj(goal)) * cycle_multiplier(cycle_phase);

    protein_g = weight_kg * protein_multiplier_for(goal);
    fat_cal = cal * 0.25;
    fats_g = fat_cal / 9.0;
    protein_cal = protein_g * 4.0;
    carbs_cal = max_val(cal - (protein_cal + fat_cal), 50.0 * 4.0);
    carbs_g = carbs_cal / 4.0;

    return NutritionPlan(
        calories = int(cal),
        protein_g = int(protein_g),
        carbs_g = int(carbs_g),
        fats_g = int(fats_g)
    );
}
obj NutritionPlan {
    has calories: int;
    has protein_g: int;
    has carbs_g: int;
    has fats_g: int;
}

sem NutritionPlan =
    "Create a gym nutrition plan for a woman based on her body and fitness goal";
def generate_nutrition_plan(
    age: int,
    weight_kg: float,
    height_cm: float,
    goal: str,
    workout_days: int,
    cycle_phase: str
) -> NutritionPlan {

    let base_calories = weight_kg * 30;

    if (goal == "weight_loss") {
        base_calories -= 300;
    }
    elif (goal == "muscle_gain") {
        base_calories += 300;
    }

    if (cycle_phase == "Luteal") {
        base_calories += 150;
    }

    let protein = weight_kg * 1.6;
    let fats = weight_kg * 0.8;
    let carbs = (base_calories - (protein * 4 + fats * 9)) / 4;

    return NutritionPlan(
        calories = int(base_calories),
        protein_g = int(protein),
        carbs_g = int(carbs),
        fats_g = int(fats)
    );
}

