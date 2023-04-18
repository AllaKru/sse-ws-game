// TODO: write code here
// fetch('http://localhost:8080/');

// console.log(123)
//  import './components/api/api';
// eslint-disable-next-line no-unused-vars
import api from './components/api/api';
// const api = require('./components/api/api')
// import './components/game';
import Game from './components/game';

const body = document.getElementsByTagName('body')[0];
const gameDev = new Game(body);

gameDev.add();
// api.api('/ping');
// api.api('/index');
