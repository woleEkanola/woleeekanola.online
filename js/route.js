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

function cal(x) {
    return `translateX(-${(((wdt(slider)/5) * x)/wdt(slider))*100})`
}

function switchRoute(x) {



    switch (x) {

        case 'about-me':
            slider.style.transform = `translateX(0)`
            break

        case 'tech-stack':
            slider.style.transform = cal(1)
            console.log(cal(1))
            break

        case 'projects':
            slider.style.marginLeft = cal(2)
            console.log(cal(2))
            break
        case 'courses':

            slider.style.transform = cal(3)
            console.log(cal(3))

            break
        case 'contact-me':
            slider.style.transform = cal(4)
            console.log(cal(4))



    }
}




window.addEventListener('popstate', function(e) {
    setCurrRoute()
})