# Design System Documentation

## HerFitness AI - Design System

### Color Palette

#### Primary Colors
- **Dark Purple**: `#6B4C9A` - Main brand color, buttons, primary actions
- **Light Purple**: `#9B7EBD` - Accents, secondary elements
- **Baby Pink**: `#FFB3D9` - Complementary color, menstrual/ovulation phases
- **Hot Pink**: `#FF69B4` - Highlights, interactive elements

#### Cycle Phase Colors
- **Menstrual**: `#FFB3D9` (Baby Pink) - Recovery focus
- **Follicular**: `#9B7EBD` (Light Purple) - Building phase
- **Ovulation**: `#FFB3D9` (Baby Pink) - Peak performance
- **Luteal**: `#6B4C9A` (Dark Purple) - Maintenance phase

#### UI Colors
- **Background**: `#FAFAFA` - Light gray background
- **Surface**: `#FFFFFF` - Card/panel backgrounds
- **Overlay**: `#F5F0FB` - Subtle overlay, phase-aware
- **Text Primary**: `#1F1F1F` - Main text
- **Text Secondary**: `#757575` - Secondary text
- **Border**: `#EEEEEE` - Dividers, borders

### Typography

#### Font Stack
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif
```

#### Font Sizes & Weights
- **H1**: 32px, weight 700
- **H2**: 24px, weight 700
- **H3**: 20px, weight 700
- **Body**: 16px, weight 400
- **Caption**: 12px, weight 400

### Spacing Scale

```
xs:  4px
sm:  8px
md:  12px
lg:  16px
xl:  24px
xxl: 32px
```

### Border Radius

```
sm: 8px
md: 12px
lg: 16px
```

### Shadows

```
card:     0 2px 8px rgba(0, 0, 0, 0.06)
elevation: 0 0 40px rgba(0, 0, 0, 0.1)
```

### Components

#### Button
- **Primary**: Dark purple background, white text, full width
- **Secondary**: Transparent background, purple border, purple text
- **Hover State**: Darker background, slight elevation
- **Disabled State**: Reduced opacity, not-allowed cursor

#### Card
- **Background**: White surface
- **Padding**: `lg` (16px)
- **Border**: 1px solid border color
- **Shadow**: Card shadow
- **Radius**: `lg` (16px)
- **Hover**: Elevation shadow

#### Form Elements
- **Input**: Border color, focus state with purple ring
- **Label**: Small gray text, bold weight
- **Validation**: Error states in baby pink

#### Badge/Status
- **Online**: Green dot with light background
- **Offline**: Pink dot with light background

### Phase-Aware UI

#### Luteal Phase Styling
- **Background**: Soft pink tint (#FFF0F8)
- **Accents**: Dark purple emphasis
- **Message**: Higher calorie needs, recovery focus

#### Follicular Phase Styling
- **Background**: Light purple tint (#F5F0FB)
- **Accents**: Purple emphasis
- **Message**: High energy, building phase

#### Ovulation Phase Styling
- **Background**: Soft pink tint (#FFF0F8)
- **Accents**: Hot pink emphasis
- **Message**: Peak performance period

#### Menstrual Phase Styling
- **Background**: Soft pink tint (#FFF0F8)
- **Accents**: Baby pink emphasis
- **Message**: Recovery and rest focus

### Screens

#### Dashboard
- Cycle tracker with progress bar
- Stats grid (workouts, water intake)
- Today's recommendations
- Quick action buttons

#### Workout Screen
- Workout cards grouped by intensity
- Exercise lists
- Duration and intensity badges
- Start workout buttons

#### Cycle Tracker Screen
- 4 phase cards with detailed info
- Expandable sections for each phase
- Nutrition recommendations per phase
- Workout suggestions per phase

### Responsive Design

- **Mobile First**: Optimized for 480px width
- **Container**: Max 480px, centered
- **Grid**: 2-column grids scale to 1 column on small screens
- **Touch Targets**: Minimum 44px height for buttons

### Accessibility

- **Color Contrast**: WCAG AA compliant
- **Focus States**: Clear focus indicators
- **Tab Navigation**: Logical tab order
- **Labels**: All inputs have associated labels
- **Icons**: Icons have text labels

### Usage Guidelines

#### Color Usage
- Use primary dark purple for main actions
- Use baby pink for phase-specific information
- Use light purple for secondary actions
- Maintain sufficient contrast for readability

#### Typography
- Use H1 for page titles (Dashboard, Workouts, Cycle)
- Use H3 for card titles
- Use body text for content
- Use captions for metadata (duration, intensity)

#### Spacing
- Use `lg` (16px) for main padding
- Use `md` (12px) for card spacing
- Use `sm` (8px) for internal element spacing
- Maintain consistent gaps in grids

#### Components
- Always use card component for content grouping
- Use buttons for primary actions
- Use badges for status indicators
- Use expandable sections for detailed information

### Tailwind Configuration

The design system is configured in `tailwind.config.js` with custom theme extensions:

```javascript
colors: {
  'primary-dark': '#6B4C9A',
  'primary-light': '#9B7EBD',
  'accent-pink': '#FFB3D9',
  'phase-menstrual': '#FFB3D9',
  'phase-follicular': '#9B7EBD',
  'phase-ovulation': '#FFB3D9',
  'phase-luteal': '#6B4C9A',
}
```

### Future Enhancements

- [ ] Dark mode variant
- [ ] Animations library
- [ ] Micro-interactions
- [ ] Loading states
- [ ] Toast notifications
- [ ] Empty states
- [ ] Error boundaries
- [ ] Skeleton loaders
