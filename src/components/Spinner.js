import { Component, CreateElement } from 'mini-react';
import '../styles/components/_spinner.scss';

class Spinner extends Component {
  render() {
    return CreateElement({
        tagName: "div",
        props: { className: "loader" },
        children: [
          CreateElement({
            tagName: "div",
            props: { className: "spinner" },
          }),
        ],
      });
  }
}

export default Spinner;