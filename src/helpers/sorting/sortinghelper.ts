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
   * sleep for the specified amount of time
   */
  public static sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
}

export default SortingHelper;
