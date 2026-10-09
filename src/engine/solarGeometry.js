/**
 * Solar Geometry & Astronomical Position Engine
 * Calculates Solar Elevation, Azimuth, Declination, and Zenith Angle
 * based on Latitude, Longitude, Day of Year, and Local Solar Time.
 */

export function getSolarPosition(lat, lon, date = new Date(), localHour = null) {
  const latRad = (lat * Math.PI) / 180;

  // Day of year (1-365)
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Solar declination (Cooper's formula)
  const declinationDeg = 23.45 * Math.sin(((2 * Math.PI) / 365) * (284 + dayOfYear));
  const declinationRad = (declinationDeg * Math.PI) / 180;

  // Hour of day (fractional 0.0 to 24.0)
  const hour = localHour !== null ? localHour : (date.getHours() + date.getMinutes() / 60);

  // Solar hour angle (H = 15° per hour from solar noon)
  const hourAngleDeg = (hour - 12) * 15;
  const hourAngleRad = (hourAngleDeg * Math.PI) / 180;

  // Solar Elevation Angle (alpha)
  const sinElevation = Math.sin(latRad) * Math.sin(declinationRad) +
                       Math.cos(latRad) * Math.cos(declinationRad) * Math.cos(hourAngleRad);

  const elevationRad = Math.asin(Math.max(-1, Math.min(1, sinElevation)));
  const elevationDeg = (elevationRad * 180) / Math.PI;

  // Solar Azimuth Angle
  let azimuthDeg = 180; // 180 = due South (Northern hemisphere)
  if (elevationDeg > 0) {
    const cosAzimuth = (Math.sin(elevationRad) * Math.sin(latRad) - Math.sin(declinationRad)) /
                       (Math.cos(elevationRad) * Math.cos(latRad));
    const azRad = Math.acos(Math.max(-1, Math.min(1, cosAzimuth)));
    const azRaw = (azRad * 180) / Math.PI;
    azimuthDeg = hour < 12 ? (360 - azRaw) : azRaw;
  }

  // Zenith angle = 90° - Elevation
  const zenithDeg = Math.max(0, 90 - elevationDeg);

  return {
    elevationDeg: Math.max(0, elevationDeg), // 0 when below horizon
    elevationRad: Math.max(0, elevationRad),
    azimuthDeg,
    zenithDeg,
    isDaylight: elevationDeg > 0,
    dayOfYear,
    hour
  };
}

/**
 * Computes Angle of Incidence (AOI) between sunlight vector and panel surface
 * panelTilt: degrees (0 = horizontal, 90 = vertical)
 * panelAzimuth: degrees (180 = facing South)
 */
export function getIncidenceAngle(sunElevDeg, sunAzimuthDeg, panelTiltDeg, panelAzimuthDeg = 180) {
  if (sunElevDeg <= 0) return 90;

  const sunZenithRad = ((90 - sunElevDeg) * Math.PI) / 180;
  const panelTiltRad = (panelTiltDeg * Math.PI) / 180;
  const azDiffRad = ((sunAzimuthDeg - panelAzimuthDeg) * Math.PI) / 180;

  const cosAOI = Math.cos(sunZenithRad) * Math.cos(panelTiltRad) +
                 Math.sin(sunZenithRad) * Math.sin(panelTiltRad) * Math.cos(azDiffRad);

  const aoiRad = Math.acos(Math.max(-1, Math.min(1, cosAOI)));
  return (aoiRad * 180) / Math.PI;
}
