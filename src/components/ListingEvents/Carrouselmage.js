import { Component, CreateElement } from 'mini-react';

class CarrouselImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0
    };

    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.nextImage, 3000); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  nextImage() {
    this.setState(prevState => ({
      currentImageIndex: (prevState.currentImageIndex + 1) % this.props.images.length
    }));
  }

  previousImage() {
    this.setState(prevState => ({
      currentImageIndex: (prevState.currentImageIndex - 1 + this.props.images.length) % this.props.images.length
    }));
  }

  render() {
    const { images } = this.props;
    const { currentImageIndex } = this.state;

    return CreateElement({
      tagName: 'div',
      props: { className: 'carousel' },
      children: [
        CreateElement({
          tagName: 'button',
          props: { textContent: '<', className: 'carousel-control prev', onClick: this.previousImage },
         
        }),
        CreateElement({
          tagName: 'img',
          props: { 
            src: images[currentImageIndex], 
            alt: `Image ${currentImageIndex}`, 
            className: `carousel-image ${currentImageIndex === this.state.currentImageIndex ? 'active' : ''}`
          }
        }),
        CreateElement({
          tagName: 'button',
          props: { textContent: '>', className: 'carousel-control next', onClick: this.nextImage },
      
        })
      ]
    });
  }
}

export default CarrouselImage;
