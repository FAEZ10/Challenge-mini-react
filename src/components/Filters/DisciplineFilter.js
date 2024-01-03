import MiniReact from 'mini-react';
import Select from '../Form/Select.js';
import '../../styles/components/_selectFilter.scss';


class DisciplineFilter extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDiscipline: '' };

    this.handleDisciplineChange = this.handleDisciplineChange.bind(this);
  }

  handleDisciplineChange(event) {
    const selectedDiscipline = event.target.value;
    this.setState({ selectedDiscipline });

    if (this.props.onDisciplineChange) {
      this.props.onDisciplineChange(selectedDiscipline);
    }
  }

  render() {

    const optionsWithPlaceholder = [
      { value: '', label: 'Choisissez une discipline' }, 
      ...this.props.options 
    ];
  
    return MiniReact.CreateElement({
      componentClass: Select,
      props: {
        options: optionsWithPlaceholder,
        onInput: this.handleDisciplineChange,
        value: this.state.selectedDiscipline,
        className: 'select-filter'
      }
    });
  }
}

export default DisciplineFilter;
