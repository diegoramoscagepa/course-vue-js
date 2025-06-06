## Attribute Bindings

In Vue, mustaches are only used for text interpolation. To bind an attribute to a dynamic value, we use the v-bind directive:

template
<div v-bind:id="dynamicId"></div>
A directive is a special attribute that starts with the v- prefix. They are part of Vue's template syntax. Similar to text interpolations, directive values are JavaScript expressions that have access to the component's state. The full details of v-bind and directive syntax are discussed in Guide - Template Syntax.

The part after the colon (:id) is the "argument" of the directive. Here, the element's id attribute will be synced with the dynamicId property from the component's state.

Because v-bind is used so frequently, it has a dedicated shorthand syntax:

template
<div :id="dynamicId"></div>
Now, try to add a dynamic class binding to the <!--<h1></h1>-->, using the titleClass ref as its value. If it's bound correctly, the text should turn red.