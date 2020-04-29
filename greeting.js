const form = document.querySelector(".form");
const input = form.querySelector("input");
const greeting = document.querySelector(".greeting");
const resetBtn = document.querySelector("#resetBtn");

const CN_SHOWING = "showing";
const CN_HIDING = "hiding";

const LS_UserName = "username";

function submitName(event) {
  event.preventDefault();
  const username = input.value;
  localStorage.setItem("username", username);
  paintGreeting(username);
}

function resetLS(event) {
  localStorage.removeItem(LS_UserName, null);
  localStorage.removeItem(LS_ToDo, null);
  location.reload();
}

function askName() {
  form.classList.remove(CN_HIDING);
  form.addEventListener("submit", submitName);
}

function paintGreeting(text) {
  form.classList.add(CN_HIDING);
  greeting.innerHTML = `Hello ${text}! What a nice day?`;
}

function checkName() {
  const username = localStorage.getItem(LS_UserName);
  if (username == null) {
    askName();
  } else {
    paintGreeting(username);
  }
}

checkName();
