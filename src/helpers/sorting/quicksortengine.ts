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
      // find the partiotion index, divide array to two
      let partitionIndex = await this.partition(array, low, high);

      // sort first half, low to partiotion index - 1
      await this.quickSort(array, low, partitionIndex - 1);
      // after sorting set first half as sorted
      this.setAsSorted(array, low, partitionIndex);

      // sort second half, partiotion index + 1 to high
      await this.quickSort(array, partitionIndex + 1, high);
      // after sorting set second half as sorted
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
    let start = low;
    let end = high;

    // set a value as pivot, this implementation use low as pivot
    let pivot = array[low].value;

    while (start < end) {
      // find an element that is larger than pivot element
      while (array[start].value <= pivot && start < end) {
        start++;
      }

      // find an element that is smaller than pivot element
      while (array[end].value > pivot) {
        end--;
      }

      // after finding smaller and larger element, swap those items
      // smaller element to left and larger to right of pivot
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
    // If start and end corss eachother then we need to swap
    // pivot element with end element
    SortingHelper.swap(array, low, end);

    array[end].element.style.backgroundColor = appsettings.itemColor.sorted;

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
    let sortedColor = appsettings.itemColor.sorted;
    let sortedItems = array.slice(from, to + 1);
    sortedItems.forEach((item: ItemElementMap) => {
      item.element.style.backgroundColor = sortedColor;
    });
  };
}

export default QuickSortEngine;
