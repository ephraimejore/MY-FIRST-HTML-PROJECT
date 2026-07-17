/* ============================================
   THEME.JS - Dark Mode & Theme Management
   ============================================ */

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;

// ============================================
// THEME INITIALIZATION
// ============================================

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    applyTheme(theme);
    updateThemeIcon(theme);
}

// ============================================
// APPLY THEME
// ============================================

function applyTheme(theme) {
    if (theme === 'dark') {
        bodyElement.classList.add('dark-mode');
        htmlElement.style.colorScheme = 'dark';
    } else {
        bodyElement.classList.remove('dark-mode');
        htmlElement.style.colorScheme = 'light';
    }
    localStorage.setItem('theme', theme);
}

// ============================================
// UPDATE THEME ICON
// ============================================

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ============================================
// THEME TOGGLE
// ============================================

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = bodyElement.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        updateThemeIcon(newTheme);
    });
}

// ============================================
// SYSTEM THEME CHANGE LISTENER
// ============================================

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme');
    
    // Only apply system theme if user hasn't set a preference
    if (!savedTheme) {
        applyTheme(newTheme);
        updateThemeIcon(newTheme);
    }
});

// ============================================
// KEYBOARD SHORTCUT (Alt + T for theme toggle)
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        if (themeToggle) themeToggle.click();
    }
});

// ============================================
// INITIALIZE ON DOM READY
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    initializeTheme();
}

// ============================================
// THEME COLORS MANAGEMENT
// ============================================

const themes = {
    light: {
        '--primary': '#6366f1',
        '--secondary': '#ec4899',
        '--text': '#111827',
        '--background': '#ffffff'
    },
    dark: {
        '--primary': '#818cf8',
        '--secondary': '#f472b6',
        '--text': '#f1f5f9',
        '--background': '#0f172a'
    }
};

function setThemeColors(theme) {
    const colors = themes[theme];
    if (!colors) return;
    
    Object.entries(colors).forEach(([key, value]) => {
        htmlElement.style.setProperty(key, value);
    });
}

// ============================================
// ACCESSIBILITY - REDUCED MOTION
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    htmlElement.style.scrollBehavior = 'auto';
    bodyElement.style.animationDuration = '0.01ms';
    bodyElement.style.transitionDuration = '0.01ms';
}
