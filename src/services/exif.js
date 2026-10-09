/**
 * Pure JavaScript EXIF Metadata & GPS Parser
 * Extracts GPS Latitude, Longitude, and Date from JPEG/TIFF image Blobs
 * Runs entirely on client-side offline without external binaries.
 */

export async function extractExifGPS(fileOrBlob) {
  try {
    const arrayBuffer = await fileOrBlob.arrayBuffer();
    const dataView = new DataView(arrayBuffer);

    // Verify JPEG SOI marker (0xFFD8)
    if (dataView.getUint16(0) !== 0xFFD8) {
      return { hasGPS: false, reason: 'Not a JPEG image' };
    }

    let offset = 2;
    const length = dataView.byteLength;

    while (offset < length) {
      if (dataView.getUint8(offset) !== 0xFF) {
        return { hasGPS: false, reason: 'Invalid JPEG marker' };
      }

      const marker = dataView.getUint8(offset + 1);

      // APP1 Marker (Exif) = 0xFFE1
      if (marker === 0xE1) {
        return parseExifAPP1(dataView, offset + 4);
      }

      // Next marker
      offset += 2 + dataView.getUint16(offset + 2);
    }

    return { hasGPS: false, reason: 'No EXIF APP1 header found' };
  } catch (err) {
    console.warn('EXIF parse error:', err);
    return { hasGPS: false, reason: err.message };
  }
}

function parseExifAPP1(dataView, startOffset) {
  // Check "Exif\0\0"
  const exifHeader = [0x45, 0x78, 0x69, 0x66, 0x00, 0x00];
  for (let i = 0; i < 6; i++) {
    if (dataView.getUint8(startOffset + i) !== exifHeader[i]) {
      return { hasGPS: false, reason: 'Invalid Exif signature' };
    }
  }

  const tiffOffset = startOffset + 6;
  const isLittleEndian = dataView.getUint16(tiffOffset) === 0x4949; // "II" vs "MM"

  // 0th IFD offset
  const firstIFDOffset = dataView.getUint32(tiffOffset + 4, isLittleEndian);
  let ifdOffset = tiffOffset + firstIFDOffset;

  const numEntries = dataView.getUint16(ifdOffset, isLittleEndian);
  let gpsIFDOffset = null;

  for (let i = 0; i < numEntries; i++) {
    const entryOffset = ifdOffset + 2 + (i * 12);
    const tag = dataView.getUint16(entryOffset, isLittleEndian);

    // GPS Info IFD Pointer = 0x8825
    if (tag === 0x8825) {
      gpsIFDOffset = tiffOffset + dataView.getUint32(entryOffset + 8, isLittleEndian);
      break;
    }
  }

  if (!gpsIFDOffset) {
    return { hasGPS: false, reason: 'No GPS IFD tag present in image' };
  }

  // Parse GPS IFD
  const numGpsEntries = dataView.getUint16(gpsIFDOffset, isLittleEndian);
  let latRef = 'N';
  let lonRef = 'E';
  let latRaw = null;
  let lonRaw = null;

  for (let i = 0; i < numGpsEntries; i++) {
    const entryOffset = gpsIFDOffset + 2 + (i * 12);
    const tag = dataView.getUint16(entryOffset, isLittleEndian);

    if (tag === 0x0001) { // GPSLatitudeRef
      latRef = String.fromCharCode(dataView.getUint8(entryOffset + 8));
    } else if (tag === 0x0002) { // GPSLatitude (3 rationals)
      const valueOffset = tiffOffset + dataView.getUint32(entryOffset + 8, isLittleEndian);
      latRaw = readGpsRationals(dataView, valueOffset, isLittleEndian);
    } else if (tag === 0x0003) { // GPSLongitudeRef
      lonRef = String.fromCharCode(dataView.getUint8(entryOffset + 8));
    } else if (tag === 0x0004) { // GPSLongitude (3 rationals)
      const valueOffset = tiffOffset + dataView.getUint32(entryOffset + 8, isLittleEndian);
      lonRaw = readGpsRationals(dataView, valueOffset, isLittleEndian);
    }
  }

  if (latRaw && lonRaw) {
    let lat = latRaw[0] + (latRaw[1] / 60) + (latRaw[2] / 3600);
    if (latRef === 'S') lat = -lat;

    let lon = lonRaw[0] + (lonRaw[1] / 60) + (lonRaw[2] / 3600);
    if (lonRef === 'W') lon = -lon;

    return {
      hasGPS: true,
      lat: Number(lat.toFixed(6)),
      lon: Number(lon.toFixed(6)),
      latRef,
      lonRef
    };
  }

  return { hasGPS: false, reason: 'Incomplete GPS coordinates in photo' };
}

function readGpsRationals(dataView, offset, isLittleEndian) {
  const result = [];
  for (let i = 0; i < 3; i++) {
    const num = dataView.getUint32(offset + (i * 8), isLittleEndian);
    const den = dataView.getUint32(offset + (i * 8) + 4, isLittleEndian);
    result.push(den === 0 ? 0 : num / den);
  }
  return result;
}
