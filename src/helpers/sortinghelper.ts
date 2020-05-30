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
}

export default SortingHelper;
