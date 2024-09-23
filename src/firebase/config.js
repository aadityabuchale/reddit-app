// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzhq1OiWfap0dOvJHQXtU3EmWYcPjDkJk",
  authDomain: "reddit-clone-bf9a0.firebaseapp.com",
  projectId: "reddit-clone-bf9a0",
  storageBucket: "reddit-clone-bf9a0.appspot.com",
  messagingSenderId: "618553842248",
  appId: "1:618553842248:web:b42c5feb111b1ac712967d",
  measurementId: "G-46TL2Q1TS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

const provider = new GoogleAuthProvider();
const ghprovider = new GithubAuthProvider ();

export { auth, provider, ghprovider }