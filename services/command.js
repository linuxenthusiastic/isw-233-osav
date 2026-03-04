import { todoList } from "./todoList.js";

export class Command {
  name;
  args;
  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const Commands = {
  ADD: "add",
  DELETE: "delete",
};

export const CommandExecutor = {
  execute(command, {todoInput} = {} ) {
    todoList.add(new TodoItem(text));
    switch (command.name) {
      case Commands.ADD:
        const todoText = todoInput.value.trim();

        if (todoText !== "") {
          todoList.add(new TodoItem(todoText));
          todoInput.value = "";
        }
        break;
      case Commands.DELETE:
        if(command.args?.text){
          todoList.delete(command.args.text);
        }
        break
    }
  },
};
