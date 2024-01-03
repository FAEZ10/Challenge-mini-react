import { Component, CreateElement } from 'mini-react';
import '../../styles/components/_datePicker.scss';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: '' };

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(event) {
    const selectedDate = event.target.value;
    this.setState({ selectedDate });

    if (this.props.onDateChange) {
      this.props.onDateChange(selectedDate);
    }
  }

  render() {
    return CreateElement({
      tagName: 'input',
      props: {
        type: 'date',
        value: this.state.selectedDate,
        onInput: this.handleDateChange,
        className: `date-picker ${this.props.className || ''}`
      }
    });
  }
}

export default DatePicker;
