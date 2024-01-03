import Home from './pages/Home.js';
import About from './pages/About.js';
import { Route } from './components/Router/';
import ExplorerEvent from './containers/ExplorerEvent.js';

const routes = [
  new Route("/", Home),
  new Route("/about", About),
  new Route("/explorer-events", ExplorerEvent)
];

export default routes;
