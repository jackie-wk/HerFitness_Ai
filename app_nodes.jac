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

// conceptual
node CycleRules {
    can determine_phase(day_in_cycle: int) -> str { ... }    
    can energy_profile(phase: str) -> str { ... }           
}

// A walker that visits a CycleRules node and invokes actions
walker PhaseWalker {
    has int day;
    can run() -> dict {
        // find or be placed on a CycleRules node, then call actions
        $phase = this.node().determine_phase(this.day);      // walker invokes node actions
        $energy = this.node().energy_profile($phase);
        return {"phase": $phase, "energy_profile": $energy};
    }
}

// Graph holds node instances; agents = nodes (CycleRules instances) that own actions/state
// Walkers run on the graph to produce outcomes or mutate nodes.
