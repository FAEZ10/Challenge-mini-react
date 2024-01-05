import { Component, CreateElement } from 'mini-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ListEvents from '../containers/ListingEvents.js';

class Evenements extends Component{
     render(){
        return CreateElement({
            tagName: 'div',

            children: [
                CreateElement({
                    componentClass: Navbar,
                }),
                CreateElement({
                    componentClass: ListEvents,
                }),
                CreateElement({
                    componentClass: Footer,
                }),

            ]
        })

    }   
     
}

export default Evenements;

