import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBb4856pjvHKw6HOPf42JqS_Nnt86qLnPM",
    authDomain: "reactauth-ee4f8.firebaseapp.com",
    projectId: "reactauth-ee4f8",
    storageBucket: "reactauth-ee4f8.appspot.com",
    messagingSenderId: "594386860297",
    appId: "1:594386860297:web:f5aee3312ba6fe0074bbd8"
});

export const auth = app.auth();
export default app;