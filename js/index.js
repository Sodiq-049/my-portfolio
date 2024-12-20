var typed = new Typed('.typing', {
    strings: ["Full-stack Developer", "Web Developer", "Web Designer", "Website Maintenance", "Graphic Designer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Aside
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

let sectionIndex = 0; // Initialize sectionIndex with a default value

// Update sectionIndex when clicking a navigation link
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);

        // Set sectionIndex based on the clicked section
        sectionIndex = i;  // Update the section index dynamically
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSection(num) {
    allSection[num].classList.add("back-section");
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

// Handling the 'hire-me' click event
document.querySelector(".hire-me").addEventListener("click", function () {
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex); // sectionIndex should now be defined
});

// Toggle aside menu visibility
const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

// Form submission event listener
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        name: document.querySelector('input[placeholder="Name"]').value,
        email: document.querySelector('input[placeholder="Email"]').value,
        subject: document.querySelector('input[placeholder="Subject"]').value,
        message: document.querySelector('textarea[placeholder="Message"]').value
    };

    fetch('https://sodiq.hspace.cloud/send', { // Update URL to the deployed backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Show success message
    })
    .catch(error => {
        console.error('Error details:', error); // Log error for debugging
        alert('Failed to send message. Please try again later.'); // Inform user
    });
});
