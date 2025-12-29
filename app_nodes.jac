node User {
    has age;
    has last_period_day;
    has cycle_length;
    has fitness_goal;

    can enter_data {
        age = 22;
        last_period_day = 10;
        cycle_length = 28;
        fitness_goal = "strength";

        visit CycleAnalyzer;
    }
}

node CycleAnalyzer {
    has phase;

    can analyze(user: User) {
        visit CycleRules;
        phase = CycleRules.determine_phase(user.last_period_day);
        visit WorkoutPlanner(phase);
        visit NutritionPlanner(phase);
    }
}

node WorkoutPlanner {
    can recommend(phase) {
        # same logic as before
        if phase == "Menstrual" { print("Light yoga/walks"); }
        elif phase == "Follicular" { print("Strength training"); }
        elif phase == "Ovulation" { print("High-intensity"); }
        else { print("Moderate exercises"); }
    }
}

node NutritionPlanner {
    can recommend(phase) {
        # placeholder; we'll move this to nutrition.jac
        print("Nutrition recommendations coming from nutrition.jac");
    }
}

node LLMExplainer {
    can explain(workout_plan, food_plan) {
        py { from wellness_llm import explain_with_gemini; print(explain_with_gemini({ "workout": workout_plan, "food": food_plan, "phase": "Phase" })) }
    }
}
