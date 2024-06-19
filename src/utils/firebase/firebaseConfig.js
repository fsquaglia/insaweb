// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; //almacenamiento de imágenes
import { getDatabase, connectDatabaseEmulator } from "firebase/database"; //realtime database para los Servicios
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"; //firestore como BD de colecciones y documentos

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyDyyCgv2HGJ61K4b_VjInnwfiRsV6WFUpU",
  authDomain: "iharalondon.firebaseapp.com",
  databaseURL: "https://iharalondon-default-rtdb.firebaseio.com",
  projectId: "iharalondon",
  storageBucket: "iharalondon.appspot.com",
  messagingSenderId: "38211738714",
  appId: "1:38211738714:web:dd8a5d56730be71a594c63",
  measurementId: "G-VZZ3H5NNFG",
};
// Initialize Firebase with dynamic configuration
let app;
//if (typeof window !== 'undefined' && window.location.hostname === "localhost") {
if (true) {
  // Use local emulator settings
  const localConfig = {
    ...firebaseConfig,
    databaseURL: "http://localhost:9000/?ns=iharalondon",
  };
  app = initializeApp(localConfig);
  connectFirestoreEmulator(getFirestore(app), "localhost", 8080);
  console.log("Conectado con emuladores");
} else {
  // Use production settings
  console.log("Conectado sin Emuladores");
  app = initializeApp(firebaseConfig);
}

// Initialize Firebase
const imagesDB = getStorage(app);
const realtimeDB = getDatabase(app);
const firestoreDB = getFirestore(app);

export { app, imagesDB, realtimeDB, firestoreDB };
