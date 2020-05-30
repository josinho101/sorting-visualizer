import React from "react";
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

  /**
   * constructor of stage
   */
  constructor(props: Props, state: State) {
    super(props, state);
    this.arrayToSort = SortingHelper.generateRandomArray(80, 400);
  }

  /**
   * render stage to DOM
   */
  render() {
    return (
      <div className="stage">
        <StageControls
          startSorting={this.startSorting}
          stopSorting={this.stopSorting}
          resetArray={this.resetArray}
          onItemWidthChange={this.onItemWidthChange}
        />
        <ItemContainer items={this.arrayToSort} maxHeight={400} />
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
   * reset array for sorting
   */
  private resetArray = (e: React.MouseEvent<HTMLElement>) => {
    this.arrayToSort = SortingHelper.generateRandomArray(80, 400);
    this.setState({ renderedOn: Date.now() });
  };

  /**
   * start array sorting
   */
  private onItemWidthChange = (e: React.ChangeEvent<HTMLElement>) => {
    let target: any = e.target;
    console.log(`Current item width ${target.value}`);
  };
}

export default Stage;
