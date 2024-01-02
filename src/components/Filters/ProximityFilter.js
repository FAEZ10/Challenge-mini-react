import MiniReact from 'mini-react';
import Select from '../Form/Select.js';
import '../../styles/components/_proximityFilter.scss';

class ProximityFilter extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDistance: '' };

    this.handleDistanceChange = this.handleDistanceChange.bind(this);
  }

  handleDistanceChange(event) {
    const selectedDistance = event.target.value;
    this.setState({ selectedDistance });

    if (this.props.onDistanceChange) {
      this.props.onDistanceChange(selectedDistance);
    }
  }

  render() {
    const distanceOptions = [
      { value: '', label: 'Distance' },
      { value: '2', label: 'Moins de 2 km' },
      { value: '4', label: 'Moins de 4 km' },
      { value: '6', label: 'Moins de 6 km' },
      { value: '10', label: 'Moins de 10 km' },
      { value: '20', label: 'Moins de 20 km' },
      { value: '30', label: 'Moins de 30 km' },
      { value: '40', label: 'Moins de 40 km' },
      { value: '50', label: 'Moins de 50 km' },

    ];

    return MiniReact.CreateElement({
      componentClass: Select,
      props: {
        options: distanceOptions,
        onInput: this.handleDistanceChange,
        value: this.state.selectedDistance,
        className: 'proximity-filter'
      }
    });
  }
}

export default ProximityFilter;
