import './components/base.css'
import './components/header/header.css'
import './components/hero/hero.css'
import './components/about/about.css'
import './components/experience/experience.css'
import './components/projects/projects.css'
import './components/blog/blog.css'
import './components/contact/contact.css'
import './components/header/header'
import './components/blog/blog'
import './components/contact/contact'

const secciones = document.querySelectorAll('.seccion');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.2
});

secciones.forEach(seccion => {
    observer.observe(seccion);
});

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target as HTMLImageElement; // Cast a HTMLImageElement
            img.src = img.dataset.src ?? ''; // dataset.src puede ser undefined
            img.classList.remove('lazy');
            lazyObserver.unobserve(img);
        }
    });
});

const fotoPerfil = document.querySelector('.about__img');
if(fotoPerfil) {
    lazyObserver.observe(fotoPerfil);
}