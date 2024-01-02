import calculateDistance from "./calculateDistance.js";

function calculateCenter(locations, userLocation, defaultCenter = { lat: 48.859, lng: 2.34 }) {
    let latSum = 0, lngSum = 0, count = 0;
  
    locations.forEach(location => {
      latSum += location.location.lat;
      lngSum += location.location.lng;
      count++;
    });
  
    if (userLocation) {
      latSum += userLocation.lat;
      lngSum += userLocation.lng;
      count++;
    }
  
    const centerLat = count > 0 ? latSum / count : defaultCenter.lat;
    const centerLng = count > 0 ? lngSum / count : defaultCenter.lng;
  
    return { lat: centerLat, lng: centerLng };
}

export default calculateCenter;
  