let bubbleSortVisualizer = (function () {
  const RESET_BUTTON = "reset-button";
  const SORT_BUTTON = "sort-button";
  const SLOW_BUTTON = "btn-slow";

  let options = {};
  let items = [];
  let rectElements = [];

  function Rect(element) {
    this.element = element;
    this.totalTranslation = 0;
  }

  // generate random number array based on grid size
  getRandomNumbers = () => {
    return Array.from(
      {
        length: options.gridWidth / options.gridItemWidth,
      },
      () => Math.floor(Math.random() * options.gridHeight)
    );
  };

  // create button element
  createButton = (id, text, onClick, doAddMargin = true) => {
    let button = document.createElement("button");
    let textElement = document.createTextNode(text);
    button.appendChild(textElement);
    button.setAttribute("id", id);
    button.setAttribute("onclick", onClick);
    if (doAddMargin) {
      button.setAttribute("style", "margin-right:5px;");
    }

    return button;
  };

  // create rect element
  createRect = (x, y, rectWidth, rectHeight) => {
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("style", "fill:grey;");
    rect.setAttribute("width", rectWidth);
    rect.setAttribute("height", rectHeight);
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    return rect;
  };

  // Create controls for the grid
  createGridControls = (parent) => {
    // create button holder
    let buttonHolder = document.createElement("div");
    buttonHolder.setAttribute("style", "padding-bottom:3px;text-align:right;");
    parent.appendChild(buttonHolder);

    // create slow button
    let slowerButton = createButton(SLOW_BUTTON, "Slow down", "slowSort()");
    buttonHolder.appendChild(slowerButton);

    // create reset button
    let resetButton = createButton(RESET_BUTTON, "Reset", "reset()");
    buttonHolder.appendChild(resetButton);

    // create sort button
    let sortButton = createButton(SORT_BUTTON, "Sort", "sort()", false);
    buttonHolder.appendChild(sortButton);
  };

  // generate items for the grid
  populateGrid = () => {
    let root = document.getElementById(options.elementId);
    // check if provided element was able to find from DOM
    if (!root) {
      throw ReferenceError(`Element with id ${options.elementId} not found`);
    }

    // create the wrapper
    let wrapper = document.createElement("div");
    wrapper.setAttribute(
      "style",
      `width:${options.gridWidth}px;height:${options.gridHeight + 30}px;`
    );
    root.appendChild(wrapper);

    // create buttons on grid
    createGridControls(wrapper);

    // create the svg grid to hold all the items
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", options.gridWidth);
    svg.setAttribute("height", options.gridHeight);
    svg.setAttribute("class", "grid");
    wrapper.appendChild(svg);

    // generate items to sort
    items = getRandomNumbers();

    items.forEach((item, index) => {
      let x = index * options.gridItemWidth;
      let y = options.gridHeight - item;

      // create rect svg element
      let rect = createRect(x, y, options.gridItemWidth, item);
      svg.appendChild(rect);

      // add elements to rect array collection
      let element = new Rect(rect, x, y);
      rectElements.push(element);
    });
  };

  // validate and populate grid items
  setGrid = (opt) => {
    if (!opt) {
      options = {};
    } else {
      options = opt;
    }

    if (!options.gridWidth || !options.gridHeight) {
      options.gridWidth = 400;
      options.gridHeight = 200;
      options.gridItemWidth = 10;
    }

    if (!options.gridItemWidth) {
      options.gridItemWidth = 10;
    }

    if (!options.delay) {
      options.delay = 50;
    }
    populateGrid();
  };

  // reset the grid
  reset = () => {
    let root = document.getElementById(options.elementId);
    root.innerHTML = "";
    items = [];
    rectElements = [];
    setGrid(options);
  };

  // make sort slower
  slowSort = () => {
    if (options.delay < 500) {
      options.delay += 50;
    }
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  // sort array
  sort = async () => {
    let sortButton = document.getElementById(SORT_BUTTON);
    let resetButton = document.getElementById(RESET_BUTTON);

    sortButton.disabled = true;
    resetButton.disabled = true;

    let n = items.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        let item1 = rectElements[j];
        let item2 = rectElements[j + 1];

        item1.element.style.fill = "red";

        if (items[j] > items[j + 1]) {
          // swap items
          let temp = items[j];
          items[j] = items[j + 1];
          items[j + 1] = temp;

          item1.totalTranslation += options.gridItemWidth;
          item2.totalTranslation -= options.gridItemWidth;

          item1.element.style.transform = `translateX(${item1.totalTranslation}px)`;
          item2.element.style.transform = `translateX(${item2.totalTranslation}px)`;

          await sleep(options.delay);

          let tempRect = rectElements[j];
          rectElements[j] = rectElements[j + 1];
          rectElements[j + 1] = tempRect;
        }

        item1.element.style.fill = "grey";
      }
    }

    sortButton.disabled = false;
    resetButton.disabled = false;
  };

  return {
    setGrid: setGrid,
    sort: sort,
    reset: reset,
    slowSort: slowSort,
  };
})();
