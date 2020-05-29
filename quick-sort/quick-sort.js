let quickSort = (function () {
  swap = (array, a, b) => {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  };

  partition = (array, low, high) => {
    let pivot = array[low];
    let start = low;
    let end = high;

    while (start < end) {
      while (array[start] <= pivot) {
        start++;
      }

      while (array[end] > pivot) {
        end--;
      }

      if (start < end) {
        // swap start element with end
        swap(array, start, end);
      }
    }

    // swap pivot with end
    swap(array, low, end);

    return end;
  };

  sort = (array, low, high) => {
    if (low < high) {
      let partitionIndex = partition(array, low, high);
      sort(array, low, partitionIndex - 1);
      sort(array, partitionIndex + 1, high);
    }
  };

  visualize = () => {
    let array = [10, 3, 2, 7, 4, 5, 8, 1];
    let low = 0;
    let high = array.length - 1;

    console.log(`Before sorting: ${array}`);
    sort(array, low, high);
    console.log(`After sorting: ${array}`);
  };

  return {
    visualize: visualize,
  };
})();
