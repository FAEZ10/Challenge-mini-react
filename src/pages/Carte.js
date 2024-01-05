import { Component, CreateElement } from 'mini-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExplorerEvent from '../containers/ExplorerEvent.js';

class Carte extends Component{
     render(){
        return CreateElement({
            tagName: 'div',
            props: {
                className: 'carte'
            },
            children: [
                CreateElement({
                    componentClass: Navbar,
                }),
                CreateElement({
                    componentClass: ExplorerEvent,
                }),
                CreateElement({
                    componentClass: Footer,
                }),
            ]
        })

    }   
     
}
export default Carte;
