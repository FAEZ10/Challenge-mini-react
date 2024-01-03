import { Component, CreateElement } from 'mini-react';
import calculateDistance from '../../utils/calculateDistance.js';

class ListEvents extends Component {
    constructor(props) {
        super(props);
    }

    renderEventItem(event, disciplineName, locationName, distance) {
        const dateFormatted = new Date(event.date).toLocaleDateString("fr-FR", {
            weekday: "long", day: "numeric", month: "long"
        });
        const distanceDisplay = distance !== null ? `${distance.toFixed(1)} km` : 'Distance non disponible';

        const sessionElements = event.sessions.map(session => 
            CreateElement({
                tagName: "div",
                props: { className: "session-container" },
                children: [
                    CreateElement({
                        tagName: "div",
                        props: { className: "session-time-location" },
                        children: [
                            CreateElement({
                                tagName: "span",
                                props: { textContent: `${session.startTime} - ${session.endTime}`, className: "session-time" }
                            }),
                            CreateElement({
                                tagName: "div",
                                props: { className: "location-info" },
                                children: [
                                    CreateElement({
                                        tagName: "img",
                                        props: { src: "./images/components/distance1.svg", alt: "Location", className: "location-icon" }
                                    }),
                                    CreateElement({
                                        tagName: "span",
                                        props: { textContent: `${locationName} - ${distanceDisplay}`, className: "location-text" }
                                    })
                                ]
                            })
                        ]
                    }),
                    CreateElement({
                        tagName: "div",
                        props: { className: "activities-container" },
                        children: session.activities.map(activity => 
                            CreateElement({
                                tagName: "span",
                                props: { textContent: activity, className: "activity-info" }
                            })
                        )
                    })
                ]
            })
        );

        return CreateElement({
            tagName: "div",
            props: { className: "event-item" },
            children: [
                CreateElement({ tagName: "h3", props: { textContent: disciplineName, className: "event-title" } }),
                CreateElement({ tagName: "div", props: { className: "event-date" }, children: [CreateElement({ tagName: "span", props: { textContent: dateFormatted, className: "event-date-info" } })] }),
                ...sessionElements
            ]
        });
    }

    render() {
        const { locations, userLocation } = this.props;
        const eventsList = locations.flatMap(location => { 
            const distance = userLocation ? calculateDistance(location.location, userLocation) / 1000 : null;
            return location.disciplines.flatMap(discipline => 
                discipline.events.map(event => this.renderEventItem(event, discipline.name, location.name, distance))
            );
        });

        return CreateElement({
            tagName: "div",
            props: { className: "events-list" },
            children: eventsList
        });
    }
}

export default ListEvents;
