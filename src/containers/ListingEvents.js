import { Component, CreateElement } from 'mini-react';
import CarrouselImage from '../components/ListingEvents/Carrouselmage.js';
import FiltersEvents from '../components/ListingEvents/FiltersEvents.js';
import ListEvents from '../components/ListingEvents/ListEvents.js';
import fetchData from '../utils/fetchData.js';
import Spinner from '../components/Spinner.js'; 
import "../styles/containers/ListingEvents.scss";

class ListingEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            filteredLocations: [],
            searchTerm: '',
            selectedDate: '',
            selectedDiscipline: '',
            userLocation: null,
            loading: true,
        };
    }

    async componentDidMount() {
        try {
            const data = await fetchData("/data/dataJo.json");
            this.setState(() => ({ locations: data.locations, filteredLocations: data.locations, loading: false }));
            this.initializeGeoLocation();
        } catch (error) {
            console.error("Erreur lors du chargement des données:", error);
            this.setState(() => ({ loading: false }));
        }
    }

    initializeGeoLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState(() => ({
                userLocation: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              }));
            },
            (error) => {
              console.error(
                "Erreur lors de l'obtention de la géolocalisation :",
                error
              );
            }
          );
        } else {
          console.error(
            "La géolocalisation n'est pas prise en charge par ce navigateur."
          );
        }
      }
    

    handleSearchChange = (searchTerm) => {
        this.applyFilters(searchTerm, this.state.selectedDate, this.state.selectedDiscipline);
    };

    handleDateChange = (selectedDate) => {
        this.applyFilters(this.state.searchTerm, selectedDate, this.state.selectedDiscipline);
    };

    handleDisciplineChange = (selectedDiscipline) => {
        this.applyFilters(this.state.searchTerm, this.state.selectedDate, selectedDiscipline);
    };

    applyFilters(searchTerm, selectedDate, selectedDiscipline) {
        const filtered = this.state.locations.filter(location => {
            return location.disciplines.some(discipline => 
                (selectedDiscipline ? discipline.name === selectedDiscipline : true) &&
                (searchTerm ? discipline.name.toLowerCase().includes(searchTerm.toLowerCase()) : true) && 
                discipline.events.some(event => 
                    (selectedDate ? event.date === selectedDate : true) &&
                    event.sessions.some(session => 
                        session.activities.some(activity => 
                            (searchTerm ? activity.toLowerCase().includes(searchTerm.toLowerCase()) : true)
                        )
                    )
                )
            );
        });
        this.setState(() => ({ 
            filteredLocations: filtered,
            searchTerm: searchTerm,
            selectedDate: selectedDate,
            selectedDiscipline: selectedDiscipline
        }));
    }

    render() {
        const { filteredLocations, loading, userLocation } = this.state;

        const carouselImages = [
            "./images/sports/img1.jpg",
            "./images/sports/img2.jpg",
            "./images/sports/img3.jpg",
            "./images/sports/img5.jpg"
        ];

        const disciplineOptions = this.state.locations
        .flatMap(location => location.disciplines)
        .map(discipline => ({ label: discipline.name, value: discipline.name }))
        .reduce((unique, option) => {
            if (!unique.some(obj => obj.value === option.value)) {
                unique.push(option);
            }
            return unique;
        }, []);
    
        return CreateElement({
            tagName: 'div',
            props: { className: 'listing-evenements' },
            children: [
              CreateElement({
                tagName: 'div',
                props: { className: 'carousel-container' },
                children: [
                  CreateElement({ 
                    componentClass: CarrouselImage, 
                    props: { images: carouselImages } 
                  })
                ]
              }),
              CreateElement({
                tagName: 'div',
                props: { className: 'filters-and-list-container' },
                children: [
                  CreateElement({
                    tagName: 'div',
                    props: { className: 'filters-container' },
                    children: [
                      CreateElement({ 
                        componentClass: FiltersEvents, 
                        props: {
                          onSearchChange: this.handleSearchChange,
                          onDateChange: this.handleDateChange,
                          onDisciplineChange: this.handleDisciplineChange,
                          disciplineOptions: disciplineOptions
                        } 
                      })
                    ]
                  }),
                  loading ? 
                  CreateElement({ componentClass: Spinner }) : 
                  CreateElement({
                    tagName: 'div',
                    props: { className: 'events-container' },
                    children: [
                      CreateElement({ 
                        componentClass: ListEvents, 
                        props: { locations: filteredLocations, userLocation: userLocation } 
                      })
                    ]
                  })
                ]
              })
            ]
          });
        }
}

export default ListingEvents;
