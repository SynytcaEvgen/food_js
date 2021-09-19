import { getData } from "../services/services"

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

    };
    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new ProdCard(img, altimg, title, descr, price, '.menu__field .container').render();
            });
        });
    
};
export default cards;