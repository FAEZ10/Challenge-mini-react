import { Component, CreateElement } from 'mini-react';
import { Link } from './Router';
import '../styles/components/_navbar.scss';
class Navbar extends Component {
  render() {
    return CreateElement({
      tagName: 'header',
      props: {
        className: 'Navbar'
      },
      children: [
            CreateElement({
               tagName: 'div',
                props: {
                  className: 'container'
                },
                children:[
                  CreateElement({
                     componentClass: Link,
                     props: {
                       to: '/',
                       id: 'logo-link',
                       
                     },
                      children:[
                        CreateElement({
                                    tagName: 'img',
                                    props: { src: '/paris2024_logo_v2.gif', className: 'navbar-logo' }
                                 }),
                      ]

                  }),
                  CreateElement({
                    tagName: 'nav',
                    props: {
                      id: 'site-nav'
                    },
                    children: [
                      CreateElement({
                        tagName: 'ul',
                        children: [
                          CreateElement({
                            tagName: 'li',
                            children: [
                              CreateElement({
                                componentClass: Link,
                                props: {
                                  to: '/',
                                  className: 'nav-link',
                                  textContent: 'Accueil'
                                }
                              })
                            ]
                          }),
                          CreateElement({
                            tagName: 'li',
                            children: [
                              CreateElement({
                                componentClass: Link,
                                props: {
                                  to: '/about',
                                  className: 'nav-link',
                                  textContent: 'Événements'
                                }
                              })
                            ]
                          }),
                          CreateElement({
                            tagName: 'li',
                            children: [
                              CreateElement({
                                componentClass: Link,
                                props: {
                                  to: '/contact',
                                  className: 'nav-link',
                                  textContent: 'Carte'
                                }
                              })
                            ]
                          })
                        ]
                      })
                    ]

                  }),
                  CreateElement({
                    tagName:'button',
                    props:{
                      id:'menu-button'
                    },
                    children:[
                      CreateElement({
                                    tagName: 'img',
                                    props: { src: '/navbar_icon.svg' }
                                 }),
                    ]


                  })
                ]
            })
      ]
    });
  }
}


export default Navbar;
