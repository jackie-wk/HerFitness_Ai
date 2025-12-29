import from byllm.llm { Model }

glob llm = Model(
    model_name="gemini/gemini-2.0-flash",
    verbose=False
);

# Ask LLM to analyze menstrual cycle info (NON-MEDICAL)
def analyze_cycle(info: str) -> str by llm(method="Reasoning");

# Ask LLM to suggest workout & nutrition (GENERAL WELLNESS)
def generate_wellness_plan(original_info: str, analysis: str) -> str by llm(method="Reasoning");

with entry {

    let user_info = """
    Age: 22
    Last period started 10 days ago
    Average cycle length: 28 days
    Fitness goal: strength
    """;

    let cycle_analysis = analyze_cycle(user_info);
    let wellness_plan = generate_wellness_plan(user_info, cycle_analysis);

    print("Cycle Analysis:");
    print(cycle_analysis);

    print("\nWellness Plan:");
    print(wellness_plan);
}

