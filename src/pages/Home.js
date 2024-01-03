import { Component, CreateElement } from 'mini-react';

import fetchData from '../utils/fetchData';

import Navbar from '../components/Navbar';
import Article from '../components/Article';
import Button from '../components/Button';
import CountdownOlympics from '../components/CountdownOlympics';
import Footer from '../components/Footer';




class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      loading: true,
      
    };
  }

  async componentDidMount() {
    try {
      const data = await fetchData("/data/dataJo.json");
      const { locations } = data;
      const closestFiveActivities = this.calculateClosestActivities(locations);
  
      this.setState(() => ({ locations, loading: false, closestFiveActivities }));
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      this.setState(() => ({ loading: false }));
    }
  }

  calculateClosestActivities(locations) {
    const currentDate = new Date();
    const closestActivities = [];

    locations.forEach(location => {
      location.disciplines.forEach(discipline => {
        discipline.events.forEach(event => {
          const eventDate = new Date(event.date);
          const timeDiff = Math.abs(eventDate - currentDate);

          if (eventDate > currentDate) {
            closestActivities.push({
              discipline: discipline.name,
              eventDate: event.date,
              timeDiff: timeDiff,
              activities: event?.sessions[0]?.activities
            });
          }
        });
      });
    });
 
    closestActivities.sort((a, b) => a.timeDiff - b.timeDiff);
    const closestFiveActivities = closestActivities.slice(0, 5);
    return closestFiveActivities;
  }
  render() {
    const { locations } = this.state;
    const closestFiveActivities = this.calculateClosestActivities(locations);
    return CreateElement({
      tagName: 'div',
      props: {
        className: 'home',
      },
      children: [
        CreateElement({ componentClass: Navbar }),
        CreateElement({
          tagName: 'main',
          props: {
            className: 'main__home',
          },
          children: [
            CreateElement({
              tagName: 'section',
              props: {
                id: 'section1',
              },
              children: [
                CreateElement({
                  tagName: 'div',
                  props: {
                    className: 'container',
                  },
                  children: [
                    CreateElement({
                      tagName: 'div',
                      children: [
                        CreateElement({
                          tagName: 'div',
                          children: [
                            CreateElement({
                              tagName: 'h1',
                              props: {
                                textContent: 'Vivez les Jeux Olympiques',
                              },
                            }),
                            CreateElement({
                              tagName: 'h2',
                              props: {
                                textContent:
                                  'Explorez, découvrez, vibrez',
                              },
                            }),
                            CreateElement({
                              componentClass: Button,
                              props: {
                                to: '/about',
                                className: 'btn-event',
                                textContent: 'Explorer la Carte',
                              },
                            }),
                          ],
                        }),
                      ],
                    }),
                    CreateElement({
                      componentClass: CountdownOlympics,
                    })
                  ],
                }),
              ],
            }),
            CreateElement({
              tagName: 'section',
              props: {
                id: 'section2',
              },
              children: [
                CreateElement({
                  tagName: 'div',
                  props: {
                    className: 'container',
                  },
                  children: [
                    CreateElement({
                      tagName: 'h1',
                      props: {
                        textContent: 'Evenements à venir',
                      },
                    }),
                    CreateElement({
                      tagName: 'div',
                      children:[ 
                        ...closestFiveActivities.map(activity => {
                        return CreateElement({
                          componentClass: Article,
                          props: {
                            title: activity.discipline,
                            subtitle: activity.activities.join(', '),
                            src: '../imag1.webp',
                            imageAlt: 'Texte alternatif',
                          },
                        });
                      }),
                      CreateElement({
                        componentClass: Button,
                        props: {
                          to: '/about',
                          className: 'btn-event',
                          textContent: 'Voir tous les événements',
      
                          
                        },
                      }),
                    ]
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        CreateElement({ componentClass: Footer }),
      
      ],
    });
  }
}

export default Home;
