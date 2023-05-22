// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import config from '.'

const firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
}

// Initialize Firebase
let firebase_app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
console.log('get_auth', getAuth(firebase_app))
export const auth = getAuth(firebase_app)
