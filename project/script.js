/* ==========================================================================
   DEBUG LIFE WITH F. | CORE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------------------
    // 1. Dynamic Interactive Flashlight Cursor
    // ---------------------------------------------------------
    const cursorGlow = document.getElementById('cursor-glow');
    let lastMove = 0;

    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMove < 16) return; // ~60fps throttle
            lastMove = now;

            cursorGlow.style.opacity = '1';
            cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // ---------------------------------------------------------
    // 2. Hardware-Accelerated Hero Parallax & Navbar Physics
    // ---------------------------------------------------------
    const heroWrapper = document.querySelector('.hero-parallax-wrapper');
    const navBar = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Hero Fade & Push Down
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

    const observerOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    // The Cryptographic Decrypt Engine
    function decryptText(element) {
        // Store original text
        if (!element.dataset.originalText) {
            element.dataset.originalText = element.innerText;
        }
        const originalText = element.dataset.originalText;
        const hackerChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>";
        let iterations = 0;

        clearInterval(element.decryptInterval);

        element.decryptInterval = setInterval(() => {
            element.innerText = originalText.split('').map((char, index) => {
                if (char === ' ') return char; // Preserve spaces
                
                // If the iteration count has passed this letter's index, reveal the real letter
                if (index < iterations) return originalText[index];
                
                // Otherwise, show a random hacker character
                return hackerChars[Math.floor(Math.random() * hackerChars.length)];
            }).join('');

            iterations += 1 / 3; // Speed: reveals 1 actual letter every 3 frames

            if (iterations >= originalText.length) {
                clearInterval(element.decryptInterval);
                element.innerText = originalText; // Ensure perfect final string
            }
        }, 30); // 30ms per frame
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Trigger the CSS 3D tilt/fade up
                entry.target.classList.add('visible');
                
                // 2. Trigger the Matrix Decrypt on any H2 headers inside this section
                const headers = entry.target.querySelectorAll('h2');
                
                // If the target ITSELF is an H2 (like the Core Capabilities header)
                if (entry.target.tagName === 'H2') {
                    decryptText(entry.target);
                } else {
                    headers.forEach(header => decryptText(header));
                }

                // Stop observing once revealed so it doesn't replay when scrolling up
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skeuo-reveal').forEach(el => observer.observe(el));

    // ---------------------------------------------------------
    // 4. Live Typing Terminal Logic for Hero Widget
    // ---------------------------------------------------------
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
        
        if(!container) return; // Safety check

        function typeChar() {
            if (lineIndex < lines.length) {
                if (charIndex < lines[lineIndex].length) {
                    container.innerHTML += lines[lineIndex].charAt(charIndex);
                    charIndex++;
                    // Randomize typing speed for realism (20ms - 70ms per char)
                    setTimeout(typeChar, Math.random() * 50 + 20);
                } else {
                    container.innerHTML += "<br>";
                    lineIndex++;
                    charIndex = 0;
                    // Pause slightly longer between lines
                    setTimeout(typeChar, 400); 
                }
            }
        }
        // Initial delay before typing starts
        setTimeout(typeChar, 800); 
    }
    startTypingEffect();

   // ---------------------------------------------------------
    // 5. Secure Form Submission (Honeypot + Rate Limiting)
    // ---------------------------------------------------------
    const projectForm = document.getElementById('projectForm');
    
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = this;
            const submitBtn = document.getElementById('submitBtn');
            const successMsg = document.getElementById('successMessage');
            const rateWarning = document.getElementById('rateLimitWarning');
            
            // SECURITY 1: Honeypot Check
            const honeyPot = form.elements['_honey'] ? form.elements['_honey'].value : '';
            if (honeyPot) return;

            // SECURITY 2: Rate Limiting
            const lastSubmitTime = localStorage.getItem('lastFormSubmitTime');
            const now = new Date().getTime();
            
            if (lastSubmitTime && (now - lastSubmitTime < 60000)) {
                if(rateWarning) rateWarning.classList.remove('d-none');
                return;
            } else {
                if(rateWarning) rateWarning.classList.add('d-none');
            }
            
            const googleScriptURL = 'https://script.google.com/macros/s/AKfycbyrVffsH87yyXdnUgJksbtp3bj-gWmdAHVUf_jkL6eftmToYcE50h7dCfw06kgHW2609g/exec';
            
            // Update button UI
            submitBtn.innerText = "Encrypting & Transmitting...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            const formData = new FormData(form);

            fetch(googleScriptURL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
            .then(() => {
                localStorage.setItem('lastFormSubmitTime', now.toString());

                // TRIGGER THE CRT GLITCH
                document.documentElement.classList.add('power-surge-active');
                
                // Remove the glitch class after 350ms so it resets
                setTimeout(() => {
                    document.documentElement.classList.remove('power-surge-active');
                }, 350);

                // Hide the form
                form.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                form.style.opacity = '0';
                form.style.transform = 'scale(0.95)';
                
                // Show the success message
                setTimeout(() => {
                    form.classList.add('d-none');
                    successMsg.classList.remove('d-none');
                    
                    successMsg.style.opacity = '0';
                    successMsg.style.transform = 'translateY(20px) scale(0.95)';
                    
                    void successMsg.offsetWidth; // Force UI refresh
                    
                    successMsg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    successMsg.style.opacity = '1';
                    successMsg.style.transform = 'translateY(0) scale(1)';
                }, 300);
            })
            .catch(error => {
                console.error('Error!', error.message);
                submitBtn.innerText = "Submit Request";
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
                alert("Transmission failed. Please check your secure connection.");
            });
        });
    }
    // ---------------------------------------------------------
    // 6. Pricing Estimator Logic
    // ---------------------------------------------------------
    const slider = document.getElementById('complexitySlider');
    const priceLabel = document.getElementById('priceLabel');
    const featureText = document.getElementById('featureText');

    if (slider && priceLabel && featureText) {
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
            
            // Subtle pulse animation when value changes
            priceLabel.style.opacity = 0;
            setTimeout(() => {
                priceLabel.style.opacity = 1;
            }, 100);
        });
    }

    // ---------------------------------------------------------
    // 7. Live Latency Ping Generator
    // ---------------------------------------------------------
    function updatePing() {
        const pingEl = document.getElementById('ping-val');
        if (pingEl) {
            // Random fluctuation between 20ms and 35ms
            const newPing = Math.floor(Math.random() * (35 - 20 + 1)) + 20;
            pingEl.innerText = newPing;
            
            // Re-run recursively every 2-4 seconds
            setTimeout(updatePing, Math.random() * 2000 + 2000);
        }
    }
    // Initiate ping
    updatePing();

}); // End DOMContentLoaded Wrapper

// ---------------------------------------------------------
    // 8. Interactive iPhone Showcase Logic
    // ---------------------------------------------------------
    const phoneGallery = document.getElementById('projectGallery');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (phoneGallery) {
        // Desktop Button Controls
        if (scrollLeftBtn) {
            scrollLeftBtn.addEventListener('click', () => {
                // Scroll left by the width of the iPhone screen
                phoneGallery.scrollBy({ left: -300, behavior: 'smooth' });
            });
        }
        
        if (scrollRightBtn) {
            scrollRightBtn.addEventListener('click', () => {
                // Scroll right by the width of the iPhone screen
                phoneGallery.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }

        // Highlight the currently centered project slide
        const slides = phoneGallery.querySelectorAll('.app-slide');
        
        const updateActiveSlide = () => {
            let minDistance = Infinity;
            let centerSlide = null;
            // Get center of the iPhone viewport
            const galleryCenter = phoneGallery.getBoundingClientRect().left + (phoneGallery.offsetWidth / 2);

            slides.forEach(slide => {
                const slideCenter = slide.getBoundingClientRect().left + (slide.offsetWidth / 2);
                const distance = Math.abs(galleryCenter - slideCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    centerSlide = slide;
                }
            });

            // Update classes for opacity fading effect
            slides.forEach(s => s.classList.remove('active-slide'));
            if (centerSlide) {
                centerSlide.classList.add('active-slide');
            }
        };

        // Run on scroll and on load
        phoneGallery.addEventListener('scroll', updateActiveSlide);
        updateActiveSlide(); // Trigger immediately to set the first slide active
    }


    // ---------------------------------------------------------
    // 9. Interactive Card Spotlight (Mouse Tracking)
    // ---------------------------------------------------------
    const bentoCards = document.querySelectorAll('.bento-card');
    
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set CSS variables for the pseudo-elements to use
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ---------------------------------------------------------
    // 10. Command-K Power Menu Logic
    // ---------------------------------------------------------
    const cmdModal = document.getElementById('cmd-k-modal');
    const cmdInput = document.getElementById('cmd-input');
    const cmdCloseBtn = document.getElementById('cmd-k-close');

    window.toggleCmdK = function() {
        if (!cmdModal) return;
        if (cmdModal.classList.contains('hidden')) {
            cmdModal.classList.remove('hidden');
            setTimeout(() => cmdInput.focus(), 100);
            document.body.style.overflow = 'hidden'; // Lock background scroll
        } else {
            closeCmdK();
        }
    };

    window.closeCmdK = function() {
        if (!cmdModal) return;
        cmdModal.classList.add('hidden');
        cmdInput.value = '';
        document.body.style.overflow = ''; // Unlock scroll
    };

    // Listen for Cmd+K or Ctrl+K
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            toggleCmdK();
        }
        if (e.key === 'Escape' && !cmdModal.classList.contains('hidden')) {
            closeCmdK();
        }
    });

    if(cmdCloseBtn) cmdCloseBtn.addEventListener('click', closeCmdK);

    // ---------------------------------------------------------
    // 11. System Boot Sequence Logic
    // ---------------------------------------------------------
    const bootSequence = document.getElementById('system-bootup');
    const bootText = document.getElementById('boot-text');
    
    if (bootSequence && bootText) {
        const bootLines = [
            "DEBUG_LIFE_WITH_F.OS v1.0",
            "> Mount: /dev/core_system ... [OK]",
            "> Decrypting architecture ... [OK]",
            "> Initializing graphics engine ... [OK]",
            "> SYSTEM.READY"
        ];
        
        let bIndex = 0;
        
        function runBoot() {
            if (bIndex < bootLines.length) {
                bootText.innerHTML += bootLines[bIndex] + "<br>";
                bIndex++;
                setTimeout(runBoot, 150); // Speed of text appearing
            } else {
                // Boot finished, hide the screen
                setTimeout(() => {
                    bootSequence.style.opacity = '0';
                    bootSequence.style.transform = 'scale(1.05)';
                    setTimeout(() => bootSequence.remove(), 600);
                }, 300);
            }
        }
        
        // Start boot sequence immediately
        setTimeout(runBoot, 200);
    }

    // ---------------------------------------------------------
    // 12. iPhone 3D Parallax Tracking & Glare Engine
    // ---------------------------------------------------------
    const phoneWrapper = document.querySelector('.iphone-3d-wrapper');
    const chassis = document.querySelector('.iphone-chassis');

    if (phoneWrapper && chassis) {
        phoneWrapper.addEventListener('mousemove', (e) => {
            // Remove the smooth transition class so it tracks instantly
            chassis.classList.remove('leave-physics');

            const rect = phoneWrapper.getBoundingClientRect();
            // Get mouse position relative to the wrapper
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (Max 12 degrees tilt)
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            // Update CSS variables for 3D rotation
            chassis.style.setProperty('--rot-x', `${rotateX}deg`);
            chassis.style.setProperty('--rot-y', `${rotateY}deg`);

            // Calculate light glare position (moves inverse to the tilt for realism)
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            chassis.style.setProperty('--glare-x', `${glareX}%`);
            chassis.style.setProperty('--glare-y', `${glareY}%`);
        });

        // When mouse leaves, reset everything smoothly to the center
        phoneWrapper.addEventListener('mouseleave', () => {
            chassis.classList.add('leave-physics');
            chassis.style.setProperty('--rot-x', `0deg`);
            chassis.style.setProperty('--rot-y', `0deg`);
            chassis.style.setProperty('--glare-x', `50%`);
            chassis.style.setProperty('--glare-y', `-20%`);
        });
    }
    // ---------------------------------------------------------
    // 13. The Overclock Engine
    // ---------------------------------------------------------
    const overclockToggle = document.getElementById('overclock-toggle');
    window.OVERCLOCK_MODE = false;

    if (overclockToggle) {
        overclockToggle.addEventListener('change', (e) => {
            window.OVERCLOCK_MODE = e.target.checked;
            
            if (window.OVERCLOCK_MODE) {
                document.body.classList.add('overclocked');
                
                // Trigger the violent power surge glitch to simulate hardware switching
                document.documentElement.classList.add('power-surge-active');
                setTimeout(() => {
                    document.documentElement.classList.remove('power-surge-active');
                }, 350);

            } else {
                // Return to normal
                document.body.classList.remove('overclocked');
                
                // Small surge when powering down
                document.documentElement.classList.add('power-surge-active');
                setTimeout(() => {
                    document.documentElement.classList.remove('power-surge-active');
                }, 150);
            }
        });
    }


    // ---------------------------------------------------------
    // 14. Hardware Estimator Logic
    // ---------------------------------------------------------
    const slider = document.getElementById('complexitySlider');
    const sliderFill = document.getElementById('sliderFill');
    const priceLabel = document.getElementById('priceLabel');
    const featureText = document.getElementById('featureText');
    const tierLevel = document.getElementById('tier-level');

    // Define the data for the 4 tiers of architecture
    const projectTiers = {
        1: {
            title: "Landing & Identity",
            desc: "A high-conversion static presence. Ultra-optimized frontend architecture designed for speed and aesthetic authority.",
            tier: "TIER_01"
        },
        2: {
            title: "Standard Web App",
            desc: "Includes custom UI/UX design, responsive frontend architecture, and standard secure database integration.",
            tier: "TIER_02"
        },
        3: {
            title: "B2B / E-Commerce System",
            desc: "Complex logic handling. Includes payment gateways, user authentication, and multi-relational database design.",
            tier: "TIER_03"
        },
        4: {
            title: "Enterprise Multi-Tenant SaaS",
            desc: "Full-scale custom infrastructure. Engineered to handle distinct organizational instances under one core backend.",
            tier: "TIER_04"
        }
    };

    if (slider) {
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            
            // Calculate the width of the glowing LED line
            // Formula: ((value - min) / (max - min)) * 100
            const percentage = ((val - 1) / (4 - 1)) * 100;
            sliderFill.style.width = `${percentage}%`;

            // Update the text content
            const currentData = projectTiers[val];
            
            // Only trigger the animation if the text actually changed
            if (priceLabel.innerText !== currentData.title) {
                priceLabel.innerText = currentData.title;
                featureText.innerText = currentData.desc;
                tierLevel.innerText = currentData.tier;

                // Re-trigger the Matrix Decrypt effect for that elite hacker feel
                // (Assumes you still have the decryptText function from earlier in your script.js)
                if (typeof decryptText === 'function') {
                    // Force a reset of the original text so the decrypt engine catches the new string
                    priceLabel.dataset.originalText = currentData.title; 
                    decryptText(priceLabel);
                }
            }
        });
    }

  // ---------------------------------------------------------
    // 15. Three.js UI/UX Architecture (The Design System Blueprint)
    // ---------------------------------------------------------
    const canvasContainer = document.getElementById('quantum-core-canvas');

    if (canvasContainer && typeof THREE !== 'undefined') {
        
        // 1. Setup Scene, Camera, and Renderer
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050507, 0.03); // Deep spatial fog

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); 
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
        canvasContainer.appendChild(renderer.domElement);
        // Performance optimization: Lower pixel ratio on mobile devices to save battery
        const isMobile = window.innerWidth < 768;
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 15); // Look straight at the floating UI layers

        // 2. Create the "UI Design System" Group
        const uiGroup = new THREE.Group();
        scene.add(uiGroup);

        // Materials for the UI Cards (Frosted Glass + Neon Edges)
        const baseColor = 0x34c759; // var(--led-success)
        const glassMaterial = new THREE.MeshBasicMaterial({ 
            color: baseColor, 
            transparent: true, 
            opacity: 0.05,
            side: THREE.DoubleSide
        });
        const edgeMaterial = new THREE.LineBasicMaterial({ 
            color: baseColor, 
            transparent: true, 
            opacity: 0.4 
        });

        const uiCards = [];

        // Helper function to create a "UI Component" in 3D
        function createUICard(width, height, x, y, z) {
            // The Glass Panel
            const geometry = new THREE.PlaneGeometry(width, height);
            const glassPlane = new THREE.Mesh(geometry, glassMaterial);
            
            // The Wireframe Border (Mimics Figma bounding boxes)
            const edges = new THREE.EdgesGeometry(geometry);
            const wireframe = new THREE.LineSegments(edges, edgeMaterial);
            
            glassPlane.add(wireframe); // Attach border to glass
            glassPlane.position.set(x, y, z);
            
            // Store random physics data for the floating animation
            glassPlane.userData = {
                speedY: (Math.random() * 0.002) + 0.001,
                speedRot: (Math.random() - 0.5) * 0.001,
                floatOffset: Math.random() * Math.PI * 2,
                originalZ: z
            };

            uiGroup.add(glassPlane);
            uiCards.push(glassPlane);
        }

        // Generate a composition of UI elements (Navbars, sidebars, hero cards)
        // Background large elements
        createUICard(12, 6, 0, 1, -8); 
        createUICard(8, 10, -5, 0, -6);
        createUICard(8, 10, 5, 0, -6);
        
        // Midground layout elements
        for(let i=0; i<8; i++) {
            createUICard(
                Math.random() * 4 + 1, // width: 1 to 5
                Math.random() * 3 + 1, // height: 1 to 4
                (Math.random() - 0.5) * 16, // X spread
                (Math.random() - 0.5) * 10, // Y spread
                (Math.random() * 4) - 4 // Z depth (Midground)
            );
        }

        // Foreground interactive elements (buttons, inputs)
        for(let i=0; i<12; i++) {
            createUICard(
                Math.random() * 2 + 0.5, // small width
                Math.random() * 1 + 0.5, // small height
                (Math.random() - 0.5) * 12, 
                (Math.random() - 0.5) * 8, 
                Math.random() * 4 // Z depth (Foreground)
            );
        }

        // 3. Mouse Tracking Physics (Parallax)
        let mouseX = 0;
        let mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX) * 0.001;
            mouseY = (event.clientY - windowHalfY) * 0.001;
        });

        // 4. The Render Engine
        let time = 0;

        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;

            // Parallax tilt the entire design system based on mouse
            uiGroup.rotation.y += (mouseX - uiGroup.rotation.y) * 0.05;
            uiGroup.rotation.x += (mouseY - uiGroup.rotation.x) * 0.05;

            // Animate each UI card
            uiCards.forEach((card, index) => {
                // Gentle floating breath effect
                card.position.y += Math.sin(time * 2 + card.userData.floatOffset) * 0.005;
                
                // --- OVERCLOCK MODE INTEGRATION ---
                if (window.OVERCLOCK_MODE) {
                    glassMaterial.color.setHex(0xff3b30);
                    edgeMaterial.color.setHex(0xff3b30);
                    glassMaterial.opacity = 0.1; // Darker red glass
                    edgeMaterial.opacity = 0.8;  // Harsher red lines

                    // Stress Test Physics: Vibrate and pull towards the camera
                    card.position.x += (Math.random() - 0.5) * 0.02;
                    card.position.y += (Math.random() - 0.5) * 0.02;
                    // Push UI layers aggressively apart on the Z axis
                    card.position.z += (card.userData.originalZ * 1.5 - card.position.z) * 0.1;
                } else {
                    // Normal UI/UX State
                    glassMaterial.color.setHex(baseColor);
                    edgeMaterial.color.setHex(baseColor);
                    glassMaterial.opacity = 0.05;
                    edgeMaterial.opacity = 0.4;
                    
                    // Smooth return to normal Z-depth
                    card.position.z += (card.userData.originalZ - card.position.z) * 0.05;
                }
            });

            renderer.render(scene, camera);
        }

        animate();
        

        // 5. Handle Resizing
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

// ---------------------------------------------------------
    // 18. Cinematic Cinema Mode
    // ---------------------------------------------------------
    
    // Inject the physical overlay into the DOM safely
    if (!document.getElementById('focus-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'focus-overlay';
        document.body.appendChild(overlay);
    }

    const projectCards = document.querySelectorAll('.app-slide');

    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            // Mouse Enters: Trigger Global Darkness & Center Phone
            card.addEventListener('mouseenter', () => {
                document.body.classList.add('focus-active');
                card.classList.add('focus-target');
            });

            // Mouse Leaves: Turn Lights On & Return Phone
            card.addEventListener('mouseleave', () => {
                document.body.classList.remove('focus-active');
                card.classList.remove('focus-target');
            });
        });
    }