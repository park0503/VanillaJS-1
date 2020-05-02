const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");

const LS_ToDo = "toDo";
let toDos = [];

function submitToDo(event) {
  event.preventDefault();
  const input = toDoInput.value;
  paintToDo(input);
  toDoInput.value = "";
}

function saveToDo() {
  localStorage.setItem(LS_ToDo, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  const i = delBtn.querySelector("i");
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    id: newId,
    text: text,
  };
  toDos.push(toDoObj);
  saveToDo();
}

function deleteToDo(event) {
  let btn = event.target;
  if (btn.querySelector("i") === null) {
    btn = btn.parentNode;
  }
  const li = btn.parentNode;
  console.log(li.id);
  toDoList.removeChild(li);
  const cleanToDo = toDos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  toDos = cleanToDo;
  saveToDo();
}

function loadToDo() {
  const toDo = localStorage.getItem(LS_ToDo);
  if (toDo !== null) {
    const parseToDo = JSON.parse(toDo);
    parseToDo.forEach(function (todo) {
      paintToDo(todo.text);
    });
  }
}

loadToDo();
toDoForm.addEventListener("submit", submitToDo);
