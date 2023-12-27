

# Mini-React | Site Web JO PARIS 2024

## Motivations

Mini-react est une bibliothèque conçue pour étudier principalement l'algorithme et l'implémentation de Fiber afin de l'utiliser pour notre projet semestriel qui consiste à créer un site pour les JO de PARIS 2024. Elle a été inspirée par notre bien-aimé [React](https://reactjs.org/).

> Avant de commencer, voyons l'architecture de cette application et comment elle a été construite.

Mini-react comprend 3 principaux paquets, 🔍 examinons-les de plus près :

## 📦 mini-react

Le paquet **_mini-react_** concerne uniquement la création de composants (classe Component) et l'analyse des nœuds (Node). Il doit être utilisé avec un rendu spécifique dans notre cas c'est avec _mini-react-dom_.

## 📦 mini-react-dom

Ce paquet sert de point d'entrée pour les rendus DOM et serveur. Il est destiné à être associé au paquet générique mini-react (☝️).

## 📦 mini-react-reconciler

Lorsque vous utilisez React, à un moment donné, vous pouvez considérer que la fonction render() crée un arbre d'éléments React. Lors de la mise à jour suivante de l'état ou des props, cette fonction render() renverra un arbre différent d'éléments React. React doit alors déterminer comment mettre à jour efficacement l'UI pour correspondre à l'arbre le plus récent.

Ceci est une implémentation très simple du nouvel algorithme de React, connu sous le nom de Fiber. Elle a été construite sur la base de l'explication en dessin animé de [Lin Clark](https://www.youtube.com/watch?v=ZCuYPiUIONs). 

## Contenu

- [Installation](#installation)
- [Utilisation](#usage)
- [Construction](#build)

## Installation

Tout d'abord, vous devez installer les dépendances utilisées pour construire le projet.

```sh
npm install
```

## Utilisation

Ensuite, démarrez le projet.

```js
npm run start
```

L'adresse par défaut du serveur sera : http://localhost:3008

## Construction

**_mini-react_** utilise [Rollup](https://www.youtube.com/watch?v=ZCuYPiUIONs) comme outil de construction.