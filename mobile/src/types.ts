export interface UserProfile {
  age: number;
  height_cm?: number;
  weight_cm?: number;
  goal?: string;
  workout_days?: number;
  last_period_days_ago?: number;
  cycle_length?: number;
}

export interface WellnessPlan {
  plan: string;
  error?: string;
}

export interface CyclePhase {
  name: string;
  daysRemaining: number;
  color: string;
  exercises: string[];
  supplements: string[];
  diet: string;
}

export interface Workout {
  id: string;
  name: string;
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  phase: string;
  exercises: string[];
}

export interface UserState {
  profile: UserProfile | null;
  plan: WellnessPlan | null;
  cycleData: CyclePhase | null;
  isLoading: boolean;
  error: string | null;
}
