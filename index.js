const test = document.getElementById("test")
const appendButton = document.getElementById("appendButton")

appendButton.addEventListener("click",function(){
    const childElement = document.createElement('h6')
    childElement.textContent = "Worked"
    
    test.appendChild(childElement)
})