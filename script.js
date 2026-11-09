// ====================================
// Portfolio Website - JavaScript
// Muhammad Faqih Muqoddam
// ====================================

// ====================================
// Theme Management
// ====================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load theme from localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.setAttribute('aria-pressed', 'true');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
});

// ====================================
// Navigation Management
// ====================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Add scrolled class to navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(hamburger.classList.contains('active')));
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (correspondingLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink.classList.add('active');
            } else {
                correspondingLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Back to Top Button
// ====================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// Project Modal
// ====================================
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = projectModal.querySelector('.modal-overlay');
const modalBody = document.getElementById('modalBody');

// Project data
const projectsData = {
    'simas': {
        title: 'SIMAS Asset Management',
        image: 'assets/Simas.jpeg',
        description: 'Aplikasi manajemen aset yang dikembangkan menggunakan Laravel. Proyek ini mencakup alur akses pengguna dan pengembangan fitur pengelolaan aset.',
        technologies: ['Laravel', 'PHP', 'PostgreSQL', 'Git'],
        role: 'Pengembangan aplikasi',
        duration: 'Dalam pengembangan',
        features: ['Pengelolaan aset sesuai implementasi proyek', 'Pemisahan akses Admin dan User', 'Pengembangan dan pengujian alur aplikasi'],
        github: 'https://github.com/KarelKrnlius/simas-asset-management',
        demo: ''
    },
    'knotted': {
        title: 'KNOTTED',
        image: 'assets/Knotted.png',
        description: 'Website e-commerce modern untuk produk handmade crochet dengan desain editorial yang elegan. Fitur lengkap untuk customer dan admin, termasuk shopping cart, checkout, payment verification, dan order tracking.',
        technologies: ['Laravel 12', 'Supabase', 'Tailwind CSS', 'PHP', 'Vite'],
        role: 'Full Stack Development',
        duration: 'Completed (2024)',
        features: [
            'Shopping cart dan checkout system',
            'Payment verification (Bank Transfer & COD)',
            'Product & category management',
            'Order tracking dan history',
            'Role-based access control (Admin & Customer)',
            'Responsive design dengan brand aesthetic',
            'Image upload & stock management'
        ],
        github: 'https://github.com/faqihanakbaik/KNOTTED',
        demo: 'https://knotted-production.up.railway.app/'
    },
    'bank': {
        title: 'Bank Melasa Syariah',
        image: 'assets/Bank.jpeg',
        description: 'Website bertema layanan perbankan syariah yang menjadi bagian dari portofolio web. Demo yang pernah dibagikan: bank-melasa-syariah.netlify.app.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        role: 'Proyek web portofolio',
        duration: 'Completed',
        features: [
            'Antarmuka website bertema perbankan syariah',
            'Penyajian informasi melalui halaman web',
            'Pengembangan tampilan dengan HTML, CSS, dan JavaScript',
            'Design responsive untuk berbagai perangkat'
        ],
        github: 'https://github.com/faqihanakbaik/lpss',
        demo: 'http://bank-melasa-syariah.netlify.app/'
    },
    'portfolio': {
        title: 'Portfolio Website',
        image: 'assets/logo.png',
        description: 'Website portfolio pribadi yang menampilkan profil, proyek, dan informasi kontak dengan desain responsif dan modern. Menggunakan HTML, CSS, dan JavaScript murni.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        role: 'Frontend Development',
        duration: 'Completed (2024)',
        features: [
            'Design modern dan profesional',
            'Dark mode toggle',
            'Section tabs untuk pendidikan dan proyek',
            'Responsive untuk semua device',
            'Interactive UI dengan smooth animations',
            'SEO optimized'
        ],
        github: 'https://github.com/ultramennmeerah/Portofolio',
        demo: ''
    },
    'eventy-mobile': {
        title: 'EVENTY — Mobile App',
        image: 'assets/Eventty.jpeg',
        description: 'Aplikasi mobile untuk School Event Management System yang terintegrasi dengan backend Laravel dan Supabase. Fokus fitur meliputi informasi acara, pendaftaran, pengumuman, dan sertifikat digital untuk pemenang.',
        technologies: ['Flutter', 'Dart', 'Supabase', 'Laravel API'],
        role: 'Mobile Development',
        duration: 'Dalam pengembangan',
        features: [
            'Informasi dan pengumuman acara',
            'Pendaftaran acara',
            'Dashboard siswa',
            'Sertifikat digital untuk pemenang',
            'Push notifications',
            'Real-time updates dengan Supabase'
        ],
        github: 'https://github.com/GEraldY56/EVENTTY',
        demo: ''
    }
};

// Open modal with project details
projectCards.forEach(card => {
    const viewDetailBtn = card.querySelector('.btn-view-detail');
    
    if (viewDetailBtn) {
        viewDetailBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    }
    
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openProjectModal(projectId);
    });
    card.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target === card) {
            e.preventDefault();
            openProjectModal(card.getAttribute('data-project'));
        }
    });
});

function openProjectModal(projectId) {
    const project = projectsData[projectId];
    
    if (!project) return;
    
    // Create modal content
    const modalContent = `
        <img src="${project.image}" alt="${project.title}" class="modal-project-image">
        <h2 class="modal-project-title">${project.title}</h2>
        <p class="modal-project-description">${project.description}</p>
        
        <div class="modal-project-details">
            <div class="modal-detail-item">
                <strong>Peran:</strong>
                <span>${project.role}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Status:</strong>
                <span>${project.duration}</span>
            </div>
            <div class="modal-detail-item">
                <strong>Teknologi:</strong>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <h3 class="modal-subheading">Fitur utama</h3>
        <ul class="modal-feature-list">
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <div class="modal-project-links">
            ${project.github ? `<a href="${project.github}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Lihat Kode
            </a>` : ''}
            ${project.demo ? `<a href="${project.demo}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Buka Demo
            </a>` : ''}
            ${(!project.github && !project.demo) ? '<p class="form-note">Repository dan demo publik belum ditautkan.</p>' : ''}
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Close modal events
modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', closeProjectModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// ====================================
// Dynamic Copyright Year
// ====================================
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ====================================
// Intersection Observer for Subtle Animations
// ====================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for subtle fade-in animation
const animateElements = document.querySelectorAll('.timeline-item, .project-card, .certificate-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
});

// ====================================
// Horizontal Scroll for Certificates on Mobile
// ====================================
const certificatesWrapper = document.querySelector('.certificates-wrapper');

if (certificatesWrapper && window.innerWidth <= 768) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    certificatesWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        certificatesWrapper.style.cursor = 'grabbing';
        startX = e.pageX - certificatesWrapper.offsetLeft;
        scrollLeft = certificatesWrapper.scrollLeft;
    });
    
    certificatesWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        certificatesWrapper.style.cursor = 'grab';
    });
    
    certificatesWrapper.addEventListener('mouseup', () => {
        isDown = false;
        certificatesWrapper.style.cursor = 'grab';
    });
    
    certificatesWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - certificatesWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        certificatesWrapper.scrollLeft = scrollLeft - walk;
    });
}

// ====================================
// Performance Optimization
// ====================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
    updateActiveLink();
}, 100);

window.removeEventListener('scroll', updateActiveLink);
window.addEventListener('scroll', debouncedScrollHandler);

// ====================================
// Lazy Loading Images (Simplified)
// ====================================
// Modern browsers support native lazy loading
// No additional code needed - just use loading="lazy" in HTML

// ====================================
// Page Load - Smooth Entry
// ====================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});


// ====================================
// Education Tabs Management
// ====================================
const educationTabs = document.querySelectorAll('.education-tab');
const educationContents = document.querySelectorAll('.education-tab-content');

educationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        educationTabs.forEach(t => t.classList.remove('active'));
        educationContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const targetTab = tab.getAttribute('data-tab');
        const targetContent = document.getElementById(`${targetTab}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});


// ====================================
// Project Tabs Management
// ====================================
const projectTabs = document.querySelectorAll('.project-tab');
const projectContents = document.querySelectorAll('.project-tab-content');

projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        projectTabs.forEach(t => t.classList.remove('active'));
        projectContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const targetTab = tab.getAttribute('data-tab');
        const targetContent = document.getElementById(`${targetTab}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});


// ====================================
// Project Search Functionality
// ====================================
const projectSearchInput = document.getElementById('projectSearch');
const searchClearBtn = document.getElementById('searchClear');
const searchResultsInfo = document.getElementById('searchResultsInfo');

if (projectSearchInput) {
    projectSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Show/hide clear button
        if (searchTerm) {
            searchClearBtn.style.display = 'flex';
        } else {
            searchClearBtn.style.display = 'none';
            searchResultsInfo.style.display = 'none';
        }
        
        filterProjects(searchTerm);
    });
    
    // Clear search
    searchClearBtn.addEventListener('click', () => {
        projectSearchInput.value = '';
        searchClearBtn.style.display = 'none';
        searchResultsInfo.style.display = 'none';
        filterProjects('');
    });
}

function filterProjects(searchTerm) {
    const activeTab = document.querySelector('.project-tab-content.active');
    if (!activeTab) return;
    
    const projectCards = activeTab.querySelectorAll('.project-card');
    let visibleCount = 0;
    
    projectCards.forEach(card => {
        // Get project data
        const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
        
        // Combine all searchable text
        const searchableText = `${title} ${description} ${tags}`;
        
        // Check if search term matches
        if (searchTerm === '' || searchableText.includes(searchTerm)) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Remove existing no results message
    const existingMsg = activeTab.querySelector('.no-results-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Show results info
    if (searchTerm) {
        if (visibleCount > 0) {
            searchResultsInfo.textContent = `Ditemukan ${visibleCount} proyek`;
            searchResultsInfo.style.display = 'block';
        } else {
            searchResultsInfo.textContent = 'Tidak ada proyek yang cocok';
            searchResultsInfo.style.display = 'block';
            
            // Show no results message
            const grid = activeTab.querySelector('.projects-grid');
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results-message';
            noResultsDiv.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <h3>Proyek tidak ditemukan</h3>
                <p>Coba kata kunci lain atau lihat semua proyek</p>
            `;
            grid.appendChild(noResultsDiv);
        }
    } else {
        searchResultsInfo.style.display = 'none';
    }
}

// Reset search when switching tabs
projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        if (projectSearchInput) {
            projectSearchInput.value = '';
            searchClearBtn.style.display = 'none';
            searchResultsInfo.style.display = 'none';
            
            // Remove all hidden classes
            document.querySelectorAll('.project-card.hidden').forEach(card => {
                card.classList.remove('hidden');
            });
            
            // Remove no results messages
            document.querySelectorAll('.no-results-message').forEach(msg => {
                msg.remove();
            });
        }
    });
});
