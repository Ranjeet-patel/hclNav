const navItems = document.getElementById('navItems');
        const SCROLL_SPEED = 1; // Adjust the scrolling speed
        let isScrollingLeft = false;
        let isScrollingRight = false;

        navItems.addEventListener('mouseenter', () => {
            navItems.style.overflowX = 'auto';
            navItems.style.overflowX = 'auto';
        });

        navItems.addEventListener('mouseleave', () => {
            navItems.style.overflowX = 'hidden';
            isScrollingLeft = false;
            isScrollingRight = false;
        });

        navItems.addEventListener('wheel', (event) => {
            event.preventDefault();
            navItems.scrollLeft += event.deltaY;
        });

        navItems.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const navItemsRect = navItems.getBoundingClientRect();

            if (mouseX < navItemsRect.left + 50 && mouseY < navItemsRect.top + 50) {
                isScrollingLeft = true;
                isScrollingRight = false;
            } else if (mouseX > navItemsRect.right - 50 && mouseY > navItemsRect.bottom - 50) {
                isScrollingRight = true;
                isScrollingLeft = false;
            } else {
                // Reset scrolling flags when the mouse is not inside the navItems
                isScrollingLeft = false;
                isScrollingRight = false;
            }
        });

        function autoScroll() {
            if (isScrollingLeft) {
                navItems.scrollLeft -= SCROLL_SPEED;
            } else if (isScrollingRight) {
                navItems.scrollLeft += SCROLL_SPEED;
            }

            requestAnimationFrame(autoScroll);
        }

        

        autoScroll();