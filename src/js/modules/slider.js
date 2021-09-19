function slider({slideWrapper, slideCounter, prev, next, slidesAll, countNow, commCount, innerSlide}) {
      // Slider var_1
    const sliderWrapper = document.querySelector(slideWrapper);
    const sliderCounter = document.querySelector(slideCounter);
    const slideInner = sliderWrapper.querySelector(innerSlide);
    const arrowPrev = sliderCounter.querySelector(prev);
    const arrowNext = sliderCounter.querySelector(next);
    const arrSlides = sliderWrapper.querySelectorAll(slidesAll);
    const arrImg = [];
    let currentCount = sliderCounter.querySelector(countNow);
    let allCount = sliderCounter.querySelector(commCount);
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
}

export default slider;