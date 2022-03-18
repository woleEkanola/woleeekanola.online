// on page load confirm the uri and adjust view accordingly 

// listen to nav click
// change the uri value
// switch the view accordingly
var slider = document.getElementById('sld')
var wdt = function(x) {
    return x.offsetWidth
}

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

    console.log(wdt(slider))


    switch (x) {

        case 'about-me':
            slider.style.transform = `translateX(0)`
            break

        case 'tech-stack':
            slider.style.transform = `translateX(-${(wdt(slider)/5) * 1 })`
            console.log(`-${(wdt(slider)/5) * 1 }px`)
            break

        case 'projects':
            slider.style.marginLeft = `translateX(-${(wdt(slider)/5) * 2 })`
            console.log(`-${(wdt(slider)/5) * 2 }px`)
            break
        case 'courses':

            slider.style.transform = `translateX(-${(wdt(slider)/5) * 3 })`
            console.log(`-${(wdt(slider)/5) * 3 }px`)

            break
        case 'contact-me':
            slider.style.transform = `translateX(-${(wdt(slider)/5) * 4 })`
            console.log(`-${(wdt(slider)/5) * 4 } px`)
            break


    }
}




window.addEventListener('hashchange', function(e) {
    setCurrRoute()
})