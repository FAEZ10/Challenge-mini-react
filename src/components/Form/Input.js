import { Component, CreateElement } from 'mini-react';

class Input extends Component {
  render() {
    return CreateElement({
      tagName: 'input',
      props: {
        ...this.props, 
        className: `input ${this.props.className || ''}`
      }
    });
  }
}

export default Input;
