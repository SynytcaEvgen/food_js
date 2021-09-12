function widthScrollBar() {
        return window.innerWidth - document.documentElement.clientWidth;
    }
function openModalWin(selector, timeOpen) {
        let modalWinow = document.querySelector(selector);
        modalWinow.style.display = "flex";
        document.body.style.paddingRight = widthScrollBar() + 'px';
    document.body.style.overflow = 'hidden';
        timeOpen ? clearInterval(timeOpen) : false;
}
function closeModalWin(selector) {
    let modalWinow = document.querySelector(selector);
    modalWinow.style.display = "";
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = 0;
}
function modal(btn, selector, timeOpen) {
    const btnOpenModal = document.querySelectorAll(btn),
          modalWinow = document.querySelector(selector);
    // Modal 
    btnOpenModal.forEach(item => {
        item.addEventListener('click', ()=> openModalWin(selector, timeOpen));
    });
    modalWinow.addEventListener('click', event => {
        if (event.target.classList == "modal" || event.target.getAttribute('data-close') === '') {
            closeModalWin(selector);
        }
    })
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modalWinow.style.display == 'flex') {
            closeModalWin(selector);
        }
    });
    
    function showModalByScroll() {
        if (this.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWin(selector, timeOpen);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
    // Modal
   
}

export default modal;

export {closeModalWin, openModalWin}