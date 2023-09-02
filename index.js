// info for linters
/* jshint esversion: 6 */

//json-server --watch db.json

// sets the variable for the movement piece
const iMove = document.getElementById("i-move");

// sets the position that iMove with be at
let positionX = 0;
let positionY = 0;

function moveMe(){
    // style for the header to transform 
    iMove.style.transform = `translate(${positionX}px, ${positionY}px)`;
}

// eventListern, listens for key inputs
document.addEventListener('keydown', function(event){
    // deals with which key was pressed and responds

    // pixel change amount
    const step = 10;

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

    moveMe();
});

// sets the current position of the header
moveMe();


// grads the area that contains blocks
const blocks = document.getElementById('blocks');

// listens for when the blocks are clicked
blocks.addEventListener('click',function(){
    const block = document.createElement('div');
    block.id = "block";
    block.className = "block";
    blocks.appendChild(block);
});



// colors that blocks will change to
const colors = ["#00A36C","#90EE90","#0BDA51","green","green"];

setInterval(function(){
    let allBlock = document.querySelectorAll('#block');
    if(allBlock.length > 1){
        allBlock.forEach(function(currentBlock, index, array){
            const colorIndex = Math.floor(Math.random()* colors.length);
            currentBlock.style.backgroundColor = colors[colorIndex];
        });
    }
},500);



// gras the form
const form = document.getElementById("form");

// listener of that form
form.addEventListener("submit",function(event){
    // does not allow refresh
    event.preventDefault();

    // sets variables based on the inputs (set to required on Frontend)
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const color = document.getElementById("color").value.toString();

    // logs for my own viewing
    console.log(name);
    console.log(age);
    console.log(color);

    //places them in an object
    const person = {
        "name":name,
        "age":age,
        "color":color,
    };

    // makes a call to the databse and POST's there
    fetch("http://localhost:3000/person",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        // this converts it to a string (I believe)
        body:JSON.stringify(person),
    })
    .then((response) => response.json())
    .then((data)=>{
        // logs the data for my viewing
        console.log(data);
    });
});

// grabs the element for where the sum of the ages will go
const totalAge = document.getElementById("total-age");

// create a function to display it
function getTotalAge(){
    // grabs all the objects in the db
    fetch('http://localhost:3000/person')
    .then((response) => response.json())
    .then((data)=>{
        // logs it for my viewing
        console.log(data);

        // uses reduce to add all the ages together
        const sum = data.reduce(function(accumulator,current){
            // parseInt since the age is a string in the db
            let num = parseInt(current.age);
            return num + accumulator;
        },0);

        // sets the innertext of the h3 element to the sum
        totalAge.innerText = sum;
    });
}

// grabs the element where the names will get appended to
const underAge = document.getElementById("under-num");

// create an to change the number easier if needed
const ageLimit = 25;

// creates a function for the names (should prob pick a better name)
function underNum(){
    // grabs all the data (yes this is a peice of dry code)
    fetch('http://localhost:3000/person')
    .then((response) => response.json())
    .then((data)=>{
        console.log(data);
        /* filters the data and grabs the names that
         are under ageLimit set above */
        const filtered = data.filter(function(person){
            return parseInt(person.age) < ageLimit;
        });

        // useind that filtered array we go through each element
        filtered.forEach(function(youngling){
            /* define the personElmenet here so it gets remade
            with each iteration. Contained in this scope*/
            const personElement = document.createElement('p');

            // sets the innerHTMl to the name of current person
            personElement.innerHTML= youngling.name;

            // appends it to underAge element in HTML
            underAge.appendChild(personElement);
        });
    });
}

// calls these two functions so that the info is displayed
getTotalAge();
underNum();