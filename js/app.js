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
            imge.src = `./img/wole${imgSlider}.jpg`
        }else{
            imgSlider = 1
            imge.src = `./img/wole${imgSlider}.jpg`
        }
        imgSlider ++
    }

counter ++
// console.log(imgSlider + ' - ' + counter)
requestAnimationFrame(changepix)
}

changepix()


let showcasebtn = document.getElementById('showcasebtn')
let showcaseview = document.getElementById('showcaseview') 
let shown = false

showcasebtn.addEventListener('click', function(e){
    if(shown){
        showcaseview.style.marginLeft = '-120%'
        showcasebtn.innerHTML = `<span class="violet">SHOW</span><span class="wine">CASE</span>`

    }else{
        showcaseview.style.marginLeft ='0%'
        showcasebtn.innerHTML =  'Close Showcase'

    
    }
    shown  = !shown

})

const url ='http://localhost:1337'
fetch(`${url}/api/projects?populate=image`)
  .then(response => response.json())
  .then(data => displayProjects(data.data));

  let tagt = document.getElementById('projectDiv')
  function displayProjects(projects){
      
      if(projects){

          projects.forEach(project =>{
            console.log(project)
    
              let dv = document.createElement('div')
              dv.className = 'card line clk'
              let x = `
              <div class='img-mask clk ${project.attributes.id}'>
              <img class='clk ${project.attributes.id}' src="${url+project.attributes.image.data[0].attributes.url}" alt="">
              </div>
              <h3 class='clk ${project.attributes.id}'>${project.attributes.Name}</h3>
    `
    dv.innerHTML = x
    tagt.appendChild(dv)
          })
      }else{
          let el = document.createElement('p')
          el.innerHTML = 'My projects will be uploaded shortly, for now click on the showcase button to view a selected few'
      tagt.appendChild(el)
        }

  }

  tagt.addEventListener('click', function(e){

      if(e.target.classList.contains('clk')){
        console.log('hello')

    }

  })