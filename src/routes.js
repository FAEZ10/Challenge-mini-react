import Home from './pages/Home.js';
import About from './pages/About.js';
import NotFound from './pages/NotFound.js';
import { Route } from './components/Router/';
import ExplorerEvent from './containers/ExplorerEvent.js';
import ListingEvents from './containers/ListingEvents.js';


const routes = [
  new Route("/", Home),
  new Route("/about", About),
  new Route("/dashboard", ExplorerEvent),
  new Route("/not-found", NotFound),
  new Route("/listing", ListingEvents),
];

export default routes;
