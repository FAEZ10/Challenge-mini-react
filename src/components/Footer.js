import { Component, CreateElement } from 'mini-react';
import { Link } from './Router';
class Footer extends Component {
  render() {
    return CreateElement({
      tagName: 'footer',
      children: [
        CreateElement({
          tagName: 'div',
          props: {
            className: 'container',
          },
          children: [
            CreateElement({
              tagName: 'nav',
              children: [
                CreateElement({
                  tagName: 'ul',
                  children: [
                    CreateElement({
                      tagName: 'li',
                      children: [
                        CreateElement({
                            componentClass: Link,
                            props: {
                              to: '#',
                              textContent:'Légal'
                            },
                          
                        }),
                      ],
                    }),
                    CreateElement({
                      tagName: 'li',
                      children: [
                        CreateElement({
                            componentClass: Link,
                            props: {
                              to: '#',
                              textContent:'Cookies'
                            },
                          
                        }),
                      ],
                    }),
                    CreateElement({
                      tagName: 'li',
                      children: [
                        CreateElement({
                            componentClass: Link,
                            props: {
                              to: '#',
                              textContent:'À propos des pubs'
                            },
                         
                        }),
                      ],
                    }),
                  ],
                }),
                CreateElement({
                  tagName: 'small',
                  props: {
                    textContent: '© 2024  All rights reserved.',
                  },
                
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }
}

export default Footer;
