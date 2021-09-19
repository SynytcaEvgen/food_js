import { closeModalWin, openModalWin } from './modal'
import { postData } from "../services/services"

function forms(fromSelectro, timeOpen) {
    const allForms = document.querySelectorAll(fromSelectro);
    const messages = {
        loade: "./icons/spinner.svg",
        success: "Спасибо! Все булочка...",
        failed: "Упс, ща рвонет..."
    }
    allForms.forEach(item => dataSend(item));
    
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
        openModalWin('.modal', timeOpen);
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
            closeModalWin('.modal');
        }, 4000)
        
    }
}

export default forms;