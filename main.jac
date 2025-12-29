import user;
import nutrition;
import cycler_rules;
import from byllm.llm { Model };

glob llm = Model(model_name="gemini-pro", temperature=0.2);

def generate_plan(
    user: GymWoman
) -> NutritionPlan by llm();

with entry {
    u = GymWoman(
        age=25,
        height_cm=165,
        weight_kg=70,
        goal="fat loss",
        workout_days=4
    );

    plan = generate_plan(u);
    print(plan);
}

