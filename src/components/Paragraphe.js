import { Component, CreateElement } from 'mini-react';

class Paragraphe extends Component {
  render() {
    return CreateElement({
      tagName: 'p',
      props: {
        ...this.props,
        className: `paragraphe ${this.props.className || ''}`,
        textContent: this.props.text
      }
    });
  }
}

export default Paragraphe;
