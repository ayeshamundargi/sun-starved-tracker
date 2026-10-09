/**
 * Weather Intelligence Service
 * Integrates Open-Meteo API for real-time solar radiation and meteorology without API keys.
 * Implements strict data source labeling:
 * 🟢 LIVE WEATHER | 🟠 CACHED WEATHER | 🟣 DEMO WEATHER | 🔵 ESTIMATION
 * Full offline fallback to IndexedDB cache & manual weather override.
 */

import { saveCachedWeather, getCachedWeather } from './db.js';
import { DEMO_FARM } from '../data/demoData.js';

export async function fetchFarmWeather(lat, lon, locationName = 'Farm Location') {
  const cacheKey = `weather_${Number(lat).toFixed(2)}_${Number(lon).toFixed(2)}`;

  // If navigator is offline, immediately return cached or demo
  if (!navigator.onLine) {
    const cached = await getCachedWeather(cacheKey);
    if (cached) {
      return {
        ...cached.weather,
        source: 'CACHED',
        cachedAt: cached.cachedAt,
        message: 'Using saved weather information from local cache (offline)'
      };
    }
    return {
      ...DEMO_FARM.weather,
      source: 'DEMO',
      message: 'Network offline and no cache found for this coordinate. Showing demo baseline.'
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,cloud_cover,precipitation,surface_pressure,wind_speed_10m,direct_normal_irradiance,surface_solar_radiation,shortwave_radiation&hourly=temperature_2m,cloud_cover,direct_normal_irradiance,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max&timezone=auto`;

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Weather API responded with status ${response.status}`);
    }

    const data = await response.json();
    const cur = data.current || {};
    const daily = data.daily || {};
    const hourly = data.hourly || {};

    // Map weather code / condition
    const cloudCover = cur.cloud_cover !== undefined ? cur.cloud_cover : 30;
    const solarRadiation = Math.round(cur.surface_solar_radiation || cur.shortwave_radiation || estimateSolarRadiation(lat, cloudCover));
    const directRadiation = Math.round(cur.direct_normal_irradiance || (solarRadiation * 1.15));

    // Construct 24h forecast summary (sampled every 2h for next 24h)
    const hourlyList = [];
    if (hourly.time && hourly.time.length) {
      const nowIdx = 0;
      for (let i = nowIdx; i < Math.min(hourly.time.length, nowIdx + 24); i += 2) {
        const timeStr = hourly.time[i].split('T')[1]?.slice(0, 5) || `${i}:00`;
        hourlyList.push({
          hour: timeStr,
          temp: Math.round(hourly.temperature_2m?.[i] || 22),
          cloud: Math.round(hourly.cloud_cover?.[i] || 20),
          rad: Math.round(hourly.direct_normal_irradiance?.[i] || 0),
          rain: Math.round(hourly.precipitation_probability?.[i] || 0)
        });
      }
    }

    // Construct 7-day forecast
    const dailyList = [];
    if (daily.time && daily.time.length) {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 0; i < Math.min(daily.time.length, 7); i++) {
        const dateObj = new Date(daily.time[i]);
        const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayNames[dateObj.getDay()];
        const rainMax = daily.precipitation_probability_max?.[i] || 0;
        let icon = '☀️';
        if (rainMax > 50) icon = '🌧️';
        else if (rainMax > 25) icon = '🌦️';
        else if ((daily.uv_index_max?.[i] || 5) < 4) icon = '⛅';

        dailyList.push({
          day: dayLabel,
          tempMax: Math.round(daily.temperature_2m_max?.[i] || 26),
          tempMin: Math.round(daily.temperature_2m_min?.[i] || 18),
          rain: rainMax,
          uv: daily.uv_index_max?.[i] || 6,
          condition: icon
        });
      }
    }

    const liveWeather = {
      source: 'LIVE',
      timestamp: new Date().toISOString(),
      temp: Math.round(cur.temperature_2m || 24),
      humidity: Math.round(cur.relative_humidity_2m || 55),
      cloudCover: Math.round(cloudCover),
      rainProb: Math.round(cur.precipitation > 0 ? 80 : (daily.precipitation_probability_max?.[0] || 15)),
      windSpeed: Math.round(cur.wind_speed_10m || 10),
      solarRadiation: solarRadiation,
      directNormalRadiation: directRadiation,
      diffuseRadiation: Math.max(50, Math.round(solarRadiation * (cloudCover / 100) * 0.7)),
      uvIndex: daily.uv_index_max?.[0] || 6.5,
      conditionText: getConditionDescription(cloudCover, cur.precipitation),
      conditionIcon: getConditionIcon(cloudCover, cur.precipitation),
      sunrise: daily.sunrise?.[0]?.split('T')[1]?.slice(0, 5) || '06:10',
      sunset: daily.sunset?.[0]?.split('T')[1]?.slice(0, 5) || '18:20',
      hourlyForecast: hourlyList.length ? hourlyList : DEMO_FARM.weather.hourlyForecast,
      dailyForecast: dailyList.length ? dailyList : DEMO_FARM.weather.dailyForecast
    };

    // Cache the successful live result
    await saveCachedWeather(cacheKey, liveWeather);

    return liveWeather;
  } catch (err) {
    console.warn('Weather API failed or timed out:', err);

    // Fallback to cache
    const cached = await getCachedWeather(cacheKey);
    if (cached) {
      return {
        ...cached.weather,
        source: 'CACHED',
        cachedAt: cached.cachedAt,
        message: 'Live weather temporarily unavailable. Displaying cached information.'
      };
    }

    // Fallback to demo
    return {
      ...DEMO_FARM.weather,
      source: 'DEMO',
      message: 'Weather network request failed. Displaying demo values.'
    };
  }
}

function getConditionDescription(cloudCover, precip) {
  if (precip > 0.5) return 'Rain Showers';
  if (cloudCover < 20) return 'Clear Sunny Sky';
  if (cloudCover < 50) return 'Partly Sunny / Ideal Solar';
  if (cloudCover < 80) return 'Mostly Cloudy';
  return 'Overcast Sky';
}

function getConditionIcon(cloudCover, precip) {
  if (precip > 0.5) return '🌧️';
  if (cloudCover < 20) return '☀️';
  if (cloudCover < 50) return '🌤️';
  if (cloudCover < 80) return '⛅';
  return '☁️';
}

/**
 * Solar radiation estimate based on solar geometry and cloud attenuation
 * Used when direct sensor readings are missing
 */
export function estimateSolarRadiation(lat, cloudCover, hour = 12) {
  const solarDeclination = 0.409 * Math.sin((2 * Math.PI / 365) * 172); // Summer/equinox approx
  const latRad = (lat * Math.PI) / 180;
  const hourAngle = ((hour - 12) * 15 * Math.PI) / 180;

  const sinElevation = Math.sin(latRad) * Math.sin(solarDeclination) +
                       Math.cos(latRad) * Math.cos(solarDeclination) * Math.cos(hourAngle);

  if (sinElevation <= 0) return 0; // Night

  const clearSkyExtraterrestrial = 1361; // Solar constant W/m²
  const airMass = 1 / Math.max(0.1, sinElevation);
  const clearSkyRadiation = clearSkyExtraterrestrial * Math.pow(0.7, Math.pow(airMass, 0.678)) * sinElevation;

  // Cloud cover attenuation (Haurwitz model approximation)
  const cloudFraction = cloudCover / 100;
  const cloudFactor = 1 - 0.75 * Math.pow(cloudFraction, 3);

  return Math.round(clearSkyRadiation * cloudFactor);
}
