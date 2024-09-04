$(document).ready(function () {
  var brandSlider = $("#brandSlider");
  var countrySlider = $("#countrySlider");
  var testimonial = $("#testimonial");

  brandSlider.owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1500,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      992: {
        items: 5,
      },
    },
  });

  countrySlider.owlCarousel({
    loop: true,
    margin: 10,
    // dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
    },
  });

  // testimonial slider //

  testimonial.owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
    },
  });

  // custom navigation button for testimonial slider //

  $("#tm-button-next").click(function () {
    testimonial.trigger("next.owl.carousel");
  });

  $("#tm-button-prev").click(function () {
    testimonial.trigger("prev.owl.carousel");
  });

  // Intersection Observer to trigger the auto-scroll
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Automatically scroll to the next slide when in view
          testimonial.trigger("next.owl.carousel");
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the carousel is in view
    }
  );

  // Observe the carousel container
  observer.observe(document.querySelector(".testimonial"));
});

 // Function to update the copyright year
 function updateCopyrightYear() {
  let currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = currentYear;
}
// Ensure the function runs after the page has loaded
document.addEventListener("DOMContentLoaded", updateCopyrightYear);

// header sticky after scroll 50px //

document.addEventListener("DOMContentLoaded", function () {
  let stickyHeader = document.querySelector(".header__wrap");
  
  function handleScroll() {
    if (window.scrollY > 50) {
      stickyHeader.classList.add("stricked-menu");
    } else {
      stickyHeader.classList.remove("stricked-menu");
    }
  }

  handleScroll();

  window.addEventListener("scroll", handleScroll);
});


// <!-- =============================== counter =============================== --> //

function startCounting(element) {
  const target = +element.getAttribute("data-target");
  const speed = 50; // Change this value to adjust the counting speed
  let count = 0;

  const updateCount = () => {
    const increment = target / speed;
    const remaining = target - count;

    // Slow down when the count is within the last 3 increments
    const slowdownFactor = remaining <= 3 ? 3 : 1;

    if (count < target) {
      count += increment;
      element.textContent = Math.ceil(count);
      // setTimeout(updateCount, 25);
      setTimeout(updateCount, 30 * slowdownFactor); // Slows down the interval time
    } else {
      element.textContent = target;
    }
  };

  updateCount();
}

function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startCounting(entry.target);
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  root: null, // Use the viewport as the container
  threshold: 0.1, // Trigger when 10% of the element is visible
});

// Observe all elements with class "count"
const countElements = document.querySelectorAll(".count");
countElements.forEach((countElement) => {
  observer.observe(countElement);
});

// Start counting on page load for elements in view
window.addEventListener("load", () => {
  countElements.forEach((countElement) => {
    // Check if the element is in view on page load
    if (elementInView(countElement)) {
      startCounting(countElement);
    }
  });
});

// Helper function to check if an element is in view
function elementInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(".header-search-btn");
  const searchWrapper = document.querySelector(".header-search-form-wrapper");
  const closeBtn = document.querySelector(".xb-search-close");
  function showSearchForm() {
    searchWrapper.classList.add("open");
  }
  function hideSearchForm() {
    searchWrapper.classList.remove("open");
  }
  searchBtn.addEventListener("click", showSearchForm);
  closeBtn.addEventListener("click", hideSearchForm);
});

const navBtn = document.querySelector(".xb-nav-mobile-button");
const closeBtn = document.querySelector(".xb-menu-close");
const navMenu = document.querySelector(".xb-header-menu");

function toggleNav() {
  navMenu.classList.toggle("active");
}

function hideNav() {
  navMenu.classList.remove("active");
}

navBtn.addEventListener("click", toggleNav);
closeBtn.addEventListener("click", hideNav);

let dropdown = document.getElementsByClassName("homedropdown");
let i;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var desc = this.nextElementSibling;
    if (desc.style.maxHeight) {
      desc.style.maxHeight = null;
    } else {
      desc.style.maxHeight = desc.scrollHeight + "px";
    }
  });
}

// <!-- =============================== scrollTopBtn =============================== --> //

document.addEventListener("DOMContentLoaded", function () {
  let scrollToTopButton = document.getElementById("smothscroll");
  function handleScroll() {
    if (window.scrollY > 200) {
      scrollToTopButton.classList.add("show");
    } else {
      scrollToTopButton.classList.remove("show");
    }
  }
  window.addEventListener("scroll", handleScroll);
  scrollToTopButton.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  handleScroll();
});




//  footer form validation //

function validateForm() {
  // Clear previous error messages
  document.getElementById("nameError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("selectError").textContent = "";
  document.getElementById("messageError").textContent = "";

  let isValid = true;

  // Name validation
  let name = document.getElementById("name").value.trim();
  if (name === "") {
      document.getElementById("nameError").textContent = "Name is required.";
      isValid = false;
  } else if (name.length < 3 || name.length > 22) {
      document.getElementById("nameError").textContent = "Name must be between 3 and 22 characters.";
      isValid = false;
  }

  // Phone number validation
  let phone = document.getElementById("phone").value.trim();
  let phonePattern = /^[6-9]\d{9}$/;
  if (phone === "") {
      document.getElementById("phoneError").textContent = "Phone number is required.";
      isValid = false;
  } else if (!phone.match(phonePattern)) {
      document.getElementById("phoneError").textContent = "Phone number exactly 10 digits and only indian";
      isValid = false;
  }

  // Email validation
  let email = document.getElementById("email").value.trim();
  let emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (email === "") {
      document.getElementById("emailError").textContent = "Email is required.";
      isValid = false;
  } else if (!email.match(emailPattern)) {
      document.getElementById("emailError").textContent = "Please enter a valid Gmail address.";
      isValid = false;
  }

  // Select validation
  let select = document.getElementById("select").value.trim();
  if (select === "") {
      document.getElementById("selectError").textContent = "Please select an option.";
      isValid = false;
  }

  // Message validation
  let message = document.getElementById("message").value.trim();
  if (message === "") {
      document.getElementById("messageError").textContent = "Please enter a message.";
      isValid = false;
  }

  // // If the form is valid, show a success message or submit the form
  // if (isValid) {
  //     alert("Form submitted successfully!"); // Simulate form submission
  //     // You can also programmatically submit the form if needed
  //     // document.getElementById("contactForm").submit();
  // }

  // Prevent form submission if validation fails
  return isValid;
  
}
const submit = document.getElementById('submitBtn');
submit.addEventListener('click', validateForm)

AOS.init();