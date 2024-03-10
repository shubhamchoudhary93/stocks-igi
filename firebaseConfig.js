import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeUyCffgd1SL0egluxJx5Gb0bx4GkQ7e0",
  authDomain: "stocks-igi.firebaseapp.com",
  projectId: "stocks-igi",
  storageBucket: "stocks-igi.appspot.com",
  messagingSenderId: "1051993495763",
  appId: "1:1051993495763:web:40a1683fd6b38fd245dc26",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(
  app
  //   {
  //   persistence: getReactNativePersistence(AsyncStorage),
  // }
);

export const db = getFirestore(app);

export const stockRef = collection(db, "stocks");
