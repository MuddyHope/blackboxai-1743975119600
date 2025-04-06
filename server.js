const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Mock API endpoint for exercises
app.get('/api/exercises', (req, res) => {
    const exercises = [
        { id: 1, name: 'Bench Press', muscle: 'Chest', equipment: 'Barbell' },
        { id: 2, name: 'Squat', muscle: 'Legs', equipment: 'Barbell' },
        { id: 3, name: 'Deadlift', muscle: 'Back', equipment: 'Barbell' },
        { id: 4, name: 'Shoulder Press', muscle: 'Shoulders', equipment: 'Dumbbell' },
        { id: 5, name: 'Pull Up', muscle: 'Back', equipment: 'Bodyweight' }
    ];
    
    // Filter by query if provided
    const query = req.query.q?.toLowerCase();
    const filtered = query 
        ? exercises.filter(ex => 
            ex.name.toLowerCase().includes(query) ||
            ex.muscle.toLowerCase().includes(query))
        : exercises;
    
    res.json(filtered);
});

// Mock API endpoint for workout templates
app.get('/api/templates', (req, res) => {
    const templates = [
        {
            id: 1,
            name: 'Chest Day',
            exercises: [
                { name: 'Bench Press', sets: 3, reps: 8, rest: '60s' },
                { name: 'Incline Dumbbell Press', sets: 3, reps: 10, rest: '60s' },
                { name: 'Cable Fly', sets: 3, reps: 12, rest: '45s' }
            ]
        },
        {
            id: 2,
            name: 'Leg Day',
            exercises: [
                { name: 'Squat', sets: 4, reps: 6, rest: '90s' },
                { name: 'Leg Press', sets: 3, reps: 10, rest: '60s' },
                { name: 'Leg Curl', sets: 3, reps: 12, rest: '45s' }
            ]
        }
    ];
    res.json(templates);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Access the app at http://localhost:${PORT}/index.html`);
});