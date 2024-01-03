import { Component, CreateElement } from 'mini-react';
import { Link } from './Router';

class Article extends Component {
  render() {
    return CreateElement({
      tagName: 'div',
      
      tagName: 'article',
      props: {
        className: `events ${this.props.className || ''}`,
        ...this.props
      },
      children: [
        CreateElement({
          tagName: 'div',
          children: [
            CreateElement({
              tagName: 'img',
              props: {
                src: this.props.src || '',
                alt: this.props.imageAlt || '',
              }
            }),
          ],
        }),
        CreateElement({
          tagName: 'div',
          children: [
            CreateElement({
              tagName: 'h1',
              children: [
                CreateElement({
                  componentClass: Link,
                  props: {
                    to: this.props.link || '',
                    className: 'link-event',
                    textContent: this.props.title || '',
                  },
                }),
              ],
            }),
            CreateElement({
              tagName: 'P',
              props: {
                textContent: this.props.subtitle || '',
              }
            }),
          ],
        }),
      ],
    });
  }
}

export default Article;
