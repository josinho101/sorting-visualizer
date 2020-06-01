class SortingHelper {
  /**
   * generate random array based on the length
   */
  public static generateRandomArray = (
    length: number,
    min: number,
    max: number
  ) => {
    return Array.from(
      {
        length: length,
      },
      () => min + Math.floor(Math.random() * (max - min + 1))
    );
  };

  /**
   * return item width in pixel
   */
  public static getItemWidth = (sizeIndex: number): number => {
    // width of each item will be the value + 1px margin
    // example if width is 3 then item width will be 49 + 1 = 4
    let itemSize = [1, 3, 4, 9, 19, 39, 49];
    if (sizeIndex > itemSize.length) {
      throw Error("Size index not valid for item width");
    }

    return itemSize[sizeIndex - 1];
  };

  /**
   * return sorting speed
   */
  public static getSortingSpeed = (index: number) => {
    let speed = [250, 200, 150, 100, 75, 50, 35, 25, 10, 1];
    return speed[index - 1];
  };

  /**
   * sleep for the specified amount of time
   */
  public static sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  /**
   * swap items between index in an array
   */
  public static swap = (array: any, index1: number, index2: number) => {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  };
}

export default SortingHelper;
