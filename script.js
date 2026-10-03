/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");

const navbar = document.querySelector(".navbar");


menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("show");

});



/* =========================================================
   NAVIGATION ACTIVE LINK
========================================================= */

const navLinks =
    document.querySelectorAll(".navbar a");


navLinks.forEach(link => {

    link.addEventListener("click", () => {


        navLinks.forEach(item => {

            item.classList.remove("active");

        });


        link.classList.add("active");


        navbar.classList.remove("show");

    });

});

/* =========================================
   BEFORE / AFTER SLIDER
========================================= */

const comparisons = document.querySelectorAll(".comparison");

comparisons.forEach((comparison) => {

    const beforeContainer =
        comparison.querySelector(".comparison-before");

    const beforeImage =
        comparison.querySelector(".comparison-before img");

    const line =
        comparison.querySelector(".comparison-line");

    const handle =
        comparison.querySelector(".comparison-handle");


    function setImageSize() {

        const rect = comparison.getBoundingClientRect();

        /*
         * Keep the BEFORE image the exact same
         * size as the complete comparison area.
         */
        beforeImage.style.width = `${rect.width}px`;
        beforeImage.style.height = `${rect.height}px`;
    }


    function moveSlider(clientX) {

        const rect = comparison.getBoundingClientRect();

        let position = clientX - rect.left;

        let percentage =
            (position / rect.width) * 100;


        // Keep slider between 0% and 100%
        percentage = Math.max(
            0,
            Math.min(100, percentage)
        );


        // Reveal BEFORE image
        beforeContainer.style.width =
            `${percentage}%`;


        // Move divider
        line.style.left =
            `${percentage}%`;


        // Move handle
        handle.style.left =
            `${percentage}%`;
    }


    /* Initial image size */
    setImageSize();


    /* Recalculate when browser size changes */
    window.addEventListener("resize", setImageSize);


    /* Mouse */
    comparison.addEventListener("mousemove", (event) => {

        moveSlider(event.clientX);

    });


    /* Touch */
    comparison.addEventListener("touchmove", (event) => {

        const touch = event.touches[0];

        moveSlider(touch.clientX);

    }, {
        passive: true
    });

});

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});

/* =========================================
   SERVICES CARD REVEAL
========================================= */

const serviceCards =
    document.querySelectorAll(".service-card");

serviceCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 0.12}s`;

    revealObserver.observe(card);

});

/* =========================================
   BEFORE / AFTER CARD REVEAL
========================================= */

const comparisonCards =
    document.querySelectorAll(".comparison-card");

comparisonCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 0.15}s`;

    revealObserver.observe(card);

});

/* =========================================
   ABOUT SECTION REVEAL
========================================= */

const aboutContent =
    document.querySelector(".about-content");

const aboutImage =
    document.querySelector(".about-image");

if (aboutContent) {
    revealObserver.observe(aboutContent);
}

if (aboutImage) {
    revealObserver.observe(aboutImage);
}

const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "");

    if (phoneInput.value.length > 10) {
        phoneInput.value = phoneInput.value.slice(0, 10);
    }
});

const quoteForm = document.getElementById("quoteForm");
const formSuccess = document.getElementById("formSuccess");
const quoteSubmit = document.getElementById("quoteSubmit");

quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    quoteSubmit.disabled = true;
    quoteSubmit.style.opacity = "0.6";
    quoteSubmit.style.cursor = "not-allowed";
    quoteSubmit.innerHTML = "Opening WhatsApp...";

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    const whatsappMessage =
        `Hello Siddhivinayak Constructions,%0A%0A` +
        `I would like to enquire about a construction project.%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Phone:* ${phone}%0A` +
        `*Service:* ${service}%0A` +
        `*Project Details:* ${message}%0A%0A` +
        `Thank you.`;

    const whatsappURL =
        `https://wa.me/918275775735?text=${whatsappMessage}`;

    window.open(whatsappURL, "_blank");

    formSuccess.classList.add("show");

    quoteForm.reset();

    setTimeout(() => {
        formSuccess.classList.remove("show");

        quoteSubmit.disabled = false;
        quoteSubmit.style.opacity = "1";
        quoteSubmit.style.cursor = "pointer";
        quoteSubmit.innerHTML = 'Send Enquiry <span>→</span>';
    }, 5000);
});