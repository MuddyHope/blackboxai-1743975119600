// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEXAMPLEEXAMPLEEXAMPLEEXAMPLE",
    authDomain: "workout-app-example.firebaseapp.com",
    projectId: "workout-app-example",
    storageBucket: "workout-app-example.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123def456example789"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

// Authentication state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        console.log('User is signed in:', user.uid);
        // Update UI for authenticated user
        document.querySelectorAll('.auth-only').forEach(el => {
            el.classList.remove('hidden');
        });
        document.querySelectorAll('.unauth-only').forEach(el => {
            el.classList.add('hidden');
        });
    } else {
        currentUser = null;
        console.log('User is signed out');
        // Update UI for unauthenticated user
        document.querySelectorAll('.auth-only').forEach(el => {
            el.classList.add('hidden');
        });
        document.querySelectorAll('.unauth-only').forEach(el => {
            el.classList.remove('hidden');
        });
    }
});

// Authentication functions
async function sendOTP(phoneNumber) {
    try {
        const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, appVerifier);
        window.confirmationResult = confirmationResult;
        return true;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
}

async function verifyOTP(code) {
    try {
        const result = await window.confirmationResult.confirm(code);
        return result.user;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
}

async function signOut() {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Error signing out:', error);
    }
}

// Database functions
async function saveWorkout(workoutData) {
    try {
        await db.collection('workouts').add({
            ...workoutData,
            userId: currentUser.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error saving workout:', error);
        throw error;
    }
}

async function getWorkouts() {
    try {
        const snapshot = await db.collection('workouts')
            .where('userId', '==', currentUser.uid)
            .orderBy('timestamp', 'desc')
            .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting workouts:', error);
        throw error;
    }
}

async function saveTemplate(templateData) {
    try {
        await db.collection('templates').add({
            ...templateData,
            userId: currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error saving template:', error);
        throw error;
    }
}

async function getTemplates() {
    try {
        const snapshot = await db.collection('templates')
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt', 'desc')
            .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting templates:', error);
        throw error;
    }
}

// Cloud Functions
async function sendNudge(friendId, message) {
    try {
        const sendNudgeFunction = functions.httpsCallable('sendNudge');
        const result = await sendNudgeFunction({
            friendId,
            message
        });
        return result.data;
    } catch (error) {
        console.error('Error sending nudge:', error);
        throw error;
    }
}

// Export Firebase services
export { 
    auth, 
    db, 
    functions,
    sendOTP,
    verifyOTP,
    signOut,
    saveWorkout,
    getWorkouts,
    saveTemplate,
    getTemplates,
    sendNudge
};