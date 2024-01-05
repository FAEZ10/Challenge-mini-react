import Home from './pages/Home.js';
import NotFound from './pages/NotFound.js';
import { Route } from './components/Router/';
import Carte from './pages/Carte.js';
import Evenements from './pages/Evenements.js';

const routes = [
  new Route("/", Home),
  new Route("/not-found", NotFound),
  new Route("/carte", Carte),
  new Route("/evenements", Evenements),

];

export default routes;
