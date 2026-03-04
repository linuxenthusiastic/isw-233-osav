# WEB-ISW-233

Simple todo app with Vanilla JS

You have a code that works but it has several problems 

What if we want to:
- Save the list locally?

- Add keyboard shortcuts?
Already solved by the Command pattern. Since every action is encapsulated in a Command object, you can trigger it from anywhere a button click or a keypress
- Make it more complex in the future?
- 
- Create an undo action?
The Command pattern again. CommandExecutor keeps a history array of every executed command. undo() pops the last one and does the opposite

Your task:
- Decouple the project using design patterns!!!
- Be creative make your to answer the previous questions 
