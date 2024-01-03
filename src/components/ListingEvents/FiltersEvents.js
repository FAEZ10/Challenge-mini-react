import { Component, CreateElement } from "mini-react";
import SearchBar from "../Filters/SearchBar";
import DatePicker from "../Filters/DatePicker";
import DisciplineFilter from "../Filters/DisciplineFilter";

class FiltersEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      selectedDate: "",
      selectedDiscipline: "",
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDisciplineChange = this.handleDisciplineChange.bind(this);
  }

  handleSearchChange(value) {
    this.setState(() => ({ searchTerm: value }));
    if (this.props.onSearchChange) {
      this.props.onSearchChange(value);
    }
  }

  handleDateChange(value) {
    this.setState(() => ({ selectedDate: value }));
    if (this.props.onDateChange) {
      this.props.onDateChange(value);
    }
  }

  handleDisciplineChange(value) {
    this.setState(() => ({ selectedDiscipline: value }));
    if (this.props.onDisciplineChange) {
      this.props.onDisciplineChange(value);
    }
  }

  render() {
    return CreateElement({
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
              componentClass: DatePicker,
              props: { onDateChange: this.handleDateChange },
            }),
            CreateElement({
              componentClass: DisciplineFilter,
              props: {
                options: this.props.disciplineOptions,
                onDisciplineChange: this.handleDisciplineChange,
              },
            }),
          ],
        }),
      ],
    });
  }
}

export default FiltersEvents;
