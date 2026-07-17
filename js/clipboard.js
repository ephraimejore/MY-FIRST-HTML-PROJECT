/* ============================================
   CLIPBOARD.JS - Copy to Clipboard Functionality
   ============================================ */

// ============================================
// COPY CODE BUTTON
// ============================================

function initializeClipboard() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach((block, index) => {
        // Create a wrapper
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '📋 Copy';
        copyBtn.setAttribute('aria-label', 'Copy code');
        copyBtn.style.cssText = `
            position: absolute;
            top: var(--spacing-md);
            right: var(--spacing-md);
            padding: var(--spacing-sm) var(--spacing-md);
            background: var(--primary);
            color: white;
            border: none;
            border-radius: var(--radius-md);
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all var(--transition-normal);
            z-index: 10;
        `;
        
        // Copy on click
        copyBtn.addEventListener('click', () => copyCode(block, copyBtn));
        
        wrapper.appendChild(copyBtn);
    });
}

// ============================================
// COPY FUNCTION
// ============================================

function copyCode(codeBlock, button) {
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copied!';
        button.style.background = 'var(--success)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = 'var(--primary)';
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        button.innerHTML = '✅ Copied!';
        button.style.background = 'var(--success)';
        
        setTimeout(() => {
            button.innerHTML = '📋 Copy';
            button.style.background = 'var(--primary)';
        }, 2000);
    });
}

// ============================================
// COPY TABLE DATA
// ============================================

function enableTableCopy() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            row.style.cursor = 'pointer';
            row.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A') {
                    const rowText = Array.from(row.cells)
                        .map(cell => cell.textContent.trim())
                        .join('\t');
                    
                    navigator.clipboard.writeText(rowText).then(() => {
                        showNotification('Row copied to clipboard');
                    });
                }
            });
        });
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, duration = 2000) {
    const notification = document.createElement('div');
    notification.className = 'clipboard-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        animation: slide-in-up 0.3s ease-out;
        z-index: 1000;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fade-out 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeClipboard();
        enableTableCopy();
    });
} else {
    initializeClipboard();
    enableTableCopy();
}
