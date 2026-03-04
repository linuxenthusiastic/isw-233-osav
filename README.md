# WEB-ISW-233

Simple todo app with Vanilla JS

You have a code that works but it has several problems 

What if we want to:
- Save the list locally?
With the Repository pattern, TodoList doesn't know where the data is stored; it only calls save() and load(). If you want to save it to an API tomorrow, you simply change the repository, nothing more.
- Add keyboard shortcuts?
  The Command pattern already solves this. Since each action is encapsulated in a Command object, you can trigger it from anywhere — a button or a key
-Make it more complex in the future?
We could use the Strategy pattern. Do you want to sort alphabetically, by length, or filter by completed items? You just add a new strategy without touching any of the existing code.
- Create an undo action?
  The Command pattern again. CommandExecutor keeps a history of every command executed. Undo() retrieves the last one and does the opposite.
Your task:
- Decouple the project using design patterns!!!
- Be creative make your to answer the previous questions 
