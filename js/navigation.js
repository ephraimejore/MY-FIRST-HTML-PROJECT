/* ============================================
   NAVIGATION.JS - Navigation & Menu Logic
   ============================================ */

const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');

// ============================================
// ACTIVE LINK TRACKING
// ============================================

window.addEventListener('scroll', updateActiveLink);

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// BREADCRUMB NAVIGATION
// ============================================

function generateBreadcrumb() {
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    if (!breadcrumbContainer) return;

    const currentPage = document.title;
    const breadcrumb = [
        { name: 'Home', url: '/' },
        { name: currentPage, url: '#' }
    ];

    breadcrumbContainer.innerHTML = breadcrumb
        .map((item, index) => `
            <a href="${item.url}" class="breadcrumb-link">${item.name}</a>
            ${index < breadcrumb.length - 1 ? '<span class="breadcrumb-separator">/</span>' : ''}
        `)
        .join('');
}

// ============================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu
                if (navMenu) navMenu.classList.remove('active');
            }
        }
    });
});

// ============================================
// SIDEBAR NAVIGATION (for documentation pages)
// ============================================

const sidebarLinks = document.querySelectorAll('.sidebar-link');

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============================================
// PAGINATION (for documentation pages)
// ============================================

function setupPagination() {
    const prevBtn = document.querySelector('.pagination-prev');
    const nextBtn = document.querySelector('.pagination-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const href = prevBtn.getAttribute('data-href');
            if (href) window.location.href = href;
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const href = nextBtn.getAttribute('data-href');
            if (href) window.location.href = href;
        });
    }
}

// Initialize pagination on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPagination);
} else {
    setupPagination();
}

// ============================================
// TABLE OF CONTENTS
// ============================================

function generateTableOfContents() {
    const tocContainer = document.querySelector('.table-of-contents');
    if (!tocContainer) return;

    const headings = document.querySelectorAll('main h2, main h3');
    const toc = [];

    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        toc.push({
            level: heading.tagName.toLowerCase(),
            text: heading.textContent,
            id: heading.id
        });
    });

    if (toc.length === 0) return;

    let html = '<ul class="toc-list">';
    toc.forEach(item => {
        const indent = item.level === 'h3' ? 'style="margin-left: var(--spacing-lg);"' : '';
        html += `
            <li ${indent}>
                <a href="#${item.id}" class="toc-link">${item.text}</a>
            </li>
        `;
    });
    html += '</ul>';

    tocContainer.innerHTML = html;
}

// Initialize TOC on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateTableOfContents);
} else {
    generateTableOfContents();
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    }
});
