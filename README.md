# StepByStep.js

![StepByStep.js version](https://img.shields.io/badge/StepByStep.js-v1.0.0-green.svg)
[![License](http://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)

StepByStep.js is a simple and cute diagram for your ul-lists based on jQuery. 

![Preview](http://kampov.com/stepbystep/preview.png)

##Documentation

It just take seconds to install and use StepByStep.js

### [LIVE DEMO ➫](http://kampov.com/stepbystep/)

### Dependencies
- [jQuery](http://code.jquery.com/jquery-1.11.3.min.js)

### Basic usage

- HTML

```html
  <div class="StepByStep">
      <ul>
          <li>
              <div class="step-details">
                <h3>First Title</h3>
                <p>Some description</p>
              </div>
          </li>
          <li>
            <div class="step-details">
              <h3>Second Title</h3>
              <p>Some description</p>
            </div>
          </li>
      </ul>
  </div>
```

- JavaScript

```javascript
  $('.StepByStep').StepByStep() //.StepByStep is a class of a parents div
```

### Advanced usage

- JavaScript

```javascript
  $('.StepByStep').StepByStep({
    lineColor: "#e7e7e7", // Color of background line
    active: 1,  // mount of active thumbs
    inactiveColor: '#e7e7e7', // Color of inactive thumbs
    numColor: '#222', // Font color of inactive thumbs
    numColorActive: '#fff',  // Font color fof active thumbs
    activeColors: ['#ec0101','#ffbf00', '#00a9fe', '#1bb012', '#888'], // Array of colors of active thumbs
    colorLast: '#004179', // Color for last thumb which when clicked, transported you to the next element
    after: 'StepByStep-after' // ID of next element to which you will transfer
  });
```
## Bug tracker

If you find a bug, please report it [here on Github](https://github.com/vladkampov/StepByStep.js/issues)!

## Developer

Developed Vlad Kampov, [kampov.com](http://kampov.com)

+ [@Vlad Kampov](//twitter.com/VladKampov)
+ [Github Profile](//github.com/vladkampov)