function calculator() {
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

export default calculator;