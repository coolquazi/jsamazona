import Header from './components/Header.js';
import CartScreen from './screen/CartScreen.js';
import Error404Screen from './screen/Error404Screen.js';
import HomeScreen from './screen/HomeScreen.js';
import ProductScreen from './screen/ProductScreen.js';
import signInScreen from './screen/signInScreen.js';
import { parseRequestUrl } from './utils.js';

const routes = {
    "/": HomeScreen,
    "/product/:id": ProductScreen, 
    '/cart/:id': CartScreen,
    '/cart': CartScreen, 
    '/signin': signInScreen,
};
const router = async () =>{
    const request = parseRequestUrl();
    // console.log(request);
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
                     (request.id ? `/:id` : '') +
                     (request.verb ? `/${request.verb}` : '');
    const screen =  routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await Header.after_render();
    const main = document.getElementById("main-container");
    main.innerHTML = await screen.render();
    await screen.after_render();
}

window.addEventListener('load', router); 
window.addEventListener('hashchange', router);