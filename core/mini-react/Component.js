import { addMessage } from 'mini-react-reconciler';
import { CLASS } from 'shared';

export default class Component {
  constructor(props) {
    this.props = props || {};
    this.state = this.state || {};

    this.componentDidMount = this.componentDidMount || (() => {});
    this.componentDidUpdate = this.componentDidUpdate || (() => {});
    this.componentWillUnmount = this.componentWillUnmount || (() => {});
  }

  setState(state, callback) {
    const newState = typeof state === 'function' ? state(this.state) : state;
    const message = {
      from: CLASS,
      instance: this,
      partialState: newState,
      callback: callback 
    };
    addMessage(message);
  }
}

