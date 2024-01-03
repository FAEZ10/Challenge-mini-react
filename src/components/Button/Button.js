import { Component, CreateElement } from 'mini-react';

class Button extends Component {
  render() {
    const { textContent, className, ...rest } = this.props;

    return CreateElement({
      tagName: 'button',
      props: {
        ...rest, 
        className: `button ${className || ''}`,
        textContent: textContent
      },
     
    });
  }
}


export default Button;
