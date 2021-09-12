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
          modalWinow = document.querySelector('.modal');
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
    modalWinow.addEventListener('click', event => {
        if (event.target.classList == "modal" || event.target.getAttribute('data-close') === '') {
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
                <h3 class="menu__item-subtitle">${this.title}</h3>
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
    const getData = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };
    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new ProdCard(img, altimg, title, descr, price, '.menu__field .container').render();
            });
        });
    const allForms = document.querySelectorAll('form');
    const messages = {
        loade: "./icons/spinner.svg",
        success: "Спасибо! Все булочка...",
        failed: "Упс, ща рвонет..."
    }
    allForms.forEach(item => dataSend(item));
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
                    
        });
        return await res.json();
    };
    function dataSend(form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let statusMesseg = document.createElement('img');
            statusMesseg.src = messages.loade;
            statusMesseg.style.cssText = `
             position: absolute;
             display: block;
             margin: 0 auto;
            `;
            form.append(statusMesseg);
            // const request = new XMLHttpRequest();
            // request.open('POST', '../server.php');
            const formData = new FormData(form);
            const objJSON = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('http://localhost:3000/requests', objJSON)
            .then(data => {
                statusMesseg.remove();
                showThanksModal(messages.success);
            }).catch(() => {
                statusMesseg.remove();
                showThanksModal(messages.failed);
            }).finally(() => {
                form.reset();
            })
            // JSON
            // let objJSON = {};
            // formData.forEach((item, key) => {
            //     objJSON[key] = item;
            // })
            // let json = JSON.stringify(objJSON);
            // request.send(json);
            // JSON
            // request.send(formData);
            // request.addEventListener('load', function (e) {
            //     if (request.status === 200) {
            //         form.reset();
            //         statusMesseg.remove();
            //         showThanksModal(messages.success);
            //     } else {
            //         statusMesseg.remove();
            //         showThanksModal(messages.failed);;
            //     }
            // })
        })
    }

    function showThanksModal(message) {
        const prevModalDailog = document.querySelector('.modal__dialog');
        prevModalDailog.classList.add('hide');
        prevModalDailog.classList.remove('show');
        openModalWin();
        let tankContent = document.createElement('div');
        tankContent.classList.add('modal__dialog');
        tankContent.innerHTML = `
        <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(tankContent);
        setTimeout(() => {
            tankContent.remove();
            prevModalDailog.classList.add('show');
            prevModalDailog.classList.remove('hide');
            closeModalWin();
        }, 4000)
        
    }
     // Slider var_1
    const sliderWrapper = document.querySelector('.offer__slider-wrapper');
    const sliderCounter = document.querySelector('.offer__slider-counter');
    const slideInner = sliderWrapper.querySelector('.offer__slider-inner');
    const arrowPrev = sliderCounter.querySelector('.offer__slider-prev');
    const arrowNext = sliderCounter.querySelector('.offer__slider-next');
    const arrSlides = sliderWrapper.querySelectorAll('.offer__slide');
    const arrImg = [];
    let currentCount = sliderCounter.querySelector('#current');
    let allCount = sliderCounter.querySelector('#total');
    let count = 1;
    let addN = 0;
    arrSlides.forEach((item, i) => {
        arrImg[i] = item;
        item.remove();
    });
    sliderWrapper.style.overflow = 'hidden';
    slideInner.style.display = 'flex';
    slideInner.style.width = 100 + '%';
    let widthElem = 0;
    sliderWrapper.style.width = window.getComputedStyle(slideInner).width;
    slideInner.style.transition = 'all 0.3s linear';
    
    function trueRenderNumber(numb, element) {
        if (numb < 10) {
          element.innerHTML = `0${numb}`;
        } else {
          element.innerHTML = numb;
        }
    };
    trueRenderNumber(arrImg.length, allCount);
    trueRenderNumber(count, currentCount);
    
    function renderSlide(array) {
        slideInner.innerHTML = '';
        array.forEach(item => {
            slideInner.append(item);
        })   
    };
    let moveSlide = (elem)=> slideInner.style.transform = `translateX(${elem}px)`;
    renderSlide(arrImg);
    arrowPrev.addEventListener('click', function () {
        if (count < 2) {
            count = arrImg.length;
            trueRenderNumber(count, currentCount);
            widthElem = -window.getComputedStyle(slideInner).width.slice(0, -2) * (arrImg.length - 1);
            moveSlide(widthElem);
        } else {
            count--;
            trueRenderNumber(count, currentCount);
            widthElem += +window.getComputedStyle(slideInner).width.slice(0, -2);
            moveSlide(widthElem);
        }
    });
    arrowNext.addEventListener('click', function () {
        if (count >= arrImg.length) {
            count = 1;
            trueRenderNumber(count, currentCount);
            widthElem = 0;
            moveSlide(widthElem);
        } else {
            count++;
            trueRenderNumber(count, currentCount);
            widthElem -= +window.getComputedStyle(slideInner).width.slice(0, -2);
            moveSlide(widthElem);
        };
        
    });

    // Slider var_1


    // Calculator
    const result = document.querySelector('.calculating__result span');
    let sex = 'female', height, age, weight, ratio = 1.375;
    localStorage.getItem('sex') ? sex = localStorage.getItem('sex') : sex = female;
    localStorage.getItem('ratio') ? ratio = localStorage.getItem('ratio') : ratio = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '0';
            return;
        }
        if (sex === 'female') {
            let a = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
            result.textContent = Math.round(a);
        } else {
            let b = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
            result.textContent = Math.round(b);
        }
    }
    calcTotal();
    function initLocalSetting(selector, activeClass) {
        const element = document.querySelectorAll(selector);
        element.forEach(item => {
            item.classList.remove(activeClass);
            if (item.getAttribute('id') == localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            } else if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        })
    }
    initLocalSetting('#gender div', 'calculating__choose-item_active');
    initLocalSetting('#activity_rate div', 'calculating__choose-item_active');
    function getStaticInformation(parentSelector, activeClass) {
        const element = document.querySelectorAll(`${parentSelector} div`);
        element.forEach(item => {
            item.addEventListener('click', function (event) {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
                element.forEach(elem => elem.classList.remove(activeClass));
                event.target.classList.add(activeClass);
                calcTotal();
            });
        });
        document.querySelector(parentSelector)
        
    }
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('#activity_rate', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        let elem = document.querySelector(selector);
        elem.addEventListener('input', function (e) {

            this.value.match(/\D/g) ? this.style.border = '1px solid red' : this.style.border = 'none';
            switch (elem.getAttribute('id')) {
                case 'height': height = +elem.value; break;
                case 'weight': weight = +elem.value; break;
                case 'age': age = +elem.value; break;
            }
            calcTotal();
        });
    }
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
    
    // Calculator
}

   