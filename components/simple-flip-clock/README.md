# Simple Flip Clock

Library for simple flip clock effect

## Basic usage

Include `dist/css/default.css` on your page

Include `dist/js/main.min.js` on your page

Include in your HTML

    <div class="sfc-number">
      <ol class="sfc-number__up">
        <li class="sfc-number__element sfc-number__element--active">
          <div class="sfc-number__digit">
            <div class="sfc-number__digit-full">0</div>
          </div>
        </li>
      </ol>
      <ol class="sfc-number__down">
        <li class="sfc-number__element sfc-number__element--active">
          <div class="sfc-number__digit">
            <div class="sfc-number__digit-full">0</div>
          </div>
        </li>
      </ol>
    </div>

Sample usage

    <script>
      var sfc = new SimpleFlipClock({element: document.querySelector('.sfc-number'), currentNumber: 0});
      sfc.decrement();
    </script>

![result](https://i.gyazo.com/8925a6b8f2d4d82ee9b4307a25e48017.gif)

Parameters:

    element: dom node with basic structure as specified above
    currentNumber: currently displayed number - need when method `increment` or `decrement` will be used
    maxNumber: maximal number that can be displayed - need when method `increment` or `decrement` will be used
    minNumber: minimal number that can be displayed - need when method `increment` or `decrement` will be used
    
Methods
        
    update(number) - updates currently displayed number to provided one
    decrement - decrements currently displayed number by 1
    increment - increments currently displayed number by 1
        
[DEMO](https://brainly.github.io/ui-components/components/simple-flip-clock/)
