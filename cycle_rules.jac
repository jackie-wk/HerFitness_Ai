node CycleRules {

    can determine_phase(day_in_cycle: int) -> str {

        if (day_in_cycle >= 1 && day_in_cycle <= 5) {
            return "Menstrual";
        }
        elif (day_in_cycle <= 13) {
            return "Follicular";
        }
        elif (day_in_cycle <= 16) {
            return "Ovulation";
        }
        else {
            return "Luteal";
        }
    }

    can energy_profile(phase: str) -> str {

        if (phase == "Menstrual") {
            return "Lower energy, focus on rest and gentle movement";
        }
        elif (phase == "Follicular") {
            return "Rising energy, good for learning and strength work";
        }
        elif (phase == "Ovulation") {
            return "Peak energy, suitable for high-intensity workouts";
        }
        else {
            return "Moderate energy, focus on balance and recovery";
        }
    }
}
