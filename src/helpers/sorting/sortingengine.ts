import * as enums from "../../enums";
import ISortEngine from "./isortengine";
import QuickSortEngine from "./quicksortengine";
import BubbleSortEngine from "./bubblesortengine";
import ItemElementMap from "./typings/itemelementmap";
import SortOptions from "../../components/stage/typings/sortoptions";

class SortingEngine {
  // holds array to sort
  private arrayToSort: number[];

  /**
   * constructor of sorting engine
   */
  constructor(arrayToSort: number[]) {
    if (arrayToSort.length === 0) {
      throw new Error("Array to sort must have some elements");
    }

    this.arrayToSort = arrayToSort;
  }

  /**
   * Get all DOM elements to sort
   */
  private getItems = (options: SortOptions) => {
    let itemContainer = document.getElementsByClassName("item-container")[0];
    let items = itemContainer.getElementsByTagName("div");

    if (items.length !== this.arrayToSort.length) {
      throw new Error("DOM element count not matching with array to sort");
    }

    let speed = options.getSortingSpeed() / 1000;
    for (let i = 0; i < items.length; i++) {
      items[i].style.transition = `transform ${speed}s`;
    }

    return items;
  };

  /**
   * Map DOM elements with array to sort based on index
   */
  private mapArrayWithDOMElements = (
    options: SortOptions
  ): ItemElementMap[] => {
    let map: ItemElementMap[] = [];
    let items = this.getItems(options);
    map = this.arrayToSort.map((item: number, index: number) => {
      let newItem: ItemElementMap = {
        value: item,
        element: items[index],
        totalTranlation: 0,
      };
      return newItem;
    });

    return map;
  };

  /**
   * sorts array based on the algorithm specified
   */
  public sort = async (algorithm: enums.Algorithms, options: SortOptions) => {
    let engine: ISortEngine;
    let mappedArray = this.mapArrayWithDOMElements(options);

    switch (algorithm) {
      case enums.Algorithms.BubbleSort:
        engine = new BubbleSortEngine(mappedArray, options);
        break;
      case enums.Algorithms.QuickSort:
        engine = new QuickSortEngine(mappedArray, options);
        break;
      default:
        throw new Error(`Algorithm with id ${algorithm} not yet implemented`);
    }

    await engine.sort();
  };
}

export default SortingEngine;
