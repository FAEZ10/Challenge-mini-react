import MiniReact from 'mini-react';

class Home extends MiniReact.Component {
  render() {

    return MiniReact.CreateElement({
      tagName: 'div',
      props: {
        className: 'home'
      },
      children: [
        MiniReact.CreateElement({
          tagName: 'h1',
          props: {
            textContent: 'Bienvenue sur la page d\'accueil'
          }
        }),
        
        MiniReact.CreateElement({
          tagName: 'p',
          props: {
            textContent: 'Ceci est la page d\'accueil de notre application.'
          }
        }),

      ]
    });
  }
}
  
export default Home;
