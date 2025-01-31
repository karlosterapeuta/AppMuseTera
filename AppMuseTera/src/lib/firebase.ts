import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCxuATqPNTVTBQPElg69hrQCYxcSRTf9es",
  authDomain: "appmusetera-eeb9f.firebaseapp.com",
  projectId: "appmusetera-eeb9f",
  storageBucket: "appmusetera-eeb9f.firebasestorage.app",
  messagingSenderId: "914679524424",
  appId: "1:914679524424:web:52d6419a4a8bff4da63c7d",
  measurementId: "G-LMFZJS39KB"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics and export it if supported
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

export { app, auth, db, analytics };
