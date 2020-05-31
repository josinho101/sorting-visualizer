class SortingHelper {
  /**
   * generate random array based on the length
   */
  public static generateRandomArray = (length: number, max: number) => {
    return Array.from(
      {
        length: length,
      },
      () => Math.floor(Math.random() * max)
    );
  };

  /**
   * return item width in pixel
   */
  public static getItemWidth = (weight: number): number => {
    // width of each item will be the value + 1px margin
    // example if width is 3 then item width will be 49 + 1 = 4
    let itemWidth = [1, 3, 4, 9, 19, 39, 49];
    if (weight > itemWidth.length) {
      throw Error("Weight not valid for item width");
    }

    return itemWidth[weight - 1];
  };
}

export default SortingHelper;
