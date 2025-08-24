# FitFlow - Future Fitness Journey

A modern, minimalistic fitness app built with React Native and Expo, designed for equipment-free workouts with a futuristic aesthetic.

## 🚀 Features

### Core Functionality
- **Daily Motivational Quotes**: Inspiring fitness quotes that change daily to keep you motivated
- **Interactive Calendar**: Track your workout schedule with visual indicators for planned routines
- **Equipment-Free Workouts**: Complete bodyweight workout library requiring no gym equipment
- **Progress Tracking**: Monitor your fitness journey with detailed statistics and achievements
- **Routine Management**: Organize and customize your workout routines

### Workout Categories
- **Bodyweight**: Push-ups, squats, planks, burpees, and more
- **Home Cardio**: High-intensity fat-burning sessions
- **Flexibility**: Stretching and recovery routines for better mobility

### Design Features
- **Futuristic Dark Theme**: Sleek space-inspired color palette
- **Minimalistic UI**: Clean, spacious layouts with subtle transparency effects
- **Smooth Animations**: Fluid transitions powered by React Native Reanimated
- **Responsive Design**: Optimized for all mobile screen sizes

## 🎨 Design System

### Color Palette
- **Primary**: Deep Space (#0A0A0F, #0F0F23)
- **Accent**: Cyan Blue (#00D4FF)
- **Success**: Emerald (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)
- **Text**: White (#FFFFFF) / Gray (#94A3B8)

### Typography
- **Headers**: 24-32px, Bold (700)
- **Body**: 14-16px, Medium (500)
- **Captions**: 12px, Regular (400)
- **Letter Spacing**: Enhanced for futuristic feel

## 📱 Screenshots

The app features four main sections accessible via bottom tab navigation:

1. **Home**: Daily quotes, routine overview, and quick stats
2. **Workouts**: Browse and start equipment-free workout sessions
3. **Calendar**: Schedule and track your daily fitness routines
4. **Progress**: Monitor achievements and fitness statistics

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with typed routes
- **Animations**: React Native Reanimated 4
- **Icons**: Lucide React Native
- **Gradients**: Expo Linear Gradient
- **Language**: TypeScript

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI

### Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd fitflow-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open the app:
   - **iOS**: Use the Expo Go app to scan the QR code
   - **Android**: Use the Expo Go app to scan the QR code
   - **Web**: Press `w` in the terminal to open in browser

## 🏗 Project Structure

```
app/
├── (tabs)/                 # Tab-based navigation
│   ├── index.tsx          # Home screen with quotes
│   ├── workouts.tsx       # Workout library
│   ├── calendar.tsx       # Workout calendar
│   ├── progress.tsx       # Progress tracking
│   └── _layout.tsx        # Tab navigation layout
├── splash.tsx             # Animated splash screen
├── _layout.tsx            # Root layout
└── +not-found.tsx         # 404 page

hooks/
└── useFrameworkReady.ts   # Framework initialization hook
```

## 🎯 Key Components

### Splash Screen
- Animated logo entrance with scaling and opacity effects
- Loading progress bar with gradient
- Auto-navigation to main app after 2.5 seconds

### Home Screen
- Rotating daily motivational quotes
- Today's routine overview with completion status
- Quick stats: completed workouts, remaining sessions, progress percentage

### Workouts Screen
- Categorized workout library (Bodyweight, Cardio, Flexibility)
- Detailed exercise lists for each workout
- Difficulty levels and calorie estimates
- Interactive workout selection and preview

### Calendar Screen
- Monthly view with workout indicators
- Tap dates to view scheduled routines
- Add new routines functionality
- Visual feedback for workout days

### Progress Screen
- Weekly activity chart with completion rates
- Monthly statistics with progress bars
- Achievement system with unlockable badges
- Trend analysis and goal tracking

## 🔧 Configuration

### Environment Setup
The app uses Expo's managed workflow and requires no additional configuration for basic usage.

### Customization
- **Colors**: Modify the color palette in individual component styles
- **Workouts**: Add new exercises to the workout arrays in `workouts.tsx`
- **Quotes**: Update the motivational quotes array in `index.tsx`

## 📱 Platform Support

- **iOS**: Full support with native performance
- **Android**: Full support with native performance  
- **Web**: Optimized for mobile-first responsive design

## 🚀 Deployment

### Development Build
```bash
npm run build:web
```

### Production Deployment
The app can be deployed using:
- **Expo Application Services (EAS)** for app stores
- **Netlify/Vercel** for web deployment
- **Expo Updates** for over-the-air updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Expo Team** for the excellent development platform
- **Lucide** for the beautiful icon library
- **React Native Community** for continuous improvements
- **Fitness Community** for workout inspiration

## 📞 Support

For support, questions, or feature requests:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**FitFlow** - Transform your body, transform your life. 💪✨