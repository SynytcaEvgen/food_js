import {closeModalWin, openModalWin } from './modal'

function cards() {
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
};
export default cards;