import Header from './components/Header.js';
import CartScreen from './screen/CartScreen.js';
import Error404Screen from './screen/Error404Screen.js';
import HomeScreen from './screen/HomeScreen.js';
import ProductScreen from './screen/ProductScreen.js';
import ProfileScreen from './screen/ProfileScreen.js';

import RegisterScreen from './screen/RegisterScreen.js';
import signInScreen from './screen/signInScreen.js';
import { hideLoading, parseRequestUrl, showLoading } from './utils.js';

const routes = {
    "/": HomeScreen,
    "/product/:id": ProductScreen, 
    '/cart/:id': CartScreen,
    '/cart': CartScreen, 
    '/signin': signInScreen,
    '/register' : RegisterScreen,
    '/profile' : ProfileScreen,
};
const router = async () =>{
    showLoading();
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
    if (screen.after_render) await screen.after_render();
    hideLoading();
}

window.addEventListener('load', router); 
window.addEventListener('hashchange', router);