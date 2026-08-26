// Smooth Sticky Navbar Effect & Interactions
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(15, 17, 21, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(15, 17, 21, 0.85)';
        }
    });

    console.log("Prakash More & Associates website initialized successfully.");
});
