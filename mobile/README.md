# HerFitness Mobile App

A React Native (Expo) mobile application for personalized female fitness plans based on menstrual cycle phases.

## Features

- 👤 **User Profile Management** - Create and manage your fitness profile
- 🤖 **AI Wellness Plans** - Generate personalized fitness plans using AI
- 📊 **Cycle Tracking** - Understand your menstrual cycle phases
- 💪 **Phase-Specific Workouts** - Exercise recommendations for each cycle phase
- 🥗 **Nutrition Guidance** - Diet recommendations based on your cycle
- 💊 **Supplement Advice** - Optimal supplements for each phase

## Tech Stack

- **Framework**: React Native with Expo
- **State Management**: Zustand
- **Navigation**: React Navigation (Native Stack + Bottom Tabs)
- **HTTP Client**: Axios
- **UI**: Native React Native components with custom styling
- **Language**: TypeScript

## Project Structure

```
src/
├── screens/           # Screen components
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── PlanScreen.tsx
│   └── CycleScreen.tsx
├── components/        # Reusable components (future)
├── utils/            # Utility functions
├── navigation.tsx    # Navigation setup
├── App.tsx          # Root component
├── api.ts           # API client
├── store.ts         # Zustand store
├── types.ts         # TypeScript interfaces
└── theme.ts         # Design system
```

## Installation

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Setup

1. **Install Dependencies**
   ```bash
   cd mobile
   npm install
   ```

2. **Create .env file**
   ```bash
   echo "REACT_APP_API_URL=http://192.168.1.100:8000" > .env
   ```
   Replace `192.168.1.100` with your backend server's IP address.

## Running the App

### Development Mode (Expo)

```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

### Build for Android
```bash
expo build:android
```

### Build for iOS
```bash
expo build:ios
```

## Configuration

### Backend Connection

Update the API URL in `src/api.ts` or via `.env`:

```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.100:8000';
```

### Theme Customization

Edit `src/theme.ts` to customize:
- Colors
- Spacing
- Border radius
- Typography

## API Endpoints Used

- `GET /health` - Health check
- `POST /generate_plan` - Generate wellness plan

**Request Body (UserProfile)**:
```json
{
  "age": 25,
  "height_cm": 165,
  "weight_cm": 70,
  "goal": "fat loss",
  "workout_days": 4,
  "cycle_length": 28,
  "last_period_days_ago": 5
}
```

## Features Explained

### Home Screen
- Shows connection status to backend
- Displays user profile summary
- Quick actions to update profile or generate plans

### Profile Screen
- Create and edit user profile
- Input: age, height, weight, fitness goal, workout frequency
- Cycle tracking: cycle length, days since last period

### Plan Screen
- AI-generated personalized wellness plan
- Expandable sections for:
  - Cycle phase information
  - Nutrition tips per phase
  - Workout recommendations

### Cycle Info Screen
- Educational content about menstrual cycle
- 4 phases: Menstrual, Follicular, Ovulation, Luteal
- Macro nutrient recommendations per phase
- Hormonal changes and recommendations

## Menstrual Cycle Education

The app educates users about:

1. **Menstrual Phase (Days 1-5)**
   - Recovery focus, low intensity workouts
   - Iron and folate rich foods

2. **Follicular Phase (Days 6-14)**
   - Building phase, high intensity workouts
   - Increased energy and confidence

3. **Ovulation (Days 15-17)**
   - Peak performance, best time for PRs
   - High cardio and HIIT capacity

4. **Luteal Phase (Days 18-28)**
   - Maintenance phase, steady workouts
   - Higher calorie needs (200-300 extra)

## Testing

```bash
npm test
```

## Troubleshooting

### Backend Connection Issues

If the app shows "Offline":

1. Check backend is running:
   ```bash
   python backend/app.py
   ```

2. Verify IP address:
   ```bash
   ipconfig getifaddr en0  # macOS
   ipconfig              # Windows
   ```

3. Update `.env` with correct IP

### Packages Not Installed

Clear cache and reinstall:
```bash
npm install
expo start -c
```

## Future Enhancements

- [ ] Workout video library
- [ ] Meal plan database
- [ ] Cycle prediction algorithm
- [ ] Community features
- [ ] Advanced analytics dashboard
- [ ] Wearable device integration
- [ ] Push notifications for cycle phases
- [ ] Social sharing features

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
