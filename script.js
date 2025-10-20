// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
toggle.addEventListener('click', () => {
const isOpen = nav.classList.toggle('open');
toggle.setAttribute('aria-expanded', String(isOpen));
});
}


// Active link based on body[data-page]
(function setActive(){
const page = document.body.getAttribute('data-page');
document.querySelectorAll('.site-nav a').forEach(a => {
if (a.dataset.link === page) a.classList.add('active');
});
})();


// Year in footer
(function setYear(){
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
})();