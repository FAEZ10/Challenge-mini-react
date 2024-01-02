import { Component, CreateElement } from "mini-react";
import MapContainer from "../components/Map/MapContainer.js";
import SpotCard from "../components/Spot/SpotCard.js";
import DatePicker from "../components/Filters/DatePicker.js";
import ProximityFilter from "../components/Filters/ProximityFilter.js";
import SearchBar from "../components/Filters/SearchBar.js";
import fetchData from "../utils/fetchData.js";
import Spinner from "../components/Spinner.js";
import {calculateDistance, isWithinDistance} from "../utils/index.js";
import SpotDetail from "../components/Spot/SpotDetail.js";
import "../styles/containers/ExplorerEvent.scss";

class ExplorerEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      selectedDate: null,
      selectedDistance: null,
      searchTerm: null,
      userLocation: null,
      selectedSpot: null,
      loading: true,
      showModal: false,
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.selectSpot = this.selectSpot.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    try {
      const data = await fetchData("/data/dataJo.json");
      this.setState(() => ({ locations: data.locations, loading: false }));
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
            loading: false,
          }));
        },
        (error) => {
          console.error(
            "Erreur lors de l'obtention de la géolocalisation :",
            error
          );
          this.setState(() => ({ loading: false }));
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas prise en charge par ce navigateur."
      );
      this.setState(() => ({ loading: false }));
    }
  }

  handleDateChange(selectedDate) {
    this.setState(() => ({ selectedDate }));
  }

  handleDistanceChange(selectedDistance) {
    this.setState(() => ({ selectedDistance }));
  }

  handleSearchChange(searchTerm) {
    this.setState(() => ({ searchTerm }));
  }

  selectSpot(spot) {
    this.setState(() => ({ selectedSpot: spot, showModal: true }));
  }

  closeModal() {
    this.setState(() => ({ showModal: false }));
  }

  filterLocations(
    locations,
    selectedDate,
    selectedDistance,
    searchTerm,
    userLocation
  ) {
    return locations.filter((location) => {
      if (selectedDate && !this.eventOnSelectedDate(location, selectedDate)) {
        return false;
      }
      if (
        selectedDistance &&
        userLocation &&
        !isWithinDistance(
          userLocation,
          location.location,
          selectedDistance
        )
      ) {
        return false;
      }
      if (searchTerm && !this.matchesSearchTerm(location, searchTerm)) {
        return false;
      }
      return true;
    });
  }

  eventOnSelectedDate(location, selectedDate) {
    return location.disciplines.some((discipline) =>
      discipline.events.some((event) => event.date === selectedDate)
    );
  }

  matchesSearchTerm(location, searchTerm) {
    return location.disciplines.some(
      (discipline) =>
        discipline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discipline.events.some((event) =>
          event.sessions.some((session) =>
            session.activities.some((activity) =>
              activity.toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
        )
    );
  }


  getSpotsFromLocations(filteredLocations) {
    if (!filteredLocations) return [];
    return filteredLocations
      .flatMap((location) => {
        return (
          location.spots.map((spot) => {
            const distance = this.state.userLocation
              ? calculateDistance(this.state.userLocation, spot.location) / 1000
              : null;
            const disciplines = location.disciplines.filter((discipline) =>
              spot.disciplines.includes(discipline.name)
            );
            return {
              ...spot,
              distance,
              disciplines,
              userLocation: this.state.userLocation ?? null,
            };
          }) || []
        );
      })
      .sort((a, b) => a.distance - b.distance);
  }


  render() {
    
    const {
      locations,
      selectedDate,
      selectedDistance,
      searchTerm,
      userLocation,
      loading,
      showModal,
      selectedSpot,
    } = this.state;

    const filteredLocations = this.filterLocations(
      locations,
      selectedDate,
      selectedDistance,
      searchTerm,
      userLocation
    );

    const filteredSpots = this.getSpotsFromLocations(filteredLocations);

    const proximityMessage = userLocation
      ? CreateElement({
          tagName: "div",
          props: {
            textContent: "Trié par proximité",
            className: "proximity-message",
          },
        })
      : null;

    const modal = showModal
      ? CreateElement({
          tagName: "div",
          props: { className: "modal-backdrop" },
          children: [
            CreateElement({
              componentClass: SpotDetail,
              props: {
                spot: selectedSpot,
                onClose: this.closeModal,
              },
            }),
          ],
        })
      : null;

    const filterSection = CreateElement({
      tagName: "div",
      props: { className: "filters" },
      children: [
        CreateElement({
          tagName: "div",
          props: { className: "search-bar-container" },
          children: [
            CreateElement({
              componentClass: SearchBar,
              props: {
                onSearchChange: this.handleSearchChange,
                showButton: false,
              },
            }),
          ],
        }),
        CreateElement({
          tagName: "div",
          props: { className: "other-filters" },
          children: [
            CreateElement({
              componentClass: ProximityFilter,
              props: { onDistanceChange: this.handleDistanceChange},
            }),
            CreateElement({
              componentClass: DatePicker,
              props: { onDateChange: this.handleDateChange},
            }),
          ],
        }),
      ],
    });

    const renderSpots = CreateElement({
      tagName: "div",
      props: { className: "spots-list" },
      children: [
        proximityMessage,
        ...filteredSpots.map((spot) => {
          const disciplinesForSpot = spot.disciplines.map((discipline) => {
            const name = discipline.name;
            const dateEvents = discipline.events
              .map((event) => {
                const date = new Date(event.date);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                return `${day}/${month}/${year}`;
              })
              .join(", ");
            return { name, dateEvents };
          });

          return CreateElement({
            componentClass: SpotCard,
            props: {
              key: spot.name,
              name: spot.name,
              image: spot.images[0],
              description: spot.description,
              discplines: disciplinesForSpot,
              distance: spot.distance,
              onClick: () => this.selectSpot(spot),
            },
          });
        }),
      ],
    });

    const noResultsMessage =
      filteredSpots.length === 0
        ? CreateElement({
            tagName: "div",
            props: {
              textContent: "Aucun résultat trouvé.",
              className: "no-results-message",
            },
          })
        : null;

    const spotsList = loading
      ? CreateElement({componentClass: Spinner})
      : filteredSpots.length > 0
      ? renderSpots
      : noResultsMessage;

    const filtersAndSpots = CreateElement({
      tagName: "div",
      props: { className: "filters-and-spots" },
      children: [filterSection, spotsList],
    });

    const mapSection = CreateElement({
      tagName: "div",
      props: { className: "map-container" },
      children: [
        CreateElement({
          componentClass: MapContainer,
          props: {
            id: "mapId",
            locations: filteredLocations,
            userLocation: userLocation,
          },
        }),
      ],
    });

    return CreateElement({
      tagName: "div",
      props: { className: "olympic-event-dashboard" },
      children: [filtersAndSpots, mapSection, modal],
    });
  }
}

export default ExplorerEvent;
