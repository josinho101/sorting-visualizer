import * as enums from "../../enums";

class SortingEngine {
  // holds array to sort
  private arrayToSort: number[];

  /**
   * constructor of sorting engine
   */
  constructor(arrayToSort: number[]) {
    this.arrayToSort = arrayToSort;
  }

  /**
   * sorts array based on the algorithm specified
   */
  public sort = (algorithm: enums.Algorithms) => {
    switch (algorithm) {
      case enums.Algorithms.BubbleSort:
        break;
      default:
        throw new Error(`Algorithm with id ${algorithm} not yet implemented`);
    }
  };
}

export default SortingEngine;
