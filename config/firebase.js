import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCuqU_DY22gi1mXqjSPWVD7MXDNJ6PvDA",
  authDomain: "test-db-7681a.firebaseapp.com",
  projectId: "test-db-7681a",
  storageBucket: "test-db-7681a.appspot.com",
  messagingSenderId: "122304642055",
  appId: "1:122304642055:web:a18a183178f932e747bea2",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
