import * as enums from "../../enums";
import ISortEngine from "./isortengine";
import QuickSortEngine from "./quicksortengine";
import BubbleSortEngine from "./bubblesortengine";
import ItemElementMap from "./typings/itemelementmap";
import SortOptions from "../../components/stage/typings/sortoptions";
import SortingHelper from "./sortinghelper";

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
   * Map DOM elements with array to sort based on index
   */
  private mapArrayWithDOMElements = (): ItemElementMap[] => {
    let map: ItemElementMap[] = [];
    let items = SortingHelper.getSortableUIItems();

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
    let mappedArray = this.mapArrayWithDOMElements();

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
