// firebaseCache.js
import {
  getMemoryCacheWithExpiration,
  setMemoryCacheWithExpiration,
} from "./memoryCache";
import {
  ref as realtimeRef,
  get as realtimeGet,
  child,
} from "firebase/database";
import { realtimeDB } from "../../utils/firebase/firebaseConfig";

const cacheKey = "firebaseData";
const cacheTTL = 3600000; // 1 hora en milisegundos

// Utiliza memoria en el servidor y localStorage en el cliente
export async function getDataFromFirebaseWithCache() {
  // Detectar si estamos en el servidor o en el cliente
  const isServer = typeof window === "undefined";
  console.log("Donde estamos?: ", isServer ? "Server" : "Client");
  // Obtener datos del caché
  const cachedData = isServer
    ? getMemoryCacheWithExpiration(cacheKey)
    : getLocalStorageWithExpiration(cacheKey);

  if (cachedData) {
    console.log("datos de la caché");
    return cachedData; // Retornar datos desde el caché
  }

  // Obtener datos de Firebase Realtime Database
  try {
    console.log("Petición a Firebase o emuladores");
    const dbRef = realtimeRef(realtimeDB);
    const snapshot = await realtimeGet(child(dbRef, "/"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Almacenar en el caché correspondiente
      if (isServer) {
        setMemoryCacheWithExpiration(cacheKey, data, cacheTTL);
      } else {
        setLocalStorageWithExpiration(cacheKey, data, cacheTTL);
      }
      return data;
    } else {
      console.log("No data available");
      return {};
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

// Funciones de `localStorage` para el cliente
function setLocalStorageWithExpiration(key, data, ttl) {
  const now = new Date();
  const item = {
    data: data,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorageWithExpiration(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.data;
}
