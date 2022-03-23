document.addEventListener('click', e => {

    if (e.target.classList.contains('title')) {
        e.target.nextElementSibling.classList.toggle('hide')
    }

    if (e.target.classList.contains('active')) {
        e.target.classList.toggle('active')

    }



})
let counter = 1
let imgSlider = 2
let imge = document.getElementById('tst')
function changepix(){

    if(counter % 1000 === 0){

        if(imgSlider <=4){
            imge.src = `./wole${imgSlider}.jpg`
        }else{
            imgSlider = 1
            imge.src = `./wole${imgSlider}.jpg`
        }
        imgSlider ++
    }

counter ++
// console.log(imgSlider + ' - ' + counter)
requestAnimationFrame(changepix)
}

changepix()
