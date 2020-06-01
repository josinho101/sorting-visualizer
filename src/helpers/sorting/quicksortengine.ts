import ISortEngine from "./isortengine";
import appsettings from "../../appsettings";
import SortingHelper from "./sortinghelper";
import ItemElementMap from "./typings/itemelementmap";
import SortOptions from "../../components/stage/typings/sortoptions";

class QuickSortEngine implements ISortEngine {
  // array to sort
  private array: ItemElementMap[];

  // sort options
  private options: SortOptions;

  /**
   * constructor of quick sort engine
   */
  constructor(array: ItemElementMap[], options: SortOptions) {
    this.array = array;
    this.options = options;
  }

  private swap = (array: ItemElementMap[], a: number, b: number) => {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  };
  /**
   * partiotion the array for quick sort
   */
  private partition = (array: ItemElementMap[], low: number, high: number) => {
    let pivot = array[low].value;
    let start = low;
    let end = high;

    while (start < end) {
      while (array[start].value <= pivot && start < end) {
        start++;
      }

      while (array[end].value > pivot) {
        end--;
      }

      if (start < end) {
        // swap start element with end
        this.swap(array, start, end);
      }
    }

    // swap pivot with end
    this.swap(array, low, end);

    return end;
  };

  /**
   * perform quick sort
   */
  private quickSort = (
    array: ItemElementMap[],
    low: number,
    high: number
  ): void => {
    if (low < high) {
      let partitionIndex = this.partition(array, low, high);
      this.quickSort(array, low, partitionIndex - 1);
      this.quickSort(array, partitionIndex + 1, high);
    }
  };

  /**
   * sort and visualize the array sorting
   */
  public sort = () => {
    let low = 0;
    let high = this.array.length - 1;
    this.quickSort(this.array, low, high);

    let array = this.array.map((item: ItemElementMap) => {
      return item.value;
    });
    console.log(array);
  };
}

export default QuickSortEngine;
