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

  /**
   * sort and visualize the array sorting
   */
  public sort = async () => {
    let low = 0;
    let high = this.array.length - 1;
    await this.quickSort(this.array, low, high);
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
      this.setAsSorted(array, low, partitionIndex);

      await this.quickSort(array, partitionIndex + 1, high);
      this.setAsSorted(array, partitionIndex, high);
    }
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

    while (start < end) {
      while (array[start].value <= pivot && start < end) {
        start++;
      }

      while (array[end].value > pivot) {
        end--;
      }

      if (start < end) {
        await SortingHelper.sleep(this.options.getSortingSpeed());
        // swap items in UI
        await this.swapInUI(array, start, end);
        // swap start element with end
        SortingHelper.swap(array, start, end);
      }
    }

    await SortingHelper.sleep(this.options.getSortingSpeed());
    // swap items in UI
    await this.swapInUI(array, low, end);
    // swap pivot with end
    SortingHelper.swap(array, low, end);

    return end;
  };

  /**
   * Swap items in UI
   */
  private swapInUI = async (
    array: ItemElementMap[],
    index1: number,
    index2: number
  ) => {
    let item1 = array[index1];
    let item2 = array[index2];

    let toMove = Math.abs(index1 - index2) * (this.options.itemWidth + 1);

    item1.totalTranlation += toMove;
    item2.totalTranlation -= toMove;

    await SortingHelper.animate(item1.element, item1.totalTranlation);
    await SortingHelper.animate(item2.element, item2.totalTranlation);

    await SortingHelper.sleep(this.options.getSortingSpeed());
  };

  /**
   * set specified from - to index as sorted
   */
  private setAsSorted = (array: ItemElementMap[], from: number, to: number) => {
    let sortedColor = appsettings.itemColor.quickSort.sorted;
    let sortedItems = array.slice(from, to + 1);
    sortedItems.forEach((item: ItemElementMap) => {
      item.element.style.backgroundColor = sortedColor;
    });
  };
}

export default QuickSortEngine;
