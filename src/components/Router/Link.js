import { Component, CreateElement } from 'mini-react';

class Link extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    event.preventDefault();
    window.history.pushState({}, '', this.props.to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  
  render() {
    const { to, children, ...rest } = this.props;
    return CreateElement({
      tagName: 'a',
      props: {
        ...rest,
        href: to,
        onClick: this.handleClick
      },
      children: children
    });
  }
}

export default Link;
