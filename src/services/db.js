/**
 * IndexedDB Local Database Service
 * Stores: farms, photos, locations, weather, solarConfigurations, optimizationResults, reports, settings
 * Supports complete offline-first CRUD operations without internet dependency.
 */

const DB_NAME = 'SunStarvedTrackerDB';
const DB_VERSION = 1;

const STORES = [
  'farms',
  'photos',
  'locations',
  'weather',
  'solarConfigurations',
  'optimizationResults',
  'reports',
  'settings'
];

let dbPromise = null;

export function openDatabase() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      STORES.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject(event.target.error);
    };
  });

  return dbPromise;
}

// Generic CRUD helpers
export async function getRecord(storeName, id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllRecords(storeName) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function saveRecord(storeName, record) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteRecord(storeName, id) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

// Farm specific helpers
export async function getAllFarms() {
  return getAllRecords('farms');
}

export async function getFarm(farmId) {
  return getRecord('farms', farmId);
}

export async function saveFarm(farm) {
  if (!farm.id) {
    farm.id = 'farm-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
  }
  farm.updatedAt = new Date().toISOString();
  return saveRecord('farms', farm);
}

export async function deleteFarm(farmId) {
  await deleteRecord('farms', farmId);
  await deleteRecord('photos', farmId);
  return true;
}

// Photo storage helper
export async function saveFarmPhoto(farmId, photoDataUrl, metadata = {}) {
  const record = {
    id: farmId,
    dataUrl: photoDataUrl,
    metadata,
    savedAt: new Date().toISOString()
  };
  return saveRecord('photos', record);
}

export async function getFarmPhoto(farmId) {
  return getRecord('photos', farmId);
}

// Weather caching helper
export async function saveCachedWeather(locationKey, weatherData) {
  const record = {
    id: locationKey,
    weather: weatherData,
    cachedAt: new Date().toISOString()
  };
  return saveRecord('weather', record);
}

export async function getCachedWeather(locationKey) {
  return getRecord('weather', locationKey);
}

// Optimization results helper
export async function saveOptimizationResult(farmId, result) {
  const record = {
    id: 'opt-' + farmId + '-' + Date.now(),
    farmId,
    result,
    savedAt: new Date().toISOString()
  };
  return saveRecord('optimizationResults', record);
}

export async function getOptimizationResults(farmId) {
  const all = await getAllRecords('optimizationResults');
  return all.filter((r) => r.farmId === farmId).sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
}

// Settings helper
export async function getSetting(key, defaultValue = null) {
  const record = await getRecord('settings', key);
  return record ? record.value : defaultValue;
}

export async function saveSetting(key, value) {
  return saveRecord('settings', { id: key, value });
}
