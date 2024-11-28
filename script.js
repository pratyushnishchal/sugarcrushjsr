const menuBtn = document.querySelector(".header .menu-btn");
const menuOverlay = document.querySelector(".side-menu-overlay");
const sideMenu = document.querySelector(".side-menu");
const closeMenuBtn = document.querySelector(".close-btn");
const menuLinks = document.querySelectorAll(".side-menu nav ul li a"); // Select all links in the side menu
function showMenu() {
    sideMenu.classList.add("show");
    menuOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
}

function hideMenu() {
    sideMenu.classList.remove("show");
    menuOverlay.classList.remove("show");
    document.body.style.overflow = ""; // Restore overflow property
}

// Add click event listeners
menuBtn.addEventListener("click", showMenu);
closeMenuBtn.addEventListener("click", hideMenu);
menuOverlay.addEventListener("click", hideMenu);

// Close menu when any link is clicked
menuLinks.forEach(link => {
    link.addEventListener("click", hideMenu);
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all category links and product cards
    const categoryLinks = document.querySelectorAll('.cake-category');
    const productCards = document.querySelectorAll('.product-card');

    // Function to show products by category
    function showCategory(category) {
        productCards.forEach(card => {
            if (card.getAttribute('data-category') === category || category === 'all') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Function to highlight the active category link
    function setActiveCategory(category) {
        categoryLinks.forEach(link => {
            if (link.getAttribute('data-category') === category) {
                link.classList.add('active');  // Add 'active' class to selected link
            } else {
                link.classList.remove('active');  // Remove 'active' class from other links
            }
        });
    }
    
    // Set default category to show (Birthday Cakes)
    showCategory('birthday');
    setActiveCategory('birthday');  // Set the default active category to 'birthday'

    // Add event listeners to each category link
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            showCategory(category);  // Show the products for the selected category
            setActiveCategory(category);  // Set the clicked category as active
        });
    });
});

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth',
                    });
                });
            });
            AOS.init();