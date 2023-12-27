import MiniReact from 'mini-react';

class About extends MiniReact.Component {
  render() {
    return MiniReact.CreateElement({
      tagName: 'div',
      props: {
        className: 'about'
      },
      children: [
        MiniReact.CreateElement({
          tagName: 'h1',
          props: {
            textContent: 'À propos de Nous'
          }
        }),
        MiniReact.CreateElement({
          tagName: 'p',
          props: {
            textContent: 'Informations sur notre entreprise, notre mission et nos valeurs.'
          }
        })
      ]
    });
  }
}
  
export default About;
  