// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const THEME_KEY = 'safeguard-theme';

    // Detect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Initialize theme
    const initializeTheme = () => {
        // Check saved preference
        const savedTheme = localStorage.getItem(THEME_KEY);
        
        if (savedTheme) {
            // Use saved preference
            setTheme(savedTheme);
        } else {
            // Use system preference
            setTheme(prefersDark ? 'dark' : 'light');
        }
    };

    // Set theme
    const setTheme = (theme) => {
        const isDark = theme === 'dark';
        htmlElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    };

    // Update icon based on theme
    const updateThemeIcon = (isDark) => {
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only update if user hasn't set a preference
        if (!localStorage.getItem(THEME_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Initialize on page load
    initializeTheme();
});
