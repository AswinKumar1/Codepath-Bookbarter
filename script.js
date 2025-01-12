// Dark mode toggle functionality
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Scrolling animation for sections using IntersectionObserver
const sections = document.querySelectorAll('section');

// Observer configuration
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { 
    threshold: 0.5, // Trigger when 50% of the section is visible
    rootMargin: '0px 0px -100px 0px' // Trigger the animation a bit before and after the section enters/leaves the viewport
});

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Petition form submission and modal display
document.getElementById('petition-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let email = document.getElementById('email').value;

    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    let isEmailValid = emailPattern.test(email);

    if (firstName && lastName && email && isEmailValid) {
        let signatureList = document.getElementById('signature-list');
        let newSignature = document.createElement('li');
        newSignature.textContent = `${firstName} ${lastName} (${email})`;
        signatureList.appendChild(newSignature);

        let signatureCount = document.getElementById('signature-count');
        signatureCount.textContent = `Total Signatures: ${signatureList.children.length}`;

        // Reset form and hide error message
        document.getElementById('petition-form').reset();
        document.getElementById('error-message').style.display = 'none';

        // Show modal with personalized message
        let modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = `Thank you for signing, ${firstName} ${lastName}!`;
        document.getElementById('modal').style.display = 'flex';

        // Hide modal after 5 seconds if not closed
        setTimeout(() => {
            document.getElementById('modal').style.display = 'none';
        }, 5000);
    } else {
        let errorMessage = document.getElementById('error-message');
        if (!isEmailValid) {
            errorMessage.textContent = 'Please enter a valid email address.';
        } else {
            errorMessage.textContent = 'Please fill in all fields.';
        }
        errorMessage.style.display = 'block';
    }
});

// Close modal when close button is clicked
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Reduce motion toggle functionality
document.getElementById('reduce-motion-btn').addEventListener('click', function() {
    document.body.classList.toggle('reduce-motion');
});
