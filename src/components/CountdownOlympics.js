import { Component, CreateElement } from 'mini-react';

class CountdownOlympics extends Component {
  constructor(props) {
    super(props);

    // Date d'ouverture Jeux Olympiques (26 juillet 2024 à 20h24)
    const olympicsDate = new Date(2024, 6, 26, 20, 24, 0); 

    this.interval = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = olympicsDate.getTime() - currentDate.getTime();

      
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

     
      this.setState({
        days,
        hours,
        minutes,
        seconds,
      });

      
      if (timeDifference <= 0) {
        clearInterval(this.interval);
      }
    }, 1000); 
  }

  componentWillUnmount() {
    
    clearInterval(this.interval);
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;

    return CreateElement({
      tagName: 'div',
      props: {
        className: 'countdown',
      },
      children: [
        CreateElement({
            tagName: 'div',
            props:{
                className:'countdown__item',
                textContent:'Jusqu\'aux Jeux Olympiques de Paris 2024'
            },
        }),
        CreateElement({
          tagName: 'div',
          props: {
            className: 'countdown__jours',
          },
          children: [
            CreateElement({
              tagName: 'h3',
              props: {
                textContent: days,
              },
            }),
            CreateElement({
              tagName: 'p',
              props: {
                textContent: 'JOURS',
              },
            }),
          ],
        }),
        CreateElement({
          tagName: 'div',
          props: {
            className: 'countdown__heures',
          },
          children: [
            CreateElement({
              tagName: 'h3',
              props: {
                textContent: hours,
              },
            }),
            CreateElement({
              tagName: 'p',
              props: {
                textContent: 'HEURES',
              },
            }),
          ],
        }),
        CreateElement({
          tagName: 'div',
          props: {
            className: 'countdown__minutes',
          },
          children: [
            CreateElement({
              tagName: 'h3',
              props: {
                textContent: minutes,
              },
            }),
            CreateElement({
              tagName: 'p',
              props: {
                textContent: 'MINUTES',
              },
            }),
          ],
        }),
        CreateElement({
          tagName: 'div',
          props: {
            className: 'countdown__secondes',
          },
          children: [
            CreateElement({
              tagName: 'h3',
              props: {
                textContent: seconds,
              },
            }),
            CreateElement({
              tagName: 'p',
              props: {
                textContent: 'SECONDES',
              },
            }),
          ],
        }),
       
      ],
    });
  }
}

export default CountdownOlympics;
