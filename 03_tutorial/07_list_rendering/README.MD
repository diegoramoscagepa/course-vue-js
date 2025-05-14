## List Rendering

We can use the v-for directive to render a list of elements based on a source array:

template
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
Here todo is a local variable representing the array element currently being iterated on. It's only accessible on or inside the v-for element, similar to a function scope.

Notice how we are also giving each todo object a unique id, and binding it as the special key attribute for each <li>. The key allows Vue to accurately move each <li> to match the position of its corresponding object in the array.

There are two ways to update the list:

Call mutating methods on the source array:

js
todos.value.push(newTodo)
Replace the array with a new one:

js
todos.value = todos.value.filter(/* ... */)
Here we have a simple todo list - try to implement the logic for addTodo() and removeTodo() methods to make it work!

More details on v-for: Guide - List Rendering