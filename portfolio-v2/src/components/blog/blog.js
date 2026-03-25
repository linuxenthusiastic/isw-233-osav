const blogGrid = document.querySelector('#blogGrid');
const contadorPost = document.querySelector('#contadorPost');
const btnAgregarPost = document.querySelector('#btnAgregarPost');

const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if(mutation.addedNodes.length > 0) {
            const total = blogGrid.children.length;
            contadorPost.textContent = `Posts: ${total}`;
        }
    });
});

mutationObserver.observe(blogGrid, {
    childList: true
});

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            lazyObserver.unobserve(img);
        }
    });
});

let numeroPost = 0;
btnAgregarPost.addEventListener('click', () => {
    numeroPost++;
    const article = document.createElement('article');
    article.innerHTML = `
        <h3>Post #${numeroPost}</h3>
        <p>Contenido del post ${numeroPost}</p>
        <img data-src="https://picsum.photos/400/200?random=${numeroPost}"
            alt="imagen del post"
            class="lazy"
            style="width:100%; height:200px; background:#222;"/>
    `;
    blogGrid.appendChild(article);

    const nuevaImg = article.querySelector('.lazy');
    lazyObserver.observe(nuevaImg);
});