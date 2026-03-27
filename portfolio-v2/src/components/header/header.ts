const links = document.querySelectorAll('.header__link');

links.forEach(l => {
    const text = l.textContent;
    l.addEventListener('mouseover', () => {
        l.textContent = text.toUpperCase();
    });
    l.addEventListener('mouseout', () => {
        l.textContent = text;
    });
});