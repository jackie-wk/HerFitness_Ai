# HerFitness Mobile Development Guide

## Getting Started

### 1. **Setup Backend Server**

Make sure your FastAPI backend is running:

```bash
cd ..  # Back to root
python -m pip install -r requirements.txt
python backend/app.py
```

The backend should be available at `http://localhost:8000` or `http://<your-ip>:8000`

### 2. **Configure Mobile App**

In the mobile folder, create a `.env` file:

```bash
cd mobile
echo "REACT_APP_API_URL=http://<YOUR_MACHINE_IP>:8000" > .env
```

Get your IP address:
- **Windows**: `ipconfig` → Look for IPv4 Address
- **Mac**: `ifconfig getifaddr en0`
- **Linux**: `hostname -I`

### 3. **Install Dependencies**

```bash
npm install
```

### 4. **Run the App**

#### Option A: Expo Go (Fastest for development)
```bash
npm start
```

Then scan the QR code with:
- **iOS**: Camera app → Open link in Expo Go
- **Android**: Expo Go app → Scan QR code

#### Option B: Android Emulator
```bash
npm run android
```

#### Option C: iOS Simulator
```bash
npm run ios
```

## Development Workflow

### Hot Reload
Changes are automatically reflected in your app. Just edit files and save!

### Testing API Connection
1. Open Home screen
2. Check "Connected" badge at top
3. If offline, verify:
   - Backend server is running
   - Correct IP in `.env`
   - Device is on same network

### Adding New Screens

1. Create file: `src/screens/MyScreen.tsx`
2. Add to navigation: `src/navigation.tsx`
3. Update tab navigator if needed

### Modifying Theme

Edit `src/theme.ts` to change:
- Colors
- Spacing
- Typography
- Border radius

All components use theme tokens for consistency!

## Build Commands

### For Testing
```bash
npm test
```

### For Production Android
```bash
expo build:android -t app-bundle
```

### For Production iOS
```bash
expo build:ios -t archive
```

## Project Structure Deep Dive

```
mobile/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx        # Landing page with profile summary
│   │   ├── ProfileScreen.tsx      # Create/edit user profile
│   │   ├── PlanScreen.tsx         # AI wellness plan display
│   │   └── CycleScreen.tsx        # Cycle education
│   ├── components/                # Reusable UI components (future)
│   ├── navigation.tsx             # Stack & Tab navigation
│   ├── App.tsx                    # Root app component
│   ├── api.ts                     # Axios client & endpoints
│   ├── store.ts                   # Zustand state management
│   ├── types.ts                   # TypeScript interfaces
│   ├── theme.ts                   # Design tokens
│   └── index.ts                   # Entry point
├── app.json                       # Expo config
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
└── README.md                      # Documentation
```

## Key Components Explained

### HomeScreen
- **Purpose**: Welcome page and profile overview
- **Features**: Backend health check, quick action buttons
- **Data**: Loads from Zustand store

### ProfileScreen
- **Purpose**: User onboarding and profile editing
- **Features**: Form validation, error handling
- **Data**: Saves to Zustand store

### PlanScreen
- **Purpose**: Display AI-generated wellness plans
- **Features**: API call, expandable sections, error display
- **Data**: Fetches from backend `/generate_plan`

### CycleScreen
- **Purpose**: Educational content about menstrual cycles
- **Features**: Phase information, macro recommendations
- **Data**: Static content, no backend calls

## State Management (Zustand)

The app uses Zustand for simple state management:

```typescript
// Access state anywhere:
const { profile, plan, setProfile, setPlan } = useAppStore();

// Update state:
setProfile({ age: 25, ... });
```

## API Client

All API calls go through `src/api.ts`:

```typescript
// Add new endpoint:
export const myNewEndpoint = async (data: any) => {
  const response = await api.post('/my-route', data);
  return response.data;
};
```

## Styling

All components use `theme.ts` for consistent styling:

```typescript
import { theme } from '../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,  // Uses theme color
    padding: theme.spacing.lg,              // Uses theme spacing
  },
});
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| "Connection refused" | Check backend IP in `.env` |
| "Blank white screen" | Check console for errors: `npm start` then watch output |
| "Changes not reflecting" | Try: `npm start -- --clear` |
| "Port 19000 in use" | `lsof -ti:19000 \| xargs kill -9` |

## Next Steps

1. ✅ Backend is running
2. ✅ Mobile app is installed
3. 🚀 Test the app with sample data
4. 📝 Customize colors/fonts in `theme.ts`
5. 🔗 Connect to real backend endpoints
6. 🎨 Add more screens for:
   - Workout tracking
   - Meal logging
   - Community features

## Resources

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [TypeScript](https://www.typescriptlang.org)

## Need Help?

Check:
1. Console logs: `npm start` then check terminal
2. Network tab: Use `console.log(api.defaults.baseURL)`
3. Backend: Verify `http://localhost:8000/health` returns `{"status":"ok"}`
