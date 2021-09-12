import tabs from './modules/tabs'
import modal from './modules/modal'
import slider from './modules/slider'
import timer  from './modules/timer'
import cards  from './modules/cards'
import calculator from './modules/calculator'
import { openModalWin }  from './modules/modal'

document.addEventListener('DOMContentLoaded', init);

function init() {
    let timeOpen = setTimeout(()=> openModalWin('.modal', timeOpen), 6000);
    tabs();
    modal('[data-modal]', '.modal', timeOpen);
    slider();
    timer();
    cards();
    calculator();
   
}

   