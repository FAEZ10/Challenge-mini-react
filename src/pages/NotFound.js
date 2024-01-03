import { Component, CreateElement } from 'mini-react';
import '../styles/pages/NotFound.scss';

class NotFound extends Component {
  render() {
    return CreateElement({
      tagName: 'div',
      props: { className: 'not-found' },
      children: [
        CreateElement({
          tagName: 'h1',
          props: { textContent: '404' }
        }),
        CreateElement({
          tagName: 'p',
          props: { textContent: 'Oups! La page que vous cherchez semble introuvable.' }
        }),
        CreateElement({
          tagName: 'a',
          props: { href: '/', textContent: 'Retour à l\'accueil', className: 'not-found-home-link' }
        })
      ]
    });
  }
}

export default NotFound;
