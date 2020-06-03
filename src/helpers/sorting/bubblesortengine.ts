import ISortEngine from "./isortengine";
import appsettings from "../../appsettings";
import SortingHelper from "./sortinghelper";
import ItemElementMap from "./typings/itemelementmap";
import SortOptions from "../../components/stage/typings/sortoptions";

class BubbleSortEngine implements ISortEngine {
  // array to sort
  private array: ItemElementMap[];

  // sort options
  private options: SortOptions;

  /**
   * constructor of bubble sort engine
   */
  constructor(array: ItemElementMap[], options: SortOptions) {
    this.array = array;
    this.options = options;
  }

  /**
   * sort and visualize the array sorting
   */
  public sort = async () => {
    let n = this.array.length - 1;
    let color = appsettings.itemColor.bubbleSort;

    for (let i = 0; i <= n; i++) {
      if (i < n) {
        for (let j = 0; j < n - i; j++) {
          let item1 = this.array[j];
          let item2 = this.array[j + 1];

          if (item1.value > item2.value) {
            //swap items
            SortingHelper.swap(this.array, j, j + 1);

            // swap ui items
            await this.swapInUI(item1, item2);

            await SortingHelper.sleep(this.options.getSortingSpeed());
          }
        }
      }

      let sortedItem = this.array[n - i];
      sortedItem.element.style.backgroundColor = color.sorted;
    }
  };

  /**
   * swap ui items
   */
  private swapInUI = async (item1: ItemElementMap, item2: ItemElementMap) => {
    let toMove = this.options.itemWidth + 1;
    item1.totalTranlation += toMove;
    item2.totalTranlation -= toMove;

    await SortingHelper.animate(item1.element, item1.totalTranlation);
    await SortingHelper.animate(item2.element, item2.totalTranlation);
  };
}

export default BubbleSortEngine;
