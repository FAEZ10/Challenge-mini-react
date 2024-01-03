import { Component, CreateElement } from 'mini-react';
import Button from '../Button/Button.js';
import '../../styles/components/_spotDetail.scss';

class SpotDetail extends Component {

  openDirections = (userLocation, location) => {
    const travelMode = 'DRIVING'; // Vous pouvez changer cela en fonction du mode de déplacement souhaité
    const directionUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${location.lat},${location.lng}&travelmode=${travelMode}`;
    window.open(directionUrl, '_blank');
  }

  renderActivities(activities) {
    if (!activities) return null;
    return activities.map(activity => CreateElement({
      tagName: 'span',
      props: {
        textContent: activity,
        className: 'activity-badge'
      }
    }));
  }

  renderSessions(sessions) {
    if (!sessions) return null;

    return sessions.map(session => CreateElement({
      tagName: 'div',
      props: { className: 'session-detail' },
      children: [
        CreateElement({
          tagName: 'h4',
          props: {
            textContent: `${session.startTime} - ${session.endTime}`,
            className: 'session-time'
          }
        }),
        ...this.renderActivities(session.activities)
      ]
    }));
  }

  renderEvents(events) {
    if (!events) return null;
    return events.map(event => CreateElement({
      tagName: 'div',
      props: { className: 'event-item' },
      children: [
        CreateElement({
          tagName: 'h3',
          props: {
            textContent: event.name,
            className: 'event-name'
          }
        }),
        CreateElement({
          tagName: 'div',
          props: { className: 'session-container' },
          children: this.renderSessions(event.sessions)
        })
      ]
    }));
  }

  render() {
    const { spot, onClose } = this.props;
    const { name, images = [], description, disciplines, distance, location, userLocation } = spot;
    const events = disciplines.flatMap(discipline => discipline.events);

    const renderDistanceAndDirections = userLocation && distance ? CreateElement({
      tagName: 'div',
      props: { className: 'distance-and-directions' },
      children: [
        CreateElement({
          tagName: 'div',
          props: { textContent: `À ${distance.toFixed(2)} km de vous`, className: 'distance-info' },
        }),
        CreateElement({
          tagName: 'button',
          props: {
            className: 'directions-button',
            textContent: 'Itinéraire',
            onClick: () => this.openDirections(userLocation, location)
          },
         
        })
      ]
    }) : null;


    const imageElements = images.length > 1 ? images.map(image => CreateElement({
      tagName: 'div',
      props: { className: 'carousel-item' },
      children: [
        CreateElement({
          tagName: 'img',
          props: {
            src: image,
            alt: `Image de ${name}`,
            className: 'spot-detail-image'
          }
        })
      ]
    })) : [
      CreateElement({
        tagName: 'img',
        props: {
          src: images[0],
          alt: `Image de ${name}`,
          className: 'spot-detail-image'
        }
      })
    ];
  
    // Créez le conteneur du carrousel, qui inclura les éléments d'image ci-dessus.
    const imageCarousel = CreateElement({
      tagName: 'div',
      props: { className: 'carousel' },
      children: imageElements
    });

    return CreateElement({
      tagName: 'div',
      props: { className: 'spot-detail' },
      children: [
        CreateElement({
          componentClass: Button,
          props: {
            textContent: '×',
            className: 'close-button',
            onClick: onClose
          },
        }),
        CreateElement({
          tagName: 'h2',
          props: { textContent: name, className: 'spot-title' }
        }),
        imageCarousel,
        renderDistanceAndDirections,
        CreateElement({
          tagName: 'p',
          props: { textContent: description, className: 'spot-detail-description' }
        }),
        ...this.renderEvents(events)
      ]
    });
  }
}

export default SpotDetail;
