import { Component, CreateElement } from 'mini-react';
import { Link } from './Router';

class Button extends Component {
  render() {
    return CreateElement({
      tagName: 'button',
      props: {
        id: this.props.id || '',
        className: `button ${this.props.className || ''}`,
      },
      children: [
        CreateElement({
          componentClass: Link,
          props: {
            to: this.props.to || '/',
            className: 'btn-events',
            textContent: this.props.textContent || 'Default Text'
          },
          
        })
      ],
    });
  }
}

export default Button;
