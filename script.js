document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Icon definitions
    const sunIcon = '<i class="fas fa-sun"></i>';
    const moonIcon = '<i class="fas fa-moon"></i>';

    /**
     * Applies the given theme ('dark' or 'light') to the document
     * and updates the toggle button icon.
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = sunIcon;
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = moonIcon;
        }
    }

    /**
     * Toggles the theme, saves the choice to localStorage,
     * and applies the new theme.
     */
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Save the user's explicit choice
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    /**
     * Checks for a saved theme in localStorage.
     * If not found, checks system preference.
     */
    function setInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Use the saved theme
            applyTheme(savedTheme);
        } else if (prefersDarkScheme.matches) {
            // Use system preference if no theme is saved
            applyTheme('dark');
        } else {
            // Default to light
            applyTheme('light');
        }
    }

    /**
     * Listens for changes in the user's system theme.
     * Only applies the change if the user has NOT made a manual choice.
     */
    prefersDarkScheme.addEventListener('change', (e) => {
        // Check if the user has manually set a theme
        const savedTheme = localStorage.getItem('theme');
        
        // If no theme is saved, follow the system preference
        if (!savedTheme) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- Mobile Nav Toggle ---
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navLinks = document.querySelector('.nav-links');

    navToggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Set initial theme on page load ---
    setInitialTheme();
});

// --- Citation Modal Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if the modal element exists on this page
    const modal = document.getElementById('cite-modal');
    if (!modal) {
        return; // Do nothing if the modal isn't on this page
    }

    // Get all modal elements
    const modalCloseBtn = modal.querySelector('.modal-close');
    const citeTextElem = document.getElementById('cite-text');
    const citeBibtexElem = document.getElementById('cite-bibtex');
    const tabButtons = modal.querySelectorAll('.modal-tab-btn');
    const tabPanels = modal.querySelectorAll('.modal-tab-panel');
    const plainTextTab = document.getElementById('modal-tab-plain');
    const bibtexTab = document.getElementById('modal-tab-bibtex');

    // --- Tab Switching Logic ---
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Get the tab to show
            const targetTab = btn.dataset.tab; // "plain" or "bibtex"

            // Deactivate all buttons and panels
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Activate the clicked button and its corresponding panel
            btn.classList.add('active');
            if (targetTab === 'plain') {
                plainTextTab.classList.add('active');
            } else {
                bibtexTab.classList.add('active');
            }
        });
    });

    // --- Function to show the modal ---
    function showModal(plainText, bibtexText) {
        // 1. Populate the code blocks
        citeTextElem.textContent = plainText;
        citeBibtexElem.textContent = bibtexText;
        
        // 2. Reset tabs to the first one (Plain Text)
        tabButtons.forEach((btn, index) => {
            if (index === 0) {
                btn.classList.add('active');
                plainTextTab.classList.add('active');
            } else {
                btn.classList.remove('active');
                bibtexTab.classList.remove('active');
            }
        });
        
        // 3. Reset copy button text
        modal.querySelectorAll('.btn-copy-cite').forEach(btn => {
            btn.textContent = 'Copy';
            btn.disabled = false;
        });

        // 4. Display the modal
        modal.style.display = 'flex';
    }

    // --- Function to hide the modal ---
    function hideModal() {
        modal.style.display = 'none';
    }

    // --- Event Listeners ---

    // 1. Listen for clicks on ALL "Cite" buttons (uses event delegation)
    document.body.addEventListener('click', (e) => {
        const citeButton = e.target.closest('.btn-cite');
        if (citeButton) {
            e.preventDefault(); 
            const card = e.target.closest('.content-card');
            if (!card) return;
            const plainText = card.dataset.citeText;
            const bibtexText = card.dataset.citeBibtex;
            
            if (plainText && bibtexText) {
                showModal(plainText, bibtexText);
            } else {
                console.error('Citation data not found on this card.');
            }
        }
    });

    // 2. Listen for a click on the modal's close button
    modalCloseBtn.addEventListener('click', hideModal);

    // 3. Listen for a click on the modal's background overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // 4. Listen for "Escape" key to close the modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            hideModal();
        }
    });

    // 5. *** NEW: Listen for clicks on "Copy" buttons ***
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-copy-cite')) {
            const copyButton = e.target;
            
            // Find the <code> block within the same tab panel
            const panel = copyButton.closest('.modal-tab-panel');
            const codeBlock = panel.querySelector('code');
            const textToCopy = codeBlock.textContent;

            // Use the modern Clipboard API
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Success! Give user feedback.
                copyButton.textContent = 'Copied!';
                copyButton.disabled = true;
                
                // Reset button text after 2 seconds
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.disabled = false;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                copyButton.textContent = 'Error';
                // Reset button text after 2 seconds
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.disabled = false;
                }, 2000);
            });
        }
    });
});