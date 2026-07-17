/* ============================================
   SEARCH.JS - Search Functionality
   ============================================ */

const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');

// Search data
const searchData = [
    { title: 'Document Structure', url: 'pages/document.html', keywords: ['html', 'head', 'body', 'document'] },
    { title: 'Text Elements', url: 'pages/text.html', keywords: ['p', 'div', 'span', 'strong', 'em', 'text'] },
    { title: 'Links & Navigation', url: 'pages/links.html', keywords: ['anchor', 'a', 'href', 'link', 'navigation'] },
    { title: 'Lists & Collections', url: 'pages/lists.html', keywords: ['ul', 'ol', 'li', 'list', 'collection'] },
    { title: 'Tables & Data', url: 'pages/tables.html', keywords: ['table', 'tr', 'td', 'th', 'data'] },
    { title: 'Forms & Input', url: 'pages/forms.html', keywords: ['form', 'input', 'button', 'select', 'textarea'] },
    { title: 'Media & Embedding', url: 'pages/media.html', keywords: ['img', 'image', 'video', 'audio', 'media'] },
    { title: 'Semantic HTML5', url: 'pages/semantic.html', keywords: ['semantic', 'article', 'section', 'nav', 'header', 'footer'] }
];

// ============================================
// SEARCH EVENT LISTENERS
// ============================================

if (searchInput) {
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('focus', () => {
        if (searchInput.value) {
            showSuggestions();
        }
    });
}

document.addEventListener('click', (e) => {
    if (e.target !== searchInput && e.target !== searchSuggestions) {
        hideSuggestions();
    }
});

// ============================================
// SEARCH FUNCTION
// ============================================

function performSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query.length === 0) {
        hideSuggestions();
        return;
    }

    const results = searchData.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const keywordMatch = item.keywords.some(keyword => keyword.includes(query));
        return titleMatch || keywordMatch;
    });

    displaySuggestions(results, query);
}

// ============================================
// DISPLAY SUGGESTIONS
// ============================================

function displaySuggestions(results, query) {
    if (!searchSuggestions) return;

    if (results.length === 0) {
        searchSuggestions.innerHTML = `
            <div style="padding: var(--spacing-lg); text-align: center; color: var(--text-light);">
                <p>No results found for "${query}"</p>
            </div>
        `;
    } else {
        searchSuggestions.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-suggestion-item" style="display: block; padding: var(--spacing-md) var(--spacing-lg); border-bottom: 1px solid var(--light-dark); text-decoration: none; color: var(--text); transition: background var(--transition-fast);" onmouseover="this.style.background='var(--light)'; this.style.color='var(--primary)';" onmouseout="this.style.background='transparent'; this.style.color='var(--text);'">
                <strong>${result.title}</strong>
                <p style="font-size: 0.85rem; color: var(--text-light); margin: var(--spacing-xs) 0 0 0;">${result.keywords.join(', ')}</p>
            </a>
        `).join('');
    }

    showSuggestions();
}

// ============================================
// SHOW/HIDE SUGGESTIONS
// ============================================

function showSuggestions() {
    if (searchSuggestions) {
        searchSuggestions.classList.add('active');
    }
}

function hideSuggestions() {
    if (searchSuggestions) {
        searchSuggestions.classList.remove('active');
    }
}

// ============================================
// SEARCH SHORTCUTS
// ============================================

// Ctrl/Cmd + K focuses search
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
});
