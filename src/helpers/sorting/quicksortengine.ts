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
  private partition = async (
    array: ItemElementMap[],
    low: number,
    high: number
  ) => {
    let pivot = array[low].value;
    let start = low;
    let end = high;
    let colors = appsettings.itemColor.quickSort;

    while (start < end) {
      while (array[start].value <= pivot && start < end) {
        start++;
      }

      while (array[end].value > pivot) {
        end--;
      }

      if (start < end) {
        // swap items in UI
        await this.swapItemsInUI(array, start, end);

        // swap start element with end
        this.swap(array, start, end);
      }
    }

    // swap items in UI
    await this.swapItemsInUI(array, low, end);

    // swap pivot with end
    this.swap(array, low, end);

    return end;
  };

  /**
   * Swap items in UI
   */
  private swapItemsInUI = async (
    array: ItemElementMap[],
    item1Index: number,
    item2Index: number
  ) => {
    let pivotItem = array[item1Index];
    let endItem = array[item2Index];

    let distanceToMove =
      Math.abs(item1Index - item2Index) * (this.options.itemWidth + 1);

    pivotItem.totalTranlation += distanceToMove;
    endItem.totalTranlation -= distanceToMove;

    pivotItem.element.style.left = `${pivotItem.totalTranlation}px`;
    endItem.element.style.left = `${endItem.totalTranlation}px`;
  };

  /**
   * perform quick sort
   */
  private quickSort = async (
    array: ItemElementMap[],
    low: number,
    high: number
  ) => {
    if (low < high) {
      let partitionIndex = await this.partition(array, low, high);
      await this.quickSort(array, low, partitionIndex - 1);
      await this.quickSort(array, partitionIndex + 1, high);
    }
  };

  /**
   * sort and visualize the array sorting
   */
  public sort = async () => {
    let low = 0;
    let high = this.array.length - 1;
    await this.quickSort(this.array, low, high);

    let array = this.array.map((item: ItemElementMap) => {
      return item.value;
    });
    console.log(array);
  };
}

export default QuickSortEngine;
