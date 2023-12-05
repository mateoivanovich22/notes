var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        }

    }
})

if (!sessionStorage.getItem('paginaRecargada')) {
    // Recargar la página si no ha sido recargada antes
    sessionStorage.setItem('paginaRecargada', 'true');
    location.reload(); // o window.location.reload() dependiendo de tu preferencia
}

function createNote() {
    window.location.href = `/notes/create`
}

function viewNote(id){
    window.location.href = `/notes/note/${id}`
}