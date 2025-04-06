// Global Variables
let darkMode = localStorage.getItem('darkMode') === 'true';
let currentUser = null;

// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Apply dark mode if enabled
    if (darkMode) {
        document.documentElement.classList.add('dark');
    }

    // Set up dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Initialize page-specific functionality
    if (document.querySelector('#exerciseSearch')) {
        initWorkoutLogging();
    }
    if (document.querySelector('#waterProgress')) {
        initWaterTracker();
    }
    if (document.querySelector('#friendSearch')) {
        initFriendsPage();
    }
    if (document.querySelector('#templateName')) {
        initTemplatesPage();
    }
});

// Dark Mode Toggle
function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark');
}

// Workout Logging Page Functions
function initWorkoutLogging() {
    const exerciseSearch = document.getElementById('exerciseSearch');
    const searchResults = document.getElementById('searchResults');
    
    exerciseSearch.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim();
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }
        
        try {
            const exercises = await searchExercises(query);
            displaySearchResults(exercises);
        } catch (error) {
            console.error('Error searching exercises:', error);
        }
    }, 300));
}

async function searchExercises(query) {
    // In a real app, this would call the ExerciseDB API
    // For now, we'll use mock data
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Bench Press', muscle: 'Chest' },
                { name: 'Squat', muscle: 'Legs' },
                { name: 'Deadlift', muscle: 'Back' },
                { name: 'Shoulder Press', muscle: 'Shoulders' },
                { name: 'Pull Up', muscle: 'Back' }
            ].filter(ex => 
                ex.name.toLowerCase().includes(query.toLowerCase()) ||
                ex.muscle.toLowerCase().includes(query.toLowerCase())
            ));
        }, 500);
    });
}

function displaySearchResults(exercises) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    
    if (exercises.length === 0) {
        searchResults.innerHTML = '<p class="p-2 text-gray-500 dark:text-gray-400">No exercises found</p>';
    } else {
        exercises.forEach(exercise => {
            const item = document.createElement('div');
            item.className = 'p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer';
            item.innerHTML = `
                <h4 class="font-medium text-gray-800 dark:text-white">${exercise.name}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">${exercise.muscle}</p>
            `;
            item.addEventListener('click', () => addExerciseToWorkout(exercise));
            searchResults.appendChild(item);
        });
    }
    
    searchResults.classList.remove('hidden');
}

function addExerciseToWorkout(exercise) {
    const selectedExercises = document.getElementById('selectedExercises');
    const template = document.getElementById('exerciseTemplate').cloneNode(true);
    
    template.id = '';
    template.querySelector('h3').textContent = exercise.name;
    template.classList.remove('hidden');
    
    selectedExercises.appendChild(template);
    document.getElementById('searchResults').classList.add('hidden');
    document.getElementById('exerciseSearch').value = '';
}

// Water Tracker Page Functions
function initWaterTracker() {
    // Load saved data or initialize
    let waterData = JSON.parse(localStorage.getItem('waterData')) || {
        current: 0,
        goal: 3,
        history: []
    };
    
    // Update UI
    updateWaterUI(waterData);
    
    // Set up event listeners
    document.querySelectorAll('.water-amount-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const amount = parseFloat(this.getAttribute('data-amount'));
            waterData.current += amount;
            waterData.history.push({
                amount,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            saveWaterData(waterData);
        });
    });
    
    document.getElementById('addCustomBtn').addEventListener('click', function() {
        const amount = parseFloat(document.getElementById('customAmount').value);
        if (isNaN(amount) || amount <= 0) return;
        
        waterData.current += amount;
        waterData.history.push({
            amount,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        saveWaterData(waterData);
    });
    
    document.getElementById('goalSlider').addEventListener('input', function() {
        waterData.goal = parseFloat(this.value);
        document.getElementById('goalDisplay').textContent = `${waterData.goal}L`;
        saveWaterData(waterData);
    });
}

function updateWaterUI(data) {
    const progress = Math.min((data.current / data.goal) * 100, 100);
    document.getElementById('waterProgress').style.width = `${progress}%`;
    document.getElementById('currentAmount').textContent = data.current.toFixed(1);
    document.getElementById('goalAmount').textContent = data.goal.toFixed(1);
    document.getElementById('goalSlider').value = data.goal;
    document.getElementById('goalDisplay').textContent = `${data.goal}L`;
    
    const historyContainer = document.getElementById('intakeHistory');
    historyContainer.innerHTML = '';
    
    data.history.forEach(item => {
        const entry = document.createElement('div');
        entry.className = 'flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded';
        entry.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-tint text-blue-500 mr-3"></i>
                <span class="text-gray-800 dark:text-white">${item.amount}L</span>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">${item.time}</span>
        `;
        historyContainer.appendChild(entry);
    });
}

function saveWaterData(data) {
    localStorage.setItem('waterData', JSON.stringify(data));
    updateWaterUI(data);
}

// Friends Page Functions
function initFriendsPage() {
    // Set up nudge buttons
    document.querySelectorAll('.nudge-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const friendName = this.closest('.bg-white').querySelector('h3').textContent;
            alert(`Nudge sent to ${friendName}! They'll be notified to work out with you.`);
        });
    });
    
    // Set up friend request buttons
    document.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.bg-white').remove();
        });
    });
    
    document.querySelectorAll('.decline-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.bg-white').remove();
        });
    });
}

// Templates Page Functions
function initTemplatesPage() {
    // Similar to workout logging, but for templates
    const templateExerciseSearch = document.getElementById('templateExerciseSearch');
    const templateSearchResults = document.getElementById('templateSearchResults');
    
    templateExerciseSearch.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim();
        if (query.length < 2) {
            templateSearchResults.classList.add('hidden');
            return;
        }
        
        try {
            const exercises = await searchExercises(query);
            displayTemplateSearchResults(exercises);
        } catch (error) {
            console.error('Error searching exercises:', error);
        }
    }, 300));
}

function displayTemplateSearchResults(exercises) {
    const searchResults = document.getElementById('templateSearchResults');
    searchResults.innerHTML = '';
    
    if (exercises.length === 0) {
        searchResults.innerHTML = '<p class="p-2 text-gray-500 dark:text-gray-400">No exercises found</p>';
    } else {
        exercises.forEach(exercise => {
            const item = document.createElement('div');
            item.className = 'p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer';
            item.innerHTML = `
                <h4 class="font-medium text-gray-800 dark:text-white">${exercise.name}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">${exercise.muscle}</p>
            `;
            item.addEventListener('click', () => addExerciseToTemplate(exercise));
            searchResults.appendChild(item);
        });
    }
    
    searchResults.classList.remove('hidden');
}

function addExerciseToTemplate(exercise) {
    const templateExercises = document.getElementById('templateExercises');
    const template = document.getElementById('templateExerciseTemplate').cloneNode(true);
    
    template.id = '';
    template.querySelector('h3').textContent = exercise.name;
    template.classList.remove('hidden');
    
    templateExercises.appendChild(template);
    document.getElementById('templateSearchResults').classList.add('hidden');
    document.getElementById('templateExerciseSearch').value = '';
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}