document.addEventListener('DOMContentLoaded', () => {

    // Helper: update the "Back to Hub" and "Logo" link based on active language
    const updateDynamicLinks = (lang) => {
        const backBtn = document.getElementById('back-to-hub');
        const logoBtn = document.getElementById('site-logo');
        const hubHref = lang === 'uk' ? '/uk/' : '/';

        if (backBtn) backBtn.href = hubHref;
        if (logoBtn) logoBtn.href = hubHref;
    };

    // Initialize state on load
    const storedLang = localStorage.getItem('figarist_ui_lang') || 'uk';
    updateDynamicLinks(storedLang);

    // Find all language toggles meant exclusively for JS toggling (on Posts)
    const toggles = document.querySelectorAll('.js-lang-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();

            // Determine active language
            const docClassList = document.documentElement.classList;
            let currentLang = docClassList.contains('lang-en') ? 'en' : 'uk';
            const newLang = currentLang === 'en' ? 'uk' : 'en';

            // 1. Swap the CSS class on HTML tag to trigger the data-i18n CSS rules
            docClassList.remove('lang-' + currentLang);
            docClassList.add('lang-' + newLang);

            // 2. Save to localStorage
            localStorage.setItem('figarist_ui_lang', newLang);

            // 3. Update dynamic links
            updateDynamicLinks(newLang);
        });
    });

    // For standard navigation links (on Hubs), just ensure localStorage captures the intent before they navigate
    const navToggles = document.querySelectorAll('.js-lang-nav');
    navToggles.forEach(nav => {
        nav.addEventListener('click', (e) => {
            // It will navigate naturally, just save the state immediately
            const targetLang = nav.href.includes('/uk/') ? 'uk' : 'en';
            localStorage.setItem('figarist_ui_lang', targetLang);
        });
    });
});
