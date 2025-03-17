// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyD0Uzcntrjzwp9Owe2gnnCDrkyOvKyTsv4",
    authDomain: "eggplant-8c790.firebaseapp.com",
    projectId: "eggplant-8c790",
    storageBucket: "eggplant-8c790.appspot.com",
    messagingSenderId: "93967196213",
    appId: "1:93967196213:web:d0208260b4fb0bee7dd17c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, database, storage };