import { Component, CreateElement } from 'mini-react';

class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: window.location.pathname,
      componentInstances: {}
    };

    this.handleUrlChange = this.handleUrlChange.bind(this);
    window.addEventListener('popstate', this.handleUrlChange); 
    this.initializeComponentInstances(props.routes);
  }

  initializeComponentInstances(routes) {
    routes.forEach(route => {
      if (!this.state.componentInstances[route.path]) {
        const instance = new route.component();
        instance.componentDidMount();
        this.state.componentInstances[route.path] = instance;
      }
    });
  }

  handleUrlChange() {
    const newPath = window.location.pathname;
    const matchingRoute = this.props.routes.find(route => route.path === newPath);

    if (!matchingRoute) {
      window.history.pushState({}, '', '/');
      this.setState({ currentPath: '/' });
    } else {
      const prevInstance = this.state.componentInstances[this.state.currentPath];
      if (prevInstance && prevInstance.componentWillUnmount) {
        prevInstance.componentWillUnmount();
      }
      this.setState({ currentPath: newPath });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handleUrlChange); 
  }

  render() {
    const { currentPath, componentInstances } = this.state;
    const componentInstance = componentInstances[currentPath] || componentInstances['/'];
    return CreateElement({ componentClass: componentInstance.constructor, props: { ...componentInstance.props } });
  }
}

export default BrowserRouter;
