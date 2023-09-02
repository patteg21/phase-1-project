//json-server --watch db.json


// // grabs all the data from the db.json
// fetch('http://localhost:3000/people')
// .then((response) => response.json())
// .then((data)=>{
//     console.log(data)

// });


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
            const colorIndex = Math.floor(Math.random()* colors.length)
            currentBlock.style.backgroundColor = colors[colorIndex]
        })
    }
},500)




const form = document.getElementById("form");

form.addEventListener("submit",function(event){
    event.preventDefault()

    const name = document.getElementById("name").value
    const age = document.getElementById("age").value
    const color = document.getElementById("color").value.toString()

    console.log(name)
    console.log(age)
    console.log(color)


    const person = {
        "name":name,
        "age":age,
        "color":color,
    }

    fetch("http://localhost:3000/person",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(person),
    })
    .then((response) => response.json())
    .then((data)=>{
        console.log(data)
    });
});


const totalAge = document.getElementById("total-age")

function getTotalAge(){
    fetch('http://localhost:3000/person')
    .then((response) => response.json())
    .then((data)=>{
        console.log(data)
        const sum = data.reduce(function(accumulator,current){
            let num = parseInt(current.age)          
            return num + accumulator
        },0)

        totalAge.innerText = sum
    });
}

const underAge = document.getElementById("under-num")
const ageLimit = 25

function underNum(){
    fetch('http://localhost:3000/person')
    .then((response) => response.json())
    .then((data)=>{
        console.log(data)
        const filtered = data.filter(function(person){
            return parseInt(person.age) < ageLimit
        });
        console.log(filtered)


        filtered.forEach(function(youngling){
            const personElement = document.createElement('p')
            personElement.innerHTML= youngling.name
            underAge.appendChild(personElement)
        });
    });
};


getTotalAge()
underNum()