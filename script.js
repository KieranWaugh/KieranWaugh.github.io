document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle Logic ---
    const themeToggles = document.querySelectorAll('.theme-toggle-btn'); 
    const htmlElement = document.documentElement;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (themeToggles.length > 0 && htmlElement && prefersDarkScheme) {
        // Icon definitions
        const sunIcon = '<i class="fas fa-sun"></i>';
        const moonIcon = '<i class="fas fa-moon"></i>';

        function applyTheme(theme) {
            if (theme === 'dark') {
                htmlElement.setAttribute('data-theme', 'dark');
                themeToggles.forEach(btn => btn.innerHTML = sunIcon);
            } else {
                htmlElement.setAttribute('data-theme', 'light');
                themeToggles.forEach(btn => btn.innerHTML = moonIcon);
            }
        }

        themeToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentTheme = htmlElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme);
            });
        });

        function setInitialTheme() {
            const savedTheme = localStorage.getItem('theme');
            
            if (savedTheme) {
                applyTheme(savedTheme);
            } else if (prefersDarkScheme.matches) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
        }

        prefersDarkScheme.addEventListener('change', (e) => {
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });

        // --- Set initial theme on page load ---
        setInitialTheme();
    } // End of Theme Toggle safety check

    // --- Mobile Nav Toggle ---
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navLinks = document.querySelector('.nav-links');

    if (navToggleBtn && navLinks) { // Safety check
        navToggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    } // End of Mobile Nav safety check

    // --- Citation Modal Logic ---
    const modal = document.getElementById('cite-modal');
    
    if (modal) { // Only run modal code if the modal exists
        
        // Find all modal elements
        const modalCloseBtn = modal.querySelector('.modal-close');
        const citeTextElem = document.getElementById('cite-text');
        const citeBibtexElem = document.getElementById('cite-bibtex');
        const tabButtons = modal.querySelectorAll('.modal-tab-btn');
        const tabPanels = modal.querySelectorAll('.modal-tab-panel');
        const plainTextTab = document.getElementById('modal-tab-plain');
        const bibtexTab = document.getElementById('modal-tab-bibtex');

        // Function to show the modal
        function showModal(plainText, bibtexText) {
            if (citeTextElem) citeTextElem.textContent = plainText;
            if (citeBibtexElem) citeBibtexElem.textContent = bibtexText;
            
            if (tabButtons.length > 0 && tabPanels.length > 0) {
                tabButtons.forEach((btn, index) => {
                    if (index === 0) {
                        btn.classList.add('active');
                        if(plainTextTab) plainTextTab.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                        if(bibtexTab) bibtexTab.classList.remove('active');
                    }
                });
            }
            
            modal.querySelectorAll('.btn-copy-cite').forEach(btn => {
                btn.textContent = 'Copy';
                btn.disabled = false;
            });

            modal.style.display = 'flex';
        }

        // Function to hide the modal
        function hideModal() {
            modal.style.display = 'none';
        }

        // --- Add Modal Event Listeners (with safety checks) ---

        // Listen for clicks on ALL "Cite" buttons (uses event delegation)
        document.body.addEventListener('click', (e) => {
            const citeButton = e.target.closest('.btn-cite');
            if (citeButton) {
                e.preventDefault(); 
                const card = e.target.closest('.content-card');
                if (card && card.dataset.citeText && card.dataset.citeBibtex) {
                    const plainText = card.dataset.citeText;
                    const bibtexText = card.dataset.citeBibtex;
                    showModal(plainText, bibtexText);
                } else {
                    console.error('Citation data not found on this card.');
                }
            }
        });

        // Listen for click on modal close button
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', hideModal);
        }

        // Listen for "Escape" key to close the modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                hideModal();
            }
        });

        // Listen for Tab Switching
        if (tabButtons.length > 0) {
            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetTab = btn.dataset.tab;
                    tabButtons.forEach(b => b.classList.remove('active'));
                    tabPanels.forEach(p => p.classList.remove('active'));
                    btn.classList.add('active');
                    if (targetTab === 'plain' && plainTextTab) {
                        plainTextTab.classList.add('active');
                    } else if (targetTab === 'bibtex' && bibtexTab) {
                        bibtexTab.classList.add('active');
                    }
                });
            });
        }

        // Combined listener for modal background clicks AND copy clicks
        modal.addEventListener('click', (e) => {
            
            if (e.target === modal) {
                hideModal();
            }

            
            if (e.target.classList.contains('btn-copy-cite')) {
                const copyButton = e.target;
                const panel = copyButton.closest('.modal-tab-panel');
                if (!panel) return;

                const codeBlock = panel.querySelector('code');
                if (!codeBlock) return;
                
                const textToCopy = codeBlock.textContent;

                navigator.clipboard.writeText(textToCopy).then(() => {
                    copyButton.textContent = 'Copied!';
                    copyButton.disabled = true;
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                        copyButton.disabled = false;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    copyButton.textContent = 'Error';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                        copyButton.disabled = false;
                    }, 2000);
                });
            }
        });
    } 
});