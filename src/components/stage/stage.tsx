import React from "react";
import * as enums from "../../enums";
import settings from "../../appsettings";
import StageControls from "./stagecontrols";
import ItemContainer from "./itemcontainer";
import SortingHelper from "../../helpers/sortinghelper";

interface State {
  renderedOn: number;
}

interface Props {}

class Stage extends React.Component<Props, State> {
  // array to sort
  private arrayToSort: number[] = [];

  // original array
  private rawArray: number[] = [];

  // width of an item in stage
  private itemWidth = 0;

  // total items to sort
  private itemCount = 0;

  // width of stage
  private stageWidth = 800;

  // height of stage
  private stageHeight = 400;

  // sorting algorithm
  private sortingAlgorithm: enums.Algorithms;

  /**
   * constructor of stage
   */
  constructor(props: Props, state: State) {
    super(props, state);
    this.sortingAlgorithm = enums.Algorithms.BubbleSort;
    this.setItemWidth();
    this.generateRandomArray();
  }

  /**
   * render stage to DOM
   */
  render() {
    return (
      <div className="stage">
        <StageControls
          selectedAlgorithm={this.sortingAlgorithm}
          startSorting={this.startSorting}
          stopSorting={this.stopSorting}
          resetArray={this.resetArray}
          onItemWidthChange={this.onItemWidthChange}
          onAlgorithmSelected={this.onAlgorithmSelected}
        />
        <ItemContainer
          items={this.arrayToSort}
          maxHeight={this.stageHeight}
          itemWidth={this.itemWidth}
        />
      </div>
    );
  }

  /**
   * start array sorting
   */
  private startSorting = (e: React.MouseEvent<HTMLElement>) => {
    console.log("start button clicked !!!");
  };

  /**
   * stop array sorting
   */
  private stopSorting = (e: React.MouseEvent<HTMLElement>) => {
    console.log("stop button clicked !!!");
  };

  /**
   * triggered when algorithm selection is changed
   */
  private onAlgorithmSelected = (algorithm: enums.Algorithms) => {
    this.sortingAlgorithm = algorithm;
    this.setState({ renderedOn: Date.now() });
  };

  /**
   * reset array for sorting
   */
  private resetArray = (e: React.MouseEvent<HTMLElement>) => {
    this.generateRandomArray();
    this.setState({ renderedOn: Date.now() });
  };

  /**
   * start array sorting
   */
  private onItemWidthChange = (e: React.ChangeEvent<HTMLElement>) => {
    let target: any = e.target;
    this.itemWidth = SortingHelper.getItemWidth(parseInt(target.value));
    this.setItemWidth();
    this.arrayToSort = this.rawArray.slice(0, this.itemCount);
    this.setState({ renderedOn: Date.now() });
  };

  /**
   * set width of item
   */
  private setItemWidth = () => {
    if (this.itemCount === 0) {
      this.itemWidth = SortingHelper.getItemWidth(settings.itemWidth.default);
    }
    this.itemCount = this.stageWidth / (this.itemWidth + 1);
  };

  /**
   * generate random array
   */
  private generateRandomArray = () => {
    this.rawArray = SortingHelper.generateRandomArray(400, this.stageHeight);
    this.arrayToSort = [...this.rawArray];
    this.arrayToSort = this.rawArray.slice(0, this.itemCount);
  };
}

export default Stage;
