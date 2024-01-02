import { Component, CreateElement } from 'mini-react';

class Select extends Component {
  render() {
    return CreateElement({
      tagName: 'select',
      props: {
        ...this.props, 
        className: `select ${this.props.className || ''}`
      },
      children: this.props.options.map(option => 
        CreateElement({
          tagName: 'option',
          props: { value: option.value, textContent: option.label }
        })
      )
    });
  }
}

export default Select;
