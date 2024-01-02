/* global google */
import { Component, CreateElement } from 'mini-react';
import settings from './mapStyle.js';
import calculateCenter from '../../utils/calculateCenter.js';
import calculateDistance from '../../utils/calculateDistance.js';
import '../../styles/components/_infoWindowContent.scss';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.markers = [];
    this.initMap = this.initMap.bind(this);
    this.addMarkersToMap = this.addMarkersToMap.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.openDirections = this.openDirections.bind(this);
  }

  componentDidMount() {
    if (window.google) {
      this.initMap();
    } else {
      window.initMap = this.initMap;
      this.loadGoogleMapsScript();
    }
  }

  adjustZoomToMarkers(locations, userLocation) {
    const bounds = new google.maps.LatLngBounds();
    locations.forEach(location => {
      bounds.extend(new google.maps.LatLng(location.location.lat, location.location.lng));
    });
    if (userLocation) {
      bounds.extend(new google.maps.LatLng(userLocation.lat, userLocation.lng));
    }
    this.map.fitBounds(bounds);
  }

  filterLocationsWithinRadius(locations, userLocation, radiusKm) {
    if (!userLocation) return locations;
  
    return locations.filter(location => {
      const distance = calculateDistance(userLocation, location.location);
      return distance  <= radiusKm * 1000;
    });
  }

  componentDidUpdate(prevProps) {
    let shouldRecenter = false;
    const radiusKm = 30; 
  
    let nearbyLocations;
  
    if (this.props.locations !== prevProps.locations || this.props.userLocation !== prevProps.userLocation) {
      nearbyLocations = this.filterLocationsWithinRadius(this.props.locations, this.props.userLocation, radiusKm);
      this.clearMarkers();
      this.addMarkersToMap(nearbyLocations);
      this.addUserMarker(this.props.userLocation);
      shouldRecenter = true;
    }
  
    if (shouldRecenter && this.map && nearbyLocations) {
      const newCenter = calculateCenter(nearbyLocations, this.props.userLocation);
      this.map.setCenter(new google.maps.LatLng(newCenter.lat, newCenter.lng));
    }

    if (shouldRecenter) {
      this.adjustZoomToMarkers(nearbyLocations, this.props.userLocation);
    }
  
  }
  
  loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;;
    script.async = true;
    document.head.appendChild(script);
  }

  async initMap() {
    await new Promise(resolve => setTimeout(resolve, 0));
    const mapElement = document.getElementById(this.props.id);
    const radiusKm = 30; 
    const nearbyLocations = this.filterLocationsWithinRadius(this.props.locations, this.props.userLocation, radiusKm);
    const center = calculateCenter(nearbyLocations, this.props.userLocation);
  
    this.map = new google.maps.Map(mapElement, {
      center: { lat: center.lat, lng: center.lng },
      zoom: 11,
      styles: settings
    });
  
    if (this.props.userLocation) {
      this.addUserMarker(this.props.userLocation);
    }
  
    this.addMarkersToMap(nearbyLocations);
    this.adjustZoomToMarkers(this.props.locations, this.props.userLocation);
  }
  

  addUserMarker(userLocation) {
    if (!userLocation) return;

    const userMarker = new google.maps.Marker({
      position: userLocation,
      map: this.map,
      icon: {
        url: '/images/markers/CFR-4.png', 
        scaledSize: new google.maps.Size(30, 30) 
      },
      title: 'Votre position'
    });
  }
  

  addMarkersToMap(locations) {
    this.clearMarkers();

    locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: location.location,
        map: this.map,
        icon: {
          url: '/images/markers/CFR-1.png',
          scaledSize: new google.maps.Size(30, 30)
        },
        title: location.name
      });

      let imagesHTML = location.images.map(img => `
      <div class="info-window-image-container">
        <img src="${img}" alt="${location.name}" class="info-window-image">
      </div>
    `).join('');
      let discplinesHTML = location.disciplines.map(discipline => `<span class="info-window-discipline">${discipline.name}</span>`).join(', ');

      const infoWindowContent = `
      <div class="info-window-content">
        <h3 class="info-window-title">${location.name}</h3>
        <div class="info-window-body">
            <div class="info-window-carousel">
                ${imagesHTML}
            </div>
          <div class="info-window-details">
            <div class="info-window-disciplines">
              <h5>Sports</h5>
              <p class="disciplines" >${discplinesHTML}</p>
            </div>
            <div class="info-window-description">
              <h5>Description</h5>
              <p>${location.description}</p>
            </div>
          </div>
          <div class="info-window-button-container">
              <button class="info-window-button" id="direction-btn-${location.id}">Itinéraire</button>
          </div>
        </div>
      </div>`;

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          document.getElementById(`direction-btn-${location.id}`).addEventListener('click', () => {
            this.openDirections(location.location.lat, location.location.lng);
          });
        });
      });

      this.markers.push(marker);
    });
  }

  openDirections(lat, lng) {
    const userLocation = this.props.userLocation;
    const travelMode = 'DRIVING'; 
    const directionUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=${travelMode}`;
    window.open(directionUrl, '_blank');
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  render() {
    return CreateElement({
      tagName: 'div',
      props: { id: this.props.id, style: { width: '100%', height: '100%' } }
    });
  }
}

export default MapContainer;
