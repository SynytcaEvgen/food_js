function tabs(tabsSelector, tabsContentSelectro, tabsParentSelectro, activeClass){
    //vars
    const tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabsContentSelectro),
        tabsParent = document.querySelector(tabsParentSelectro);
    
    //function
    function hideTabsContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    };
    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass)
    }
    //function
    
    //script action
    hideTabsContent();
    showTabContent();
    tabsParent.addEventListener('click', event => {
        let target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            })
        }
    });
    //script action
};

export default tabs;