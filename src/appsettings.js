var settings = {
  itemWidth: {
    // default, min and max are index of [2, 4, 5, 10, 20, 40, 50] '
    // which are item width in pixel
    default: 4,
    min: 1,
    max: 7,
  },
  sortingSpeed: {
    default: 7,
    min: 1,
    max: 10,
  },
  itemColor: {
    bubbleSort: {
      sorted: "#7bd475",
      notSorted: "#01d0df",
      current: "#f73838",
    },
    quickSort: {
      pivot: "#f579f5",
      sorted: "#7bd475",
      current: "#f73838",
      default: "#01d0df",
    },
  },
};

export default settings;
