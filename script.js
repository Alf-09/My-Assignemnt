document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function toggleMenu() {
        navMenu.classList.toggle('visible');
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            navMenu.classList.remove('visible');
        });
    });
});
const projectFilters = document.querySelectorAll('.filter-button');
const projects = document.querySelectorAll('.project');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
const lightboxClose = document.querySelector('.lightbox-close');

function filterProjects(category) {
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

projectFilters.forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        filterProjects(category);
    });
});

projects.forEach(project => {
    project.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').getAttribute('src');
        lightboxImage.setAttribute('src', imgSrc);
        lightbox.classList.add('visible');
    });
});

lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('visible');
});

lightbox.addEventListener('click', function(event) {
    if (event.target === lightbox) {
        lightbox.classList.remove('visible');
    }
});
const contactForm = document.querySelector('.contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const feedback = document.querySelector('.feedback');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateForm() {
    let isValid = true;
    feedback.innerHTML = '';

    if (nameInput.value.trim() === '') {
        feedback.innerHTML += '<p>Name is required.</p>';
        isValid = false;
    }

    if (emailInput.value.trim() === '' || !validateEmail(emailInput.value.trim())) {
        feedback.innerHTML += '<p>Valid email is required.</p>';
        isValid = false;
    }

    if (messageInput.value.trim() === '') {
        feedback.innerHTML += '<p>Message is required.</p>';
        isValid = false;
    }

    return isValid;
}

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        feedback.innerHTML = '<p>Thank you for your message!</p>';
        contactForm.reset();
    }
});

[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', validateForm);
});