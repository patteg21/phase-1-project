// sets the variable for the movement piece
const iMove = document.getElementById("i-move")

// sets the position that iMove with be at
let positionX = 0
let positionY = 0

function moveMe(){
    // style for the header to transform 
    iMove.style.transform = `translate(${positionX}px, ${positionY}px)`
}

// eventListern, listens for key inputs
document.addEventListener('keydown', function(event){
    // deals with which key was pressed and responds

    // pixel change amount
    const step = 10

    switch (event.key) {
        case 'ArrowLeft':
            positionX -= step;
            break;
        case 'ArrowRight':
            positionX += step;
            break;
        case 'ArrowUp':
            positionY -= step;
            break;
        case 'ArrowDown':
            positionY += step;
            break;
    }

    moveMe()
})

// sets the current position of the header
moveMe()


// grads the area that contains blocks
const blocks = document.getElementById('blocks')

// listens for when the blocks are clicked
blocks.addEventListener('click',function(){
    const block = document.createElement('div')
    block.id = "block"
    block.className = "block"
    blocks.appendChild(block)
})



// colors that blocks will change to
const colors = ["#00A36C","#90EE90","#0BDA51","green","green"]

setInterval(function(){
    let allBlock = document.querySelectorAll('#block')
    if(allBlock.length > 1){
        allBlock.forEach(function(currentBlock, index, array){
            const color = Math.floor(Math.random()* colors.length)
            currentBlock.style.backgroundColor = colors[color]
        })
    }
},1000)
