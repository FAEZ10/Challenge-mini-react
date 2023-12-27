import Home from './pages/Home.js';
import About from './pages/About.js';
import { Route } from './components/Router/';

const routes = [
  new Route("/", Home),
  new Route("/about", About),
];

export default routes;
