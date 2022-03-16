// on page load confirm the uri and adjust view accordingly 

// listen to nav click
// change the uri value
// switch the view accordingly
var slider = document.getElementById('sld')

const router = {
    locations: ['about-me', 'tech-stack', 'projects', 'courses', 'contact-me'],
    current: '',
    target: '',
    history: []

}


function setCurrRoute() {
    var y = window.location.hash.split('#')
    var x = y[1]
    router.history.push(router.current == '' ? 'about-me' : router.current)
    router.current == x ? 'about-me' : x
    console.log(x)
    switchRoute(x)
}


function switchRoute(x) {

    // if (router.locations.indexOf(x) >= 0) {

    //     router.locations.forEach(lc => {
    //         if (lc == x) {
    //             console.log(x)
    //             let y = document.getElementById(x)
    //             console.log(y)
    //             y.style.display = 'block'
    //                 // y.style.left = '0 !important'
    //         } else {
    //             let y = document.getElementById(x)
    //             y.style.display = 'none'
    //                 // y.style.left = '600%'
    //         }
    //     })

    // }
    //  `${? 0: () + (router.locations.indexOf(x) * 100)}px`

    switch (x) {

        case router.locations[0]:
            slider.style.marginLeft = '0%'
            break

        case router.locations[1]:
            slider.style.marginLeft = '-100%'
            break

        case router.locations[2]:
            slider.style.marginLeft = '-200%'
            break
        case router.locations[3]:
            slider.style.marginLeft = '-300%'
            break
        case router.locations[4]:
            slider.style.marginLeft = '-400%'
            break


    }
}




window.addEventListener('popstate', function(e) {
    setCurrRoute()
})