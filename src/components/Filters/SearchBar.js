import { Component, CreateElement } from 'mini-react';
import Input from '../Form/Input';
import Button from '../Button/Button';
import '../../styles/components/_searchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    const value = event.target.value;
    this.setState({ query: value });
    
    if (this.props.onSearchChange) {
      this.props.onSearchChange(value);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.onSearch) {
      this.props.onSearch(this.state.query);
    }
  }

  render() {
    const inputElement = CreateElement({
      componentClass: Input,
      props: {
        type: 'text',
        placeholder: 'Rechercher par activité ou discipline...',
        value: this.state.query,
        onInput: this.handleInput,
        className: 'search-input'
      }
    });

    const buttonElement = this.props.showButton !== false ? CreateElement({
      componentClass: Button,
      props: {
        type: 'submit',
        textContent: 'Rechercher',
        className: 'search-button'
      }
    }) : null;

    return CreateElement({
      tagName: 'form', 
      props: {
        onSubmit: this.handleSubmit,
        className: 'search-bar'
      },
      children: [inputElement, buttonElement].filter(Boolean) 
    });    
  }
}

export default SearchBar;
