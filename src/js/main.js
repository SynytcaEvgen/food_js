document.addEventListener('DOMContentLoaded', init);

function init() {
    // all var
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    // all var
    //function
    function hideTabsContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    };
    function showTabContent(i = 0) {

        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active')
    }
    //function

    //script action
    hideTabsContent();
    showTabContent();
    tabsParent.addEventListener('click', event => {
        let target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            })
        }
    })
    //script action
    // timer
    const deadLine = '2021-08-24'
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minets = Math.floor((t / (1000 * 60)) % 60),
            second = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minets': minets,
            'second': second
        }

    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minets = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minets.innerHTML = getZero(t.minets);
            seconds.innerHTML = getZero(t.second);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);
    // timer
    // Modal 
    const btnOpenModal = document.querySelectorAll('[data-modal]'),
        modalWinow = document.querySelector('.modal'),
        btnClosoModal = document.querySelectorAll('[data-close]');
    function widthScrollBar() {
        return window.innerWidth - document.documentElement.clientWidth;
    }
    function openModalWin() {
        modalWinow.style.display = "flex";
        document.body.style.paddingRight = widthScrollBar() + 'px';
        document.body.style.overflow = 'hidden';
        // clearInterval(timeOpen);
    }
    function closeModalWin() {
        modalWinow.style.display = "";
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = 0;
    }

    btnOpenModal.forEach(item => {
        item.addEventListener('click', openModalWin);
    });
    btnClosoModal.forEach(item => {
        item.addEventListener('click', closeModalWin);
    });
    modalWinow.addEventListener('click', event => {
        if (event.target.classList == "modal") {
            closeModalWin();
        }
    })
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modalWinow.style.display == 'flex') {
            closeModalWin();
        }
    });
    // let timeOpen = setTimeout(openModalWin, 6000);
    function showModalByScroll() {
        if (this.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWin();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
    // Modal

    class ProdCard {
        constructor(src, alt, title, desc, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.parent = document.querySelector(parentSelector);
            this.desc = desc;
            this.classes = classes;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;   
        }
        render() {
            let contElem = document.createElement('div');
            if (this.classes.length > 0) {
                contElem.classList.add('menu__item');
                this.classes.forEach(item => contElem.classList.add(item));
            } else {
                contElem.classList.add('menu__item');
            }
            contElem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(contElem);
        }

    }
    new ProdCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Фитнес",
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'big'
    ).render();
    new ProdCard(
        "img/tabs/elite.jpg",
        "elite",
        "Премиум",
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
         14,
        '.menu .container'
    ).render();
    new ProdCard(
        "img/tabs/post.jpg",
        "post",
        "Постное",
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков',
         21,
        '.menu .container'
    ).render();
}