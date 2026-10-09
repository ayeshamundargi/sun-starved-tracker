/**
 * Farm Location & Geolocation Service
 * Handles browser GPS positioning, offline fallbacks, and reverse geocoding.
 */

import { getSetting, saveSetting } from './db.js';

export async function getBrowserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy, altitude } = pos.coords;
        const locationObj = {
          lat: Number(latitude.toFixed(6)),
          lon: Number(longitude.toFixed(6)),
          accuracy: Math.round(accuracy || 10),
          elevation: altitude ? Math.round(altitude) : 840,
          source: 'LIVE',
          updatedAt: new Date().toISOString()
        };

        // Attempt reverse geocode if online
        try {
          const address = await reverseGeocode(latitude, longitude);
          Object.assign(locationObj, address);
        } catch (e) {
          locationObj.label = `Coordinates (${locationObj.lat}, ${locationObj.lon})`;
        }

        // Save last known location
        await saveSetting('last_location', locationObj);
        resolve(locationObj);
      },
      (err) => {
        let msg = 'Location permission denied or unavailable.';
        if (err.code === 1) msg = 'Location permission was denied by user.';
        else if (err.code === 2) msg = 'Position unavailable.';
        else if (err.code === 3) msg = 'Location request timed out.';
        reject(new Error(msg));
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  });
}

export async function getLastKnownLocation() {
  const saved = await getSetting('last_location');
  if (saved) {
    return { ...saved, source: 'CACHED' };
  }
  return null;
}

export async function reverseGeocode(lat, lon) {
  if (!navigator.onLine) {
    return {
      label: `Farm at ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`,
      village: 'Local Area',
      district: 'Saved District',
      state: 'Agricultural Zone',
      country: 'India'
    };
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=12&addressdetails=1`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    signal: controller.signal
  });
  clearTimeout(timeoutId);

  if (!res.ok) throw new Error('Geocoding service unavailable');
  const data = await res.json();
  const addr = data.address || {};

  const village = addr.village || addr.suburb || addr.town || addr.hamlet || 'Farm Area';
  const district = addr.county || addr.state_district || addr.city || 'District';
  const state = addr.state || 'State';
  const country = addr.country || 'India';

  return {
    label: `${village}, ${district}`,
    village,
    district,
    state,
    country
  };
}
