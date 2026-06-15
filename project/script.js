// 1. Dynamic Interactive Flashlight Cursor
const cursorGlow = document.getElementById('cursor-glow');
let lastMove = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMove < 16) return; // ~60fps throttle
    lastMove = now;

    cursorGlow.style.opacity = '1';
    cursorGlow.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// 2. Hardware-Accelerated Hero Parallax & Navbar Physics
const heroWrapper = document.querySelector('.hero-parallax-wrapper');
const navBar = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY < 800 && heroWrapper) {
        heroWrapper.style.transform = `translateY(${scrollY * 0.4}px) scale(${1 - scrollY/4000})`;
        heroWrapper.style.opacity = 1 - (scrollY / 400);
    }

    if (navBar) {
        if (scrollY > 50) {
            navBar.style.padding = '0.4rem 1rem';
            navBar.style.boxShadow = '4px 4px 10px rgba(0,0,0,0.8), -2px -2px 5px rgba(255,255,255,0.02)';
        } else {
            navBar.style.padding = '0.8rem 1rem';
            navBar.style.boxShadow = '8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light), inset 1px 1px 2px rgba(255,255,255,0.05)';
        }
    }
});

// 3. 3D Hinge Scroll Reveal
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.skeuo-reveal').forEach(el => observer.observe(el));
    
    // Trigger Live Typing Terminal Effect
    startTypingEffect();
});

// 4. Live Typing Terminal Logic for Hero Widget
function startTypingEffect() {
    const lines = [
        "> initializing secure connection...",
        "> loading architecture modules...",
        "> bypassing legacy frameworks...",
        "> debuglifewithf.core [ONLINE]"
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    const container = document.getElementById("typewriter");
    
    if(!container) return; // safety check

    function typeChar() {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                container.innerHTML += lines[lineIndex].charAt(charIndex);
                charIndex++;
                // Randomize typing speed for realism
                setTimeout(typeChar, Math.random() * 50 + 20);
            } else {
                container.innerHTML += "<br>";
                lineIndex++;
                charIndex = 0;
                setTimeout(typeChar, 400); // Pause between lines
            }
        }
    }
    setTimeout(typeChar, 800); // Initial delay
}

// 5. Smooth Form Submission via Google Apps Script 
const projectForm = document.getElementById('projectForm');
if(projectForm) {
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const form = this;
        const submitBtn = document.getElementById('submitBtn');
        const successMsg = document.getElementById('successMessage');
        
        const googleScriptURL = 'https://script.google.com/macros/s/AKfycbyrVffsH87yyXdnUgJksbtp3bj-gWmdAHVUf_jkL6eftmToYcE50h7dCfw06kgHW2609g/exec';
        
        submitBtn.innerText = "Transmitting...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;
        submitBtn.style.transform = "translateY(2px)";
        submitBtn.style.boxShadow = "inset 4px 4px 8px rgba(0,0,0,0.1)";

        const formData = new FormData(form);

        fetch(googleScriptURL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(() => {
            form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            form.style.opacity = '0';
            form.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                form.classList.add('d-none');
                successMsg.classList.remove('d-none');
                
                successMsg.style.opacity = '0';
                successMsg.style.transform = 'translateY(20px) scale(0.95)';
                
                void successMsg.offsetWidth;
                
                successMsg.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                successMsg.style.opacity = '1';
                successMsg.style.transform = 'translateY(0) scale(1)';
            }, 400);
        })
        .catch(error => {
            console.error('Error!', error.message);
            submitBtn.innerText = "Submit Request";
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;
            submitBtn.style.transform = "";
            submitBtn.style.boxShadow = "";
            alert("Transmission failed. Please check your connection.");
        });
    });
}

// 6. Pricing Estimator Logic
const slider = document.getElementById('complexitySlider');
const priceLabel = document.getElementById('priceLabel');
const featureText = document.getElementById('featureText');

if(slider && priceLabel && featureText) {
    const tiers = {
        1: { label: "Landing Page / Portfolio", text: "Static design, SEO optimized, high-performance hosting." },
        2: { label: "Standard Web App", text: "Includes custom design, responsive frontend, and standard backend." },
        3: { label: "Advanced SaaS MVP", text: "Database management, user auth, API integration, and scaling." },
        4: { label: "Enterprise Platform", text: "Full stack engineering, real-time data, security, and global cloud infrastructure." }
    };

    slider.addEventListener('input', function() {
        const val = tiers[this.value];
        priceLabel.innerText = val.label;
        featureText.innerText = val.text;
        
        // Subtle pulse animation when changed
        priceLabel.style.opacity = 0;
        setTimeout(() => {
            priceLabel.style.opacity = 1;
        }, 100);
    });
}

// 7. Live Latency Ping Generator
function updatePing() {
    const pingEl = document.getElementById('ping-val');
    if(pingEl) {
        // Random fluctuation between 20ms and 35ms
        const newPing = Math.floor(Math.random() * (35 - 20 + 1)) + 20;
        pingEl.innerText = newPing;
        
        // Re-run every 2-4 seconds to keep it "alive"
        setTimeout(updatePing, Math.random() * 2000 + 2000);
    }
}
updatePing();