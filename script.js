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