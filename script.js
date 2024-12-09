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

document.addEventListener('DOMContentLoaded', function () {
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
        link.addEventListener('click', function (e) {
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

  // Initialize counters
  let customerCount = 0;
  let orderCount = 0;

  // Function to animate the numbers
  const countUp = (element, target, duration) => {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    
    const interval = setInterval(() => {
      start += 1;
      element.textContent = start;
      if (start === target) {
        clearInterval(interval);
      }
    }, stepTime);
  };

  // Function to trigger animations when the stats section comes into view
  const animateStats = () => {
    const statsSection = document.querySelector('.stats-section');
    const customersElement = document.getElementById('customers-count');
    const ordersElement = document.getElementById('orders-count');

    // Create an intersection observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate numbers when the section comes into view
          customersElement.classList.add('animate-in');
          ordersElement.classList.add('animate-in');
          
          // Trigger count-up animation for numbers
          countUp(customersElement, 250, 2000); // 1500 customers, 2 seconds duration
          countUp(ordersElement, 650, 2000); // 2300 orders, 2 seconds duration
          
          // Stop observing after triggering animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5 // Trigger animation when 50% of the section is visible
    });

    observer.observe(statsSection);
  };

  // Call the function when the page loads
  document.addEventListener('DOMContentLoaded', animateStats);
// Define special occasions
const specialOccasions = [
    { date: "2024-12-25", message: "Merry Christmas! 🎄 Enjoy our festive cakes." },
    { date: "2025-01-01", message: "Happy New Year! 🎉 Celebrate with sweetness." },
    { date: "2024-11-28", message: "Happy Thanksgiving! 🦃 Indulge in our cakes." }
];

// Function to get today's date and matching occasion
const getSpecialMessage = () => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const occasion = specialOccasions.find(o => o.date === today);
    return occasion ? occasion.message : null;
};

// Update the hero section dynamically
document.addEventListener("DOMContentLoaded", () => {
    const message = getSpecialMessage();
    if (message) {
        const heroSection = document.querySelector(".hero-section .hero-content");
        const greeting = document.createElement("h2");
        greeting.textContent = message;
        greeting.className = "special-greeting";
        heroSection.appendChild(greeting);
    }
});
const menuData = [
    { item: "Chocolate Cake", description: "Rich and moist chocolate cake with a creamy ganache topping", price: "$12.99" },
    { item: "Vanilla Cupcake", description: "Fluffy vanilla cupcakes topped with buttercream frosting", price: "$3.99" },
    { item: "Strawberry Cheesecake", description: "Creamy cheesecake with a fresh strawberry topping", price: "$8.99" },
    { item: "Espresso Coffee", description: "Freshly brewed espresso with a rich aroma", price: "$2.99" },
    { item: "Blueberry Muffin", description: "Moist muffin loaded with fresh blueberries", price: "$4.50" },
    { item: "Pancakes", description: "Fluffy pancakes served with maple syrup", price: "$5.99" },
    { item: "Green Tea", description: "Freshly brewed green tea", price: "$2.50" },
    { item: "Mango Smoothie", description: "Refreshing smoothie made with fresh mangoes", price: "$6.50" },
];

const itemsPerPage = 5;
let currentPage = 0;

function renderMenuItems() {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToShow = menuData.slice(start, end);

    const menuTableBody = document.getElementById("menu-items");
    menuTableBody.innerHTML = "";

    itemsToShow.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.item}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
        `;
        menuTableBody.appendChild(row);
    });

    document.getElementById("prev-btn").disabled = currentPage === 0;
    document.getElementById("next-btn").disabled = end >= menuData.length;
}

document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        renderMenuItems();
    }
});

document.getElementById("next-btn").addEventListener("click", () => {
    if ((currentPage + 1) * itemsPerPage < menuData.length) {
        currentPage++;
        renderMenuItems();
    }
});

// Initial Render
renderMenuItems();
document.getElementById('search-input').addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase(); // Get the search query
    const rows = document.querySelectorAll('#menu-items tr'); // Get all table rows

    rows.forEach(row => {
        const item = row.cells[0].textContent.toLowerCase(); // Get the item name
        const description = row.cells[1].textContent.toLowerCase(); // Get the description

        // Check if the search query matches item name or description
        if (item.includes(searchQuery) || description.includes(searchQuery)) {
            row.style.display = ''; // Show the row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });
});



AOS.init();