import { Component, CreateElement } from 'mini-react';
import { Link } from './Router';

class Navbar extends Component {
  render() {
    return CreateElement({
      tagName: 'div',
      props: { className: 'navbar' },
      children: [
        CreateElement({
          tagName: 'img',
          props: { src: '/logo.webp', className: 'navbar-logo' }
        }),
        CreateElement({
          tagName: 'div',
          props: { className: 'nav-links' },
          children: [
            CreateElement({
              componentClass: Link,
              props: { to: '/', className: 'nav-link', textContent: 'Accueil' }
            }),
            CreateElement({
              componentClass: Link,
              props: { to: '/about', className: 'nav-link', textContent: 'À Propos' }
            }),
          ]
        })
      ]
    });
  }
}

export default Navbar;
