window.onload = () :void => {
    const menu = document.querySelector(".menu");
    const toggleClass = "hide_hr_menu";

    // Toggle Horizontal menu

    window.addEventListener("scroll", () :void => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 200) {
            menu && menu.classList.add(toggleClass);
        } else {
            menu && menu.classList.remove(toggleClass);
        }
    });

    // Toggle Mobile Menu

    const closeButton = document.getElementById('close');
    const burgerButton = document.getElementById('burger');
    const bodyWrapper = document.getElementById('body_wrapper');

    const toggleClassName = 'toggle_menu';
    const bodyWrapperClassName = 'body_wrapper';

    const toggleMenuHandler = () :void => {
        if (window.innerWidth <= 745) {
            menu && menu.classList.toggle(toggleClassName);
            bodyWrapper && bodyWrapper.classList.toggle(bodyWrapperClassName);
        }
    }

    closeButton && closeButton.addEventListener('click', toggleMenuHandler);
    burgerButton && burgerButton.addEventListener('click', toggleMenuHandler);
    bodyWrapper && bodyWrapper.addEventListener('click', toggleMenuHandler);

    // Mobile Menu Accordion

    const lists = document.querySelectorAll(".menu > li.has-sub");
    const submenuClassName = 'displayInitial';
    const arrowClassName = 'arrow_open';

    lists.forEach((list, index) :void => {
        list.addEventListener('click', () :void => {
            if (window.innerWidth <= 745) {
                const submenu = list.querySelector("ul");
                closeListsHandler(index);
                list.classList.toggle(arrowClassName);
                submenu && submenu.classList.toggle(submenuClassName);
            }
        });
    })

    const closeListsHandler = (thisListIndex: number) :void => {
        lists.forEach((list, index) :void => {
            if (thisListIndex !== index) {
                const submenu = list.querySelector("ul");
                list && list.classList.remove(arrowClassName);
                submenu && submenu.classList.remove(submenuClassName);
            }
        });
    }
}