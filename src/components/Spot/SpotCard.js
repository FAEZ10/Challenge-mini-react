import { Component, CreateElement } from 'mini-react';
import '../../styles/components/_spotCard.scss';


class SpotCard extends Component {
  render() {
    const { name, image, description, onClick, discplines, distance } = this.props;

    const distanceElement = distance ? CreateElement({
      tagName: 'p',
      props: { textContent: `À ${distance.toFixed(2)} km de vous`, className: 'spot-distance' },
    }) : null;

    const renderDisciplines = discplines.map(discipline => {
      const dateBadges = discipline.dateEvents.split(', ').map(date => 
        CreateElement({
          tagName: 'span',
          props: { className: 'date-badge', textContent: date }
        })
      );

      return CreateElement({
        tagName: 'li',
        props: { className: 'spot-discipline' },
        children: [
          CreateElement({
            tagName: 'span',
            props: { textContent: discipline.name, className: 'discipline-name' }
          }),
          ...dateBadges,          
        ]
      });
    });



    return CreateElement({
      tagName: 'div',
      props: {
        className: 'spot-card',
        onClick: onClick 
      },
      children: [
        CreateElement({
          tagName: 'img',
          props: {
            src: image,
            alt: `Image de ${name}`,
            className: 'spot-image'
          }
        }),
        CreateElement({
          tagName: 'div',
          props: { className: 'spot-info' },
          children: [
            CreateElement({
              tagName: 'h3',
              props: { textContent: name, className: 'spot-name' }
            }),
            CreateElement({
              tagName: 'p',
              props: { textContent: description, className: 'spot-description' }
            }),
            CreateElement({
              tagName: 'h6',
              props: { textContent: 'Sports', className: 'spot-name' }
            }),
            CreateElement({
              tagName: 'ul',
              props: { className: 'spot-disciplines' },
              children: renderDisciplines
            }),
            distanceElement,
          ]
        })
      ]
    });
  }
}

export default SpotCard;