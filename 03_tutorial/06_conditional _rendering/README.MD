## Conditional Rendering

We can use the v-if directive to conditionally render an element:

template
<h1 v-if="awesome">Vue is awesome!</h1>
This <h1> will be rendered only if the value of awesome is truthy. If awesome changes to a falsy value, it will be removed from the DOM.

We can also use v-else and v-else-if to denote other branches of the condition:

template
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
Currently, the demo is showing both <h1>s at the same time, and the button does nothing. Try to add v-if and v-else directives to them, and implement the toggle() method so that we can use the button to toggle between them.

More details on v-if: Guide - Conditional Rendering