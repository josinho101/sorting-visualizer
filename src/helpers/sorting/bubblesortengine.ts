import ISortEngine from "./isortengine";
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
    for (let i = 0; i <= n; i++) {
      if (i < n) {
        for (let j = 0; j < n - i; j++) {
          let item1 = this.array[j];
          let item2 = this.array[j + 1];

          if (item1.value > item2.value) {
            //swap items
            let temp = this.array[j];
            this.array[j] = this.array[j + 1];
            this.array[j + 1] = temp;

            item1.totalTranlation += this.options.itemWidth + 1;
            item2.totalTranlation -= this.options.itemWidth + 1;

            item1.element.style.backgroundColor = "#f73838";

            await SortingHelper.sleep(0);

            item1.element.style.left = `${item1.totalTranlation}px`;
            item2.element.style.left = `${item2.totalTranlation}px`;

            item1.element.style.backgroundColor = "#01d0df";
          }
        }
      }

      let sortedItem = this.array[n - i];
      sortedItem.element.style.backgroundColor = "#7bd475";
    }
  };
}

export default BubbleSortEngine;
