import ISortEngine from "./isortengine";
import appsettings from "../../appsettings";
import SortingHelper from "./sortinghelper";
import ItemElementMap from "./typings/itemelementmap";
import SortOptions from "../../components/stage/typings/sortoptions";

class MergeSortEngine implements ISortEngine {
  // array to sort
  private array: ItemElementMap[];

  // sort options
  private options: SortOptions;

  /**
   * constructor of merge sort engine
   */
  constructor(array: ItemElementMap[], options: SortOptions) {
    this.array = array;
    this.options = options;
  }

  /**
   * sort and visualize the array sorting
   */
  public sort = async () => {
    let low = 0;
    let high = this.array.length - 1;
    await this.mergeSort(this.array, low, high);
  };

  /**
   * merge sort items
   */
  private mergeSort = async (
    array: ItemElementMap[],
    low: number,
    high: number
  ) => {
    if (low < high) {
      // find mid of array and divide the array to two.
      let mid = Math.floor((low + high) / 2);

      // call merge sort recursively for lot to mid and mid + 1 to high
      await this.mergeSort(array, low, mid);
      await this.mergeSort(array, mid + 1, high);

      // merge the two arrays back to main array
      await this.merge(array, low, mid, high);
    }
  };

  /**
   * merge items
   */
  private merge = async (
    array: ItemElementMap[],
    low: number,
    mid: number,
    high: number
  ) => {
    let i = low;
    let j = mid + 1;
    let k = low;
    let newArray: ItemElementMap[] = [];

    /**
     * compare two arrays. first array from low to mid point and second array
     * from mid + 1 to high. if element from first array id smaller add it to
     * new array. otherwise add element from second array.
     */
    while (i <= mid && j <= high) {
      if (array[i].value <= array[j].value) {
        newArray[k] = array[i];
        i++;
      } else {
        newArray[k] = array[j];
        j++;
      }

      k++;
    }

    /**
     * When either of the above condition is failed, one of the array item will
     * be added to new array. we need to find the other array and add all remaining
     * items to the new array.
     */
    if (i > mid) {
      while (j <= high) {
        newArray[k] = array[j];
        j++;
        k++;
      }
    } else {
      while (i <= mid) {
        newArray[k] = array[i];
        i++;
        k++;
      }
    }

    let filteredArray = newArray.filter((i) => i !== null);
    let isLastMerge = array.length === filteredArray.length;
    let color = appsettings.itemColor;

    // merge new array created in the above step to original array
    for (k = low; k <= high; k++) {
      array[k] = newArray[k];

      let previousIndex = array[k].previousIndex;
      let totalMovement = (k - previousIndex) * (this.options.itemWidth + 1);

      // animate element movement and wait for UI change
      await SortingHelper.animate(array[k].element, totalMovement);
      await SortingHelper.sleep(this.options.getSortingSpeed());

      if (isLastMerge) {
        array[k].element.style.backgroundColor = color.sorted;
      }
    }
  };
}

export default MergeSortEngine;
