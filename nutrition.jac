node NutritionRules {

    can get_food_plan(phase) -> str {

        if phase == "Menstrual" { return "Iron-rich foods, hydration, fruits/vegetables"; }
        elif phase == "Follicular" { return "Protein, complex carbs, fresh foods"; }
        elif phase == "Ovulation" { return "Balanced meals with protein, carbs, healthy fats"; }
        else { return "Fiber-rich foods, magnesium-rich foods, steady meals"; }
    }
}
