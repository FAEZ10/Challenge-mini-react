import { Component, CreateElement } from 'mini-react';

class Image extends Component {
  render() {
    return CreateElement({
      tagName: 'img',
      props: {
        src: this.props.src, 
        alt: this.props.alt || '',
        className: `image ${this.props.className || ''}`,
        ...this.props 
      }
    });
  }
}

export default Image;
