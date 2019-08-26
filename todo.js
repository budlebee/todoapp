const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");


const TODOS_LS="toDos";
let toDoArray=[];



function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const del_loadedToDos = JSON.parse(localStorage.getItem(TODOS_LS));
  function findId(array){
    return array.toDoId === parseInt(li.id);
  }
  const result = del_loadedToDos.findIndex(findId)
  del_loadedToDos.splice(result,1);
  localStorage.setItem(TODOS_LS,JSON.stringify(del_loadedToDos));
  loadToDos();

}




function saveToDo(value){
  const checkLS = localStorage.getItem(TODOS_LS);
  let toDoObj={
    value,
    toDoId:0
  }
  if (checkLS === null){ 
    toDoArray.push(toDoObj);
    localStorage.setItem(TODOS_LS,JSON.stringify(toDoArray));
    toDoArray=[];
  } else if (checkLS === "[]") {
    console.log(toDoObj);
    toDoArray.push(toDoObj);
    localStorage.setItem(TODOS_LS,JSON.stringify(toDoArray));
    toDoArray=[];
  } else {
    toDoArray = JSON.parse(localStorage.getItem(TODOS_LS));
    const arrayLength = toDoArray.length
    toDoObj.toDoId = toDoArray[arrayLength-1].toDoId+1; 
    toDoArray.push(toDoObj);
    localStorage.setItem(TODOS_LS,JSON.stringify(toDoArray));
    toDoArray=[];
  }
}



function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    if(toDoList.childNodes !== null){
      while(toDoList.firstChild){
        toDoList.removeChild(toDoList.firstChild);
      }
    }
    for (i=0; i<parsedToDos.length; i++){
      const li = document.createElement("li");
      const delBtn = document.createElement("button");
      const span = document.createElement("span");
      delBtn.innerText = "x";
      delBtn.addEventListener("click", deleteToDo);
      span.innerText = parsedToDos[i].value;
      li.appendChild(span);
      li.appendChild(delBtn);
      li.id = parsedToDos[i].toDoId;
      toDoList.appendChild(li);
    };
  } else if (loadToDos === "[]"){
      const li = document.createElement("li");
      const delBtn = document.createElement("button");
      const span = document.createElement("span");
      delBtn.innerText = "x";
      delBtn.addEventListener("click", deleteToDo);
      span.innerText = parsedToDos[0].value;
      li.appendChild(span);
      li.appendChild(delBtn);
      li.id = parsedToDos[0].toDoId;
      toDoList.appendChild(li);
    
  }
}





function handleSubmit(event){
  event.preventDefault();
  const currentValue=toDoInput.value;
  saveToDo(currentValue);
  loadToDos();
  toDoInput.value="";
  //console.log(toDoArray);
}

function askForToDo(){
    toDoForm.addEventListener("submit",handleSubmit)
  }


function init(){
  loadToDos();
  askForToDo();
}

init();


/*
let test=JSON.parse(localStorage.getItem(TODOS_LS));

test.splice(3,1);
localStorage.setItem(TODOS_LS,JSON.stringify(test));
*/
/*
const inventory = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];

const result = inventory.find(fruit => fruit.name === 'cherries').name;

console.log(result) // { name: 'cherries', quantity: 5 }
*/

/*
let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  delTarget=parseInt(li.id)-1;
  toDos.splice(delTarget,1);
  
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  

  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  //delBtn.innerText = "❌";
  delBtn.innerText = "x";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}


function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
*/