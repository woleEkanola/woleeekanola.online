let target = document.getElementById('showcase')

function launch(x) {
    target.innerHTML = ''
    if (x == 'xno') {


        let j = `<div class="control">
    <div class="msg" id="msg"></div>
    <button id="start">start</button>
    <button id="end">End Game</button>

    <input type="checkbox" name="ai" id="ai" onclick="AIswitch()"> <label for="ai">AI player</label>
    <input type="checkbox" name="humanFirst" id="humanFirst" onclick="humanFirst()" checked> <label for="humanFirst">Human Plays First</label>

</div>
<div id="gameboard">
    <div class="gameCell" ID="0"></div>
    <div class="gameCell" ID="1"></div>
    <div class="gameCell" ID="2"></div>
    <div class="gameCell" ID="3"></div>
    <div class="gameCell" ID="4"></div>
    <div class="gameCell" ID="5"></div>
    <div class="gameCell" ID="6"></div>
    <div class="gameCell" ID="7"></div>
    <div class="gameCell" ID="8"></div>
</div>`
        let div = document.createElement('div')
        div.id = 'container'
        div.innerHTML = j
        target.appendChild(div)
    } else {

    }

    let canva = document.createElement('canvas')
    canva.id = x

    target.appendChild(canva)
}