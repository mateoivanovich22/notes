const form = document.getElementById('noteForm');

const buttonReturnHome = document.querySelector(".buttonReturnHome")

buttonReturnHome.addEventListener('click', () => {
  window.location.href = '/notes';
})

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const selectedRating = document.querySelector('input[name="rating"]:checked');
  const titleValue = document.querySelector('.input').value;
  const messageValue = document.querySelector('.input01').value;
  const loading = document.querySelector(".typewriter")
  loading.style.display = "flex";
  setTimeout(() => {

    if (!selectedRating) {
      alert('Debes seleccionar una calificación antes de enviar el formulario.');
      loading.style.display = "none";
    } else {
      let imagen = '';

      if (selectedRating.classList.contains('super-happy')) {
        imagen = 'happyFace.jpg';
      } else if (selectedRating.classList.contains('neutral')) {
        imagen = 'normalFace.jpg';
      } else if (selectedRating.classList.contains('super-sad')) {
        imagen = 'sadFace.jpg';
      }

      
      const data = {
        title: titleValue,
        message: messageValue,
        imagen: imagen
      };

      const apiUrl = `/notes/create`;
      
      fetch(apiUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la solicitud fetch');
          }
          sessionStorage.removeItem('paginaRecargada');
          return response.json();
        })
        .then(data => {
          console.log('Solicitud exitosa', data);
        })
        .catch(error => {
          console.error('Error en la solicitud fetch', error);
        });
      window.location.href = '/notes';
    }

  },2000)
});
