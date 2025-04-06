
Built by https://www.blackbox.ai

---

```markdown
# Workout App

## Project Overview
The Workout App is a web-based application designed to help users track their workouts, stay hydrated, and connect with friends for motivation. It features user authentication, workout logging, water tracking, and a friendly user interface built with Tailwind CSS.

## Installation
To run the Workout App locally, follow these instructions:

1. Clone this repository:
   ```bash
   git clone https://your-repository-url.git
   cd workout-app
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

Open your web browser and navigate to `http://localhost:8000/index.html` to view the application.

## Usage
- **Home**: Landing page that welcomes users to the app.
- **Login**: Users can log in with their phone number or email.
- **Sign Up**: New users can create an account.
- **Dashboard**: View daily workout stats, recent activity, and friends' activities.
- **Log Workout**: Add detailed workout entries, including selecting exercises and inputting sets, reps, and weight.
- **Water Tracker**: Track daily water intake with options to quickly log amounts.
- **Templates**: Create and use workout templates for consistent training sessions.
- **Friends**: Connect with friends, send nudges, and view recent activities.

## Features
- User authentication via phone number or email.
- Workout logging with specific details.
- Water intake tracking with daily goals.
- Template creation for workout routines.
- Connections with friends and ability to nudge them for workouts.

## Dependencies
The application relies on the following dependencies:
- **Express**: Web server framework.
- **Firebase**: For user authentication and data handling (integrated via separate `firebase.js` file).

Refer to the `package.json` file for a complete list of dependencies used in the project.

## Project Structure
```
workout-app/
├── index.html               # Main landing page
├── login.html               # User login page
├── signup.html              # User registration page
├── dashboard.html           # Main dashboard after logging in
├── log-workout.html         # Page to log workouts
├── water-tracker.html       # Page to track water intake
├── friends.html             # Page to manage friends
├── templates.html           # Page to create and manage templates
├── styles.css               # Custom styles using Tailwind CSS
├── script.js                # Main JavaScript file for app functionality
├── firebase.js              # Firebase configuration and API calls
├── server.js                # Node.js server for handling requests
├── package.json             # npm dependencies
└── package-lock.json        # npm lock file
```

Enjoy building and using your Workout App! For any issues or contributions, please feel free to reach out or submit a pull request.
```