document.addEventListener('click', e => {

    if (e.target.classList.contains('title')) {
        e.target.nextElementSibling.classList.toggle('hide')
    }

    if (e.target.classList.contains('active')) {
        e.target.classList.toggle('active')

    }



})