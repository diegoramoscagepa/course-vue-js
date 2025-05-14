## Slots

In addition to passing data via props, the parent component can also pass down template fragments to the child via slots:

template
<ChildComp>
  This is some slot content!
</ChildComp>
In the child component, it can render the slot content from the parent using the <slot> element as outlet:

template
<!-- in child template -->
<slot/>
Content inside the <slot> outlet will be treated as "fallback" content: it will be displayed if the parent did not pass down any slot content:

template
<slot>Fallback content</slot>
Currently we are not passing any slot content to <ChildComp>, so you should see the fallback content. Let's provide some slot content to the child while making use of the parent's msg state.