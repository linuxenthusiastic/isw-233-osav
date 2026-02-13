const titulo = document.querySelector('h1');
console.log('Titulo encontrado:', titulo.textContent);

titulo.addEventListener('click', function () {
  alert('Hola! Soy Santiago');
});

const skills = document.querySelectorAll('.skill');

skills.forEach(function (skill) {
  skill.addEventListener('click', function () {
    if (this.style.background === 'black') {
      this.style.background = '';
      this.style.color = '';
    } else {
      this.style.background = 'black';
      this.style.color = 'white';
    }
  });
});

const footer = document.querySelector('footer');
const hora = document.createElement('p');
hora.textContent = 'Visitado: ' + new Date().toLocaleDateString('es-BO');
footer.appendChild(hora);