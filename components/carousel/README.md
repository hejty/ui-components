# Carousel

Library for simple carousel

## Basic usage

Include `dist/css/default.css` on your page

Include `dist/js/main.min.js` on your page

Include in your HTML

    
     <div class="carousel">
      <div class="carousel__viewport">
        <div class="carousel__slider">
          <div class="carousel__slide">
            1st slide
          </div>
          <div class="carousel__slide">
            2nd slide
          </div>
          ...
        </div>
      </div>
    </div>

Sample usage
    <script>
      const carousel = new Carousel({element: document.querySelector('.carousel')});
    </script>

![result](https://cloud.githubusercontent.com/assets/1231144/20526748/b7265bf4-b0c5-11e6-8560-ff8ed2a93940.gif)

### Parameters:
    element: dom node with basic structure as specified above
    slideChangeCallback: function called when slide is changed. Contains information about the carousel and index of current slide

### Methods
        
    disableDragging() - disable possibility to drag slides using touch/mouse
    enableDragging() - enable possibility to drag slides using touch/mouse
    prev() - go to the previous slide
    next() - go to the next slide
    goTo(number) - go to the slide you want

[DEMO](https://brainly.github.io/ui-components/components/carousel/)
