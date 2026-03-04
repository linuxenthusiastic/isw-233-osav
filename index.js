import { CommandExecutor, Command, Commands } from "./services/command.js";

globalThis.DOM = {};

const DOM = globalThis.DOM;

document.addEventListener("DOMContentLoaded", () => {
  DOM.todoList = document.getElementById("todo-list");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoInput = document.getElementById("todo-input");

  DOM.addBtn.addEventListener("click", () => {
    CommandExecutor.execute(new Command(Commands.ADD), { todoInput: DOM.todoInput });
  });

  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const text = event.target.dataset.todo;
      CommandExecutor.execute(new Command(Commands.DELETE, {text}));
    }
  });
});
