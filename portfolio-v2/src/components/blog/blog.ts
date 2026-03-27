const blogGrid = document.querySelector<HTMLElement>('#blogGrid');
const contadorPost = document.querySelector<HTMLElement>('#contadorPost');
const btnAgregarPost = document.querySelector<HTMLButtonElement>('#btnAgregarPost');

const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if(mutation.addedNodes.length > 0 && blogGrid && contadorPost) {
            const total = blogGrid.children.length;
            contadorPost.textContent = `Posts: ${total}`;
        }
    });
});

if(blogGrid) {
    mutationObserver.observe(blogGrid, {
        childList: true
    });
}

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src ?? '';
            img.classList.remove('lazy');
            lazyObserver.unobserve(img);
        }
    });
});

let numeroPost = 0;

if(btnAgregarPost) {
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

        if(blogGrid) {
            blogGrid.appendChild(article);
        }

        const nuevaImg = article.querySelector<HTMLImageElement>('.lazy');
        if(nuevaImg) {
            lazyObserver.observe(nuevaImg);
        }
    });
}