const navItems = document.getElementById('navItems');
const headerContainer = document.querySelector('.headerContainer');
const SCROLL_SPEED = 2; // Adjust the scrolling speed
let isNavItemsScrollingLeft = false;
let isNavItemsScrollingRight = false;
let isHeaderContainerScrollingLeft = false;
let isHeaderContainerScrollingRight = false;
const navButton = document.getElementById('btn');

navButton.addEventListener('click', () => {

    
    const computedStyle = getComputedStyle(headerContainer);
    
    // Check whether the container is currently hidden
    const isHidden = computedStyle.maxHeight === '0px';
    
    // headerContainer.style.maxHeight = isHidden ? '200px' : '0px';
    // headerContainer.style.opacity = isHidden ? '1' : '0';
    headerContainer.classList.toggle('clickBtn');

    // Toggle the text content of the button
    const iconElement = navButton.querySelector('i');

    // Toggle classes based on the menu visibility
    if (isHidden) {
        iconElement.classList.remove('fa-bars');
        iconElement.classList.add('fa-times');
    } else {
        iconElement.classList.remove('fa-times');
        iconElement.classList.add('fa-bars');
    }
});
navItems.addEventListener('mouseenter', () => {
    navItems.style.overflowX = 'auto';
   
});

navItems.addEventListener('mouseleave', () => {
    navItems.style.overflowX = 'hidden';
    isNavItemsScrollingLeft = false;
    isNavItemsScrollingRight = false;
});

navItems.addEventListener('wheel', (event) => {
    event.preventDefault();
    navItems.scrollLeft += event.deltaY;
});

navItems.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const navItemsRect = navItems.getBoundingClientRect();

    if (mouseX < navItemsRect.left + 100 && mouseY < navItemsRect.top + 100) {
        isNavItemsScrollingLeft = true;
        isNavItemsScrollingRight = false;
    } else if (mouseX > navItemsRect.right - 100 && mouseY > navItemsRect.bottom - 100) {
        isNavItemsScrollingRight = true;
        isNavItemsScrollingLeft = false;
    } else {
        // Reset scrolling flags when the mouse is not inside the navItems
        isNavItemsScrollingLeft = false;
        isNavItemsScrollingRight = false;
    }
});

headerContainer.addEventListener('mouseenter', () => {
    headerContainer.style.overflowX = 'auto';
});

headerContainer.addEventListener('mouseleave', () => {
    headerContainer.style.overflowX = 'hidden';
    isHeaderContainerScrollingLeft = false;
    isHeaderContainerScrollingRight = false;
});

headerContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    headerContainer.scrollLeft += event.deltaY;
});

headerContainer.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const headerContainerRect = headerContainer.getBoundingClientRect();

    if (mouseX < headerContainerRect.left + 500) {
        isHeaderContainerScrollingLeft = true;
        isHeaderContainerScrollingRight = false;
    } else if (mouseX > headerContainerRect.right - 500) {
        isHeaderContainerScrollingRight = true;
        isHeaderContainerScrollingLeft = false;
    } else {
        // Reset scrolling flags when the mouse is not inside the headerContainer
        isHeaderContainerScrollingLeft = false;
        isHeaderContainerScrollingRight = false;
    }
});

function autoScroll() {
    if (isNavItemsScrollingLeft) {
        navItems.scrollLeft -= SCROLL_SPEED;
    } else if (isNavItemsScrollingRight) {
        navItems.scrollLeft += SCROLL_SPEED;
    }

    if (isHeaderContainerScrollingLeft) {
        headerContainer.scrollLeft -= SCROLL_SPEED;
    } else if (isHeaderContainerScrollingRight) {
        headerContainer.scrollLeft += SCROLL_SPEED;
    }

    requestAnimationFrame(autoScroll);
}

autoScroll();
