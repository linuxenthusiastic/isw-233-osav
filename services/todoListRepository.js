import { TodoItem } from "./todoList.js";

export class LocalStorageRepository {
  save(items) {
    localStorage.setItem("todos", JSON.stringify([...items].map((i) => i.text)));
  }
  load() {
    const data = JSON.parse(localStorage.getItem("todos") || "[]");
    return new Set(data.map((text) => new TodoItem(text)));
  }
}