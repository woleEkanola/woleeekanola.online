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
switchRoute(setCurrRoute())

function setCurrRoute() {
    var y = window.location.hash.split('#')
    var x = y[1]
    router.history.push(router.current == '' ? 'about-me' : router.current)
    router.current = x.length == 0 ? 'about-me' : x
    return x
}


function switchRoute(x) {

    if (router.locations.indexOf(x) >= 0) {
        if (router.locations.indexOf(x) == 0) {
            slider.style.marginLeft = '0px'
        } else {
            console.log(slider)

            slider.style.marginLeft = ` ${router.locations.indexOf(x) * -1000}px`
        }
        //  `${? 0: () + (router.locations.indexOf(x) * 100)}px`
    }


}

window.addEventListener('popstate', function(e) {
    switchRoute(setCurrRoute())
})