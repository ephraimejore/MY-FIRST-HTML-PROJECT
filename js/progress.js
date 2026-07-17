/* ============================================
   PROGRESS.JS - Reading Progress & Scroll Tracking
   ============================================ */

const scrollProgressBar = document.querySelector('.scroll-progress');
const readingTimeElement = document.querySelector('.reading-time');

// ============================================
// SCROLL PROGRESS BAR
// ============================================

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    if (scrollProgressBar) {
        scrollProgressBar.style.width = `${scrolled}%`;
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ============================================
// READING TIME CALCULATION
// ============================================

function calculateReadingTime() {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    
    const text = mainContent.textContent;
    const wordCount = text.split(/\s+/).length;
    const wordsPerMinute = 200; // Average reading speed
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    if (readingTimeElement) {
        readingTimeElement.textContent = `${readingTime} min read`;
    }
    
    return readingTime;
}

// ============================================
// SCROLL POSITION TRACKING
// ============================================

const scrollPositionKey = 'scrollPosition_' + window.location.pathname;

function saveScrollPosition() {
    sessionStorage.setItem(scrollPositionKey, window.scrollY);
}

function restoreScrollPosition() {
    const savedPosition = sessionStorage.getItem(scrollPositionKey);
    if (savedPosition) {
        setTimeout(() => {
            window.scrollTo(0, parseInt(savedPosition));
        }, 100);
    }
}

// Save scroll position before leaving
window.addEventListener('beforeunload', saveScrollPosition);

// Restore scroll position on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restoreScrollPosition);
} else {
    restoreScrollPosition();
}

// ============================================
// READING PROGRESS TRACKER
// ============================================

function trackReadingProgress() {
    const articles = document.querySelectorAll('article, main');
    if (articles.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rect = entry.target.getBoundingClientRect();
                const progress = ((window.innerHeight - rect.top) / window.innerHeight) * 100;
                
                // Track progress (can be used for analytics)
                if (progress > 50) {
                    entry.target.classList.add('viewed');
                }
            }
        });
    }, { threshold: 0.5 });
    
    articles.forEach(article => observer.observe(article));
}

// ============================================
// TIME ON PAGE TRACKER
// ============================================

let timeOnPage = 0;
let sessionStartTime = Date.now();

setInterval(() => {
    timeOnPage = Math.floor((Date.now() - sessionStartTime) / 1000);
}, 1000);

window.addEventListener('beforeunload', () => {
    // Can send analytics here
    console.log(`Time on page: ${timeOnPage} seconds`);
});

// ============================================
// SECTION READING TIME
// ============================================

function calculateSectionReadingTime() {
    const sections = document.querySelectorAll('section');
    const wordsPerMinute = 200;
    
    sections.forEach(section => {
        const text = section.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        
        const badge = document.createElement('span');
        badge.className = 'reading-time-badge';
        badge.textContent = `${readingTime} min`;
        badge.style.cssText = `
            display: inline-block;
            padding: var(--spacing-xs) var(--spacing-sm);
            background: var(--primary);
            color: white;
            border-radius: var(--radius-sm);
            font-size: 0.8rem;
            margin-left: var(--spacing-md);
        `;
        
        const heading = section.querySelector('h1, h2, h3');
        if (heading) {
            heading.appendChild(badge);
        }
    });
}

// ============================================
// INITIALIZE
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        calculateReadingTime();
        trackReadingProgress();
        calculateSectionReadingTime();
    });
} else {
    calculateReadingTime();
    trackReadingProgress();
    calculateSectionReadingTime();
}
