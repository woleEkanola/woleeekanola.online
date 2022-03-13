// on page load confirm the uri and adjust view accordingly 
// listen to nav click
// change the uri value
// switch the view accordingly

const router = {
    locations: ['about-me', 'tech-stack', 'my-projects', 'courses', 'contact-me'],
    current: '',
    target: '',
    history: []

}

function setCurrRoute() {
    var x = window.location.hash
    router.history.push(router.current == '' ? 'about-me' : router.current)
    router.current = x.length == 0 ? 'about-me' : x
}

function switchRoute() {
    switch


}