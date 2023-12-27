import {CreateElement} from 'mini-react';
import MiniReactDOM from 'mini-react-dom';
import {BrowserRouter} from './components/Router/';
import routes from './routes'; 

const App = CreateElement({
  componentClass: BrowserRouter,
  props: { routes },
});

MiniReactDOM.render(App, document.getElementById('root'));
