import { Component, CreateElement } from 'mini-react';

class Button extends Component {
  render() {
    return CreateElement({
      tagName: 'button',
      props: {
        ...this.props, 
        className: `button ${this.props.className || ''}`
      },
      children: this.props.textContent
    });
  }
}

export default Button;
