// memoryCache.js
let memoryCache = {};
const cacheTTL = 3600000; // 1 hora en milisegundos

export function setMemoryCacheWithExpiration(key, data, ttl = cacheTTL) {
  const now = Date.now();
  memoryCache[key] = {
    data: data,
    expiry: now + ttl,
  };
  console.log("Seteo cache para key:", key); // Log para verificar
}

export function getMemoryCacheWithExpiration(key) {
  const cachedItem = memoryCache[key];
  if (!cachedItem) return null;
  console.log("Cache para key:", key); // Log para verificar

  const now = Date.now();
  if (now > cachedItem.expiry) {
    console.log("Cache expirada para key:", key); // Log para verificar
    delete memoryCache[key];
    return null;
  }
  console.log("Cache encontrada:", key);
  return cachedItem.data;
}
