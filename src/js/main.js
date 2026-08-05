// ─── URL Routing System ──────────────────────────────────────────────────────
// Maps clean URL paths ↔ section IDs
const ROUTE_MAP = {
    '/':             'hero',
    '/home':         'hero',
    '/how-it-works': 'approach',
    '/services':     'services',
    '/for-investors':'opportunity',
    '/get-involved': 'engage',
    '/get-in-touch': 'engage',
    '/faq':          'faq',
    '/questions':    'faq',
};

// Reverse map: sectionId → canonical URL
const SECTION_URL = {
    'hero':        '/home',
    'approach':    '/how-it-works',
    'services':    '/services',
    'opportunity': '/for-investors',
    'engage':      '/get-involved',
    'faq':         '/faq',
};

function scrollToSection(id, smooth = true) {
    const el = document.getElementById(id) || document.querySelector(`.${id}`) || document.querySelector(`[data-section="${id}"]`);
    if (el) {
        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' });
    } else if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'instant' });
    }
}

// Intercept all [data-section] links for SPA navigation
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-section], a[href^="/"]');
    if (!link) return;

    const href = link.getAttribute('href');
    const sectionId = link.dataset.section || ROUTE_MAP[href];
    if (!sectionId) return; // Let browser handle unknown paths

    e.preventDefault();
    const canonicalUrl = SECTION_URL[sectionId] || href;
    history.pushState({ section: sectionId }, '', canonicalUrl);
    scrollToSection(sectionId, true);
});

// Handle browser back/forward navigation
window.addEventListener('popstate', (e) => {
    const sectionId = e.state?.section || ROUTE_MAP[location.pathname] || 'hero';
    scrollToSection(sectionId, true);
});

// On page load: if URL path matches a section, scroll there
document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.replace(/\/$/, '') || '/';
    const targetSection = ROUTE_MAP[path];
    if (targetSection && targetSection !== 'hero') {
        setTimeout(() => scrollToSection(targetSection, false), 100);
    }
    // Ensure the URL is canonical on load
    const canonical = SECTION_URL[targetSection || 'hero'] || '/home';
    if (location.pathname === '/' || location.pathname === '') {
        history.replaceState({ section: 'hero' }, '', '/home');
    }
});

// Track active section via IntersectionObserver → update URL
const SECTION_IDS = ['hero', 'approach', 'services', 'opportunity', 'engage', 'faq'];
let scrollTicking = false;

function initSectionObserver() {
    const sectionEls = SECTION_IDS.map(id =>
        document.getElementById(id) ||
        document.querySelector(`section.${id}`) ||
        null
    ).filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id || entry.target.className.split(' ')[0];
                const sectionKey = SECTION_IDS.find(s => entry.target.id === s || entry.target.classList.contains(s));
                if (!sectionKey) return;
                const url = SECTION_URL[sectionKey] || '/home';
                if (location.pathname !== url) {
                    history.replaceState({ section: sectionKey }, '', url);
                }
            }
        });
    }, { threshold: 0.4 });

    sectionEls.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initSectionObserver);
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    // Nav shrink on scroll
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    // Hero video fade-in
    const heroVideo = document.querySelector('.hero video');
    if (heroVideo) {
        if (heroVideo.readyState >= 3) {
            heroVideo.classList.add('loaded');
        } else {
            heroVideo.addEventListener('canplay', () => heroVideo.classList.add('loaded'));
        }
    }

    // Mobile Nav
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const iconMenu = document.querySelector('.icon-menu');
    const iconClose = document.querySelector('.icon-close');

    function toggleMenu(forceClose = false) {
        if (!navToggle || !navLinks) return;
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        const willExpand = forceClose ? false : !isExpanded;

        navToggle.setAttribute('aria-expanded', willExpand);
        if (willExpand) {
            navLinks.classList.add('active');
            if(iconMenu) iconMenu.style.display = 'none';
            if(iconClose) iconClose.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent bg scrolling
            navLinks.focus();
        } else {
            navLinks.classList.remove('active');
            if(iconMenu) iconMenu.style.display = 'block';
            if(iconClose) iconClose.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    document.addEventListener('click', (e) => {
        if (navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                toggleMenu(true);
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
            toggleMenu(true);
            navToggle.focus();
        }
    });

    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });
    }

    // Scroll reveal with stagger logic
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const el = e.target;
                    // Auto-stagger for grid/flex siblings
                    const parent = el.parentElement;
                    if (parent) {
                        const revealSiblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
                        if (revealSiblings.length > 1) {
                            const index = revealSiblings.indexOf(el);
                            el.style.transitionDelay = `${index * 0.12}s`;
                        }
                    }
                    el.classList.add('in');
                    // Clean up delay after animation to not break hover states
                    setTimeout(() => { el.style.transitionDelay = '0s'; }, 1000);
                    io.unobserve(el); // Only reveal once
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
        revealEls.forEach(el => io.observe(el));
    }

    // Scroll Narrative Logic for Workflow Path
    const workflowLine = document.querySelector('.workflow-container');
    const animatedPath = document.querySelector('.animated-path');
    
    if (workflowLine && animatedPath) {
        window.addEventListener('scroll', () => {
            const rect = workflowLine.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Start drawing when the container enters the middle of viewport
            if (rect.top < viewportHeight * 0.7 && rect.bottom > 0) {
                const scrollPercentage = 1 - Math.max(0, rect.top / (viewportHeight * 0.7));
                
                // Map scrollPercentage (0 to 1) to dashoffset (1000 to 0)
                const offset = 1000 - (Math.min(1, scrollPercentage) * 1000);
                animatedPath.style.strokeDashoffset = offset;
                animatedPath.style.transition = 'none'; // Follow scroll exactly
            } else if (rect.top >= viewportHeight * 0.7) {
                animatedPath.style.strokeDashoffset = 1000;
            }
        });
    }

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
    const formPanels = document.querySelectorAll('.form-panel');

    function selectTab(name) {
        tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
        formPanels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + name));
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => selectTab(btn.dataset.tab));
    });

    const tabLinks = document.querySelectorAll('[data-tab-target]');
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            selectTab(link.dataset.tabTarget);
        });
    });

    // FAQ accordion
    function toggleFaq(headEl) {
        const item = headEl.parentElement;
        const answer = item.querySelector('.faq-a');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item.active').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-a').style.maxHeight = null;
            const activeHead = i.querySelector('.faq-q');
            if (activeHead) activeHead.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            headEl.setAttribute('aria-expanded', 'true');
        } else {
            headEl.setAttribute('aria-expanded', 'false');
        }
    }

    const faqQs = document.querySelectorAll('.faq-q');
    faqQs.forEach(q => {
        q.addEventListener('click', () => toggleFaq(q));
        q.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaq(q);
            }
        });
    });

    // ─── EmailJS Configuration ───────────────────────────────────────────────
    // EmailJS configuration for production use.
    // Dashboard: https://dashboard.emailjs.com/
    const EMAILJS_CONFIG = {
        publicKey:  'nuejaTx8qu967L6zN',       // Account > API Keys > Public Key
        serviceId:  'service_nlz3mhi',         // Email Services > Service ID
        templates: {
            investor: 'template_qlh5u5w',      // Template 1: Investor only
            customer: 'template_3jgganc',      // Template 2: shared for Customer + Partner
            partner:  'template_3jgganc',      // Template 2: shared for Customer + Partner
        }
    };

    // Initialise EmailJS once
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    }

    // Normalize form fields into common variable names for EmailJS templates.
    // Investor keeps its own field IDs (inv-*).
    // Customer (cust-*) and Partner (part-*) are mapped to the same shared template fields.
    function collectFormData(form, key) {
        const raw = { form_name: form.dataset.formName || 'Inquiry', form_type: key };
        form.querySelectorAll('input, select, textarea').forEach(el => {
            if (el.id) raw[el.id] = el.value || '';
        });

        if (key === 'investor') {
            // Investor: pass fields as-is, template uses {{inv-name}} etc.
            return raw;
        }

        // Shared template for customer + partner — normalize to common keys
        const normalized = {
            form_name:    raw.form_name,
            form_type:    key === 'customer' ? 'Customer / Pilot Inquiry' : 'Partner / Brand / Supplier',
            contact_name: raw['cust-name']    || raw['part-name']    || '',
            contact_org:  raw['cust-org']     || raw['part-company'] || '',
            contact_email:raw['cust-email']   || raw['part-email']   || '',
            contact_phone:raw['cust-phone']   || raw['part-phone']   || '',
            contact_city: raw['cust-city']    || raw['part-city']    || '',
            detail_1_label: key === 'customer' ? 'Organization Type' : 'Partnership Type',
            detail_1_value: raw['cust-type']  || raw['part-type']    || '',
            detail_2_label: key === 'customer' ? 'Project Size'       : '',
            detail_2_value: raw['cust-size']  || '',
            detail_3_label: key === 'customer' ? 'Project Type'       : '',
            detail_3_value: raw['cust-proj']  || '',
            message:      raw['cust-message'] || raw['part-message'] || '',
        };
        return normalized;
    }

    // Fire-and-forget: send via EmailJS, don't wait for result before redirect
    function sendEmailBackground(key, templateParams) {
        const templateId = EMAILJS_CONFIG.templates[key];
        if (typeof emailjs === 'undefined' || !templateId || templateId.startsWith('YOUR_')) {
            console.warn('EmailJS not configured — skipping send. Fill in EMAILJS_CONFIG credentials.');
            return;
        }
        // Send in background — do NOT await, redirect immediately
        emailjs.send(EMAILJS_CONFIG.serviceId, templateId, templateParams)
            .catch(err => console.error('EmailJS background send failed:', err));
    }
    // ─────────────────────────────────────────────────────────────────────────

    // Form Content for Success States
    const successContent = {
        investor: {
            label: "Investor Inquiry Received",
            heading: "Thank you for your interest in PaintBharat Co",
            body: "We've received your inquiry and appreciate your interest in PaintBharat Co. Our team will review your submission and reach out if there is a suitable opportunity to continue the conversation."
        },
        customer: {
            label: "Request Received",
            heading: "Thanks for reaching out!",
            body: "We've received your request successfully. A member of the PaintBharat team will review your requirements and contact you with the next steps."
        },
        partner: {
            label: "Application Received",
            heading: "Thank you for your interest in partnering with PaintBharat Co",
            body: "We've received your application and our team will review the information provided. If your profile aligns with our onboarding requirements, we'll get in touch."
        }
    };

    // Validation Logic
    function clearValidationErrors(form) {
        form.querySelectorAll('.field-error').forEach(e => e.remove());
        form.querySelectorAll('[aria-invalid="true"]').forEach(e => {
            e.setAttribute('aria-invalid', 'false');
            e.removeAttribute('aria-describedby');
        });
    }

    function showFieldError(input, message) {
        input.setAttribute('aria-invalid', 'true');
        let errorSpan = input.parentElement.querySelector('.field-error');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'field-error';
            errorSpan.setAttribute('aria-live', 'polite');
            const errId = input.id + '-error';
            errorSpan.id = errId;
            input.parentElement.appendChild(errorSpan);
            input.setAttribute('aria-describedby', errId);
        }
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }

    function validateForm(form) {
        clearValidationErrors(form);
        let isValid = true;
        let firstErrorInput = null;

        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            let val = input.value;
            if (typeof val === 'string') {
                val = val.trim();
                input.value = val;
            }

            if (input.hasAttribute('required') && !val) {
                showFieldError(input, 'This field is required.');
                isValid = false;
                if (!firstErrorInput) firstErrorInput = input;
            } else if (input.type === 'email' && val) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val)) {
                    showFieldError(input, 'Please enter a valid email address.');
                    isValid = false;
                    if (!firstErrorInput) firstErrorInput = input;
                }
            } else if (input.type === 'tel' && val) {
                // India-friendly phone validation
                const phoneRegex = /^[6-9]\d{9}$/;
                const cleaned = val.replace(/\D/g, '');
                if (cleaned.length > 0 && !phoneRegex.test(cleaned)) {
                    showFieldError(input, 'Please enter a valid 10-digit Indian phone number.');
                    isValid = false;
                    if (!firstErrorInput) firstErrorInput = input;
                }
            }
        });

        if (firstErrorInput) firstErrorInput.focus();
        return isValid;
    }

    // Submission Logic — Fire-and-Forget
    async function handleFormSubmit(evt, key) {
        evt.preventDefault();

        const form = evt.target;
        if (!validateForm(form)) return;

        const btn = form.querySelector('.pb-submit-btn');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        // 1. Collect + normalize data
        const templateParams = collectFormData(form, key);

        // 2. Fire email in background — do NOT await
        sendEmailBackground(key, templateParams);

        // 3. Redirect immediately — no waiting
        const redirectUrl = form.dataset.redirectUrl || 'thank-you/investor/index.html';
        window.location.href = redirectUrl;
    }

    // Success State Renderer
    function showSuccessState(key) {
        const content = successContent[key];
        if (!content) return;

        // Hide tabs and active panels
        document.querySelector('.tabs').style.display = 'none';
        document.querySelectorAll('.form-panel').forEach(p => p.style.display = 'none');
        
        // Populate success view
        document.getElementById('success-label').textContent = content.label;
        document.getElementById('success-heading').textContent = content.heading;
        document.getElementById('success-body').textContent = content.body;
        
        const successView = document.getElementById('success-view');
        successView.style.display = 'block';
        
        // Accessibility: shift focus to success container
        successView.focus();
    }

    // Back to Homepage button
    const btnSuccessBack = document.getElementById('btn-success-back');
    if (btnSuccessBack) {
        btnSuccessBack.addEventListener('click', () => {
            document.getElementById('success-view').style.display = 'none';
            document.querySelector('.tabs').style.display = 'flex';
            
            // Restore active panel based on active tab
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab) {
                const panelId = 'panel-' + activeTab.dataset.tab;
                document.getElementById(panelId).style.display = 'block';
                activeTab.focus();
            }
        });
    }

    const forms = document.querySelectorAll('.pb-form');
    forms.forEach(form => {
        const key = form.dataset.formKey;
        if (key) {
            form.setAttribute('novalidate', 'true'); // We handle validation manually
            form.addEventListener('submit', (evt) => handleFormSubmit(evt, key));
        }
    });
});
