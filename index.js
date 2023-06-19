'use strict';

//  ============================================================
// 	!               CREATING RESPONSIVE NAVBAR
// ============================================================

const mobileNav = document.querySelector('.mobile-navbar-btn'),
    headerElement = document.getElementById('header');
mobileNav.addEventListener('click', () => {
    headerElement.classList.toggle('active');
});

//  ============================================================
// 	!               PRELOAD 
// ============================================================


const loader = document.querySelector('.preload');
window.addEventListener('load', () => {
    loader.classList.add('hidden');
});

//  ============================================================
// 	!           NAVBAR ACTIVE LINK FUNCTIONALITY
// ============================================================

const navLinks = document.querySelectorAll('.navbar-link');
navLinks.forEach((navLink) => {
    navLink.addEventListener('click', () => {
        navLinks.forEach((link) => {
            link.classList.remove('active-navlink');
        });
        navLink.classList.add('active-navlink');
        // close the nav menu
        headerElement.classList.toggle('active');
    });
});



//  ============================================================
// 	!           SCROLL SECTION ACTIVE LINK
//  ============================================================

const sections = document.querySelectorAll('body[id], section[id]');
function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.navbar a[href*=' + sectionId + ']')?.classList.add('active-navlink');
            headerElement.classList.add('active');

        } else {
            document.querySelector('.navbar a[href*=' + sectionId + ']')?.classList.remove('active-navlink');
            headerElement.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

//  ============================================================
// 	!			    STICKY NAVBAR COMPONENT
// ============================================================

const observer = new IntersectionObserver((entries) => {
    const ent = entries[0];
    ent.isIntersecting ? document.body.classList.remove('sticky') : document.body.classList.add('sticky');
}, {
    root: null,
    threshold: 0,
});
const heroSectionBtn = document.querySelector('.hireme-btn');
if (heroSectionBtn) {
    observer.observe(heroSectionBtn);
}

//  ============================================================
// 	!				PORTFOLIO TABBED COMPONENT 
// ============================================================

const pBtns = document.querySelectorAll('.p-btn'),
    pImageElement = document.querySelectorAll('.overlay-img');
if (pBtns) {
    pBtns.forEach((button) => {
        button.addEventListener('click', () => {
            pBtns.forEach((btn) => {
                btn.classList.remove('p-btn-active');
            });
            button.classList.add('p-btn-active');
            const btnNumber = button.dataset.btnNum,
                imgActive = document.querySelectorAll(`.p-btn--${btnNumber}`);
            pImageElement.forEach((curElem) => {
                curElem.classList.add('p-image-not-active');
            });
            imgActive.forEach((curElem) => {
                curElem.classList.remove('p-image-not-active');
            });
        });
    });
}


//  ============================================================
// 	!				TESTIMONIAL SWIPER
// ============================================================

// ? swiper js library
new Swiper(".mySwiper", {
    spaceBetween: 30,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        480: {
            slidesPerView: 1,
        },
        780: {
            slidesPerView: 2,
        },
    }
});


//  ============================================================
// 	!				SCROLL TO TOP BUTTON
// ============================================================

const footerElement = document.querySelector('.footer-section'),
    topElem = document.getElementById('top');

const scrollElement = document.createElement('div');
scrollElement.classList.add('scroll-top-style');
scrollElement.innerHTML = `<i class="uil uil-arrow-up scroll-top"></i>`;

footerElement.after(scrollElement);

scrollElement.addEventListener('click', () => {
    // console.log('clicked scroll to top');
    topElem.scrollIntoView({ behavior: 'smooth' });
});


//  ============================================================
// 	!				ANIMATE NUMBER COUNTER
// ============================================================

const counterNum = document.querySelectorAll('.counter-numbers'),
    speed = 200;


const workSection = document.querySelector('.work-data-section'),
    workObserver = new IntersectionObserver((entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        counterNum.forEach((curElem) => {
            const updateNumber = () => {
                const targetNumber = parseInt(curElem.dataset.number);
                const initialNum = parseInt(curElem.innerText);
                const incrementNumber = Math.trunc(targetNumber / speed);
                if (initialNum < targetNumber) {
                    curElem.innerText = `${initialNum + incrementNumber}+`
                    setTimeout(updateNumber, 10);
                }
            }
            updateNumber();
        });
        observer.unobserve(workSection);
    }, {
        root: null,
        threshold: 0
    });

if (workSection) {
    workObserver.observe(workSection);
}
