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