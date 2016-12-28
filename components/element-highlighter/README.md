# Element Highlighter

Highlights chosen DOM element

## Basic usage

Include `dist/css/default.css` and `dist/js/main.min.js` on your page.

Initialize component:

    <script>
      const highlighter = new ElementHighlighter({element: element, container: container});
      highlighter.show();
    </script>

### Parameters:

    element: DOM node that should be highlighted
    container: element that should be covered with overlay (e.g. `document.body`)

### Methods

    show(callback) - show overlay, optional callback function is called after animation finishes
    hide(callback) - hide overlay, optional callback function is called after animation finishes

`callback` function passed to these methods will receive `overlay` node as a first param, so you can e.g. add (and remove) click listener to it. You can also use these callbacks to start additional animation e.g. blur of the container.

[DEMO](https://brainly.github.io/ui-components/components/element-highlighter/)
