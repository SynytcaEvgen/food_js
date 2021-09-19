import tabs from './modules/tabs'
import modal from './modules/modal'
import slider from './modules/slider'
import timer  from './modules/timer'
import cards  from './modules/cards'
import forms  from './modules/forms'
import calculator from './modules/calculator'
import { openModalWin }  from './modules/modal'

document.addEventListener('DOMContentLoaded', init);

function init() {
    let timeOpen = setTimeout(()=> openModalWin('.modal', timeOpen), 6000);
    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    modal('[data-modal]', '.modal', timeOpen);
    timer('.timer', '2021-10-25');
    cards(timeOpen);
    forms('form',timeOpen);
    calculator();
    slider({
        slideWrapper: '.offer__slider-wrapper',
        slideCounter: '.offer__slider-counter',
        prev: '.offer__slider-prev',
        next: '.offer__slider-next',
        slidesAll: '.offer__slide',
        countNow: '#current',
        commCount: '#total',
        innerSlide: '.offer__slider-inner',
    });
   
}

   