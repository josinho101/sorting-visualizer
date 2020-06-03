import React from "react";
import * as enums from "../../enums";
import settings from "../../appsettings";
import StageControls from "./stagecontrols";
import ItemContainer from "./itemcontainer";
import SortOptions from "./typings/sortoptions";
import SortingEngine from "../../helpers/sorting/sortingengine";
import SortingHelper from "../../helpers/sorting/sortinghelper";

interface State {
  renderedOn: number;
  sortingInProgress: boolean;
  removeItems: boolean;
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

  // sorting speed
  private sortingSpeed = 0;

  // width of stage
  private stageWidth = 800;

  // height of stage
  private stageHeight = 400;

  // sorting algorithm
  private sortingAlgorithm: enums.Algorithms;

  // flag to hold if reset done after sorting
  private resetDone: boolean;

  /**
   * constructor of stage
   */
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {
      renderedOn: 0,
      sortingInProgress: false,
      removeItems: false,
    };
    this.sortingAlgorithm = enums.Algorithms.BubbleSort;
    this.resetDone = true;
    this.setItemWidth();
    this.generateRandomArray();
  }

  /**
   * component did mount for stage
   */
  public componentDidMount() {
    this.setSortingSpeed();
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
          onSortingSpeedChange={this.onSortingSpeedChange}
          onAlgorithmSelected={this.onAlgorithmSelected}
          sortingInProgress={this.state.sortingInProgress}
        />
        <p className="total">Total items to sort: {this.arrayToSort.length}</p>
        {!this.state.removeItems ? (
          <ItemContainer
            items={this.arrayToSort}
            maxHeight={this.stageHeight}
            itemWidth={this.itemWidth}
          />
        ) : null}
      </div>
    );
  }

  /**
   * start array sorting
   */
  private startSorting = (e: React.MouseEvent<HTMLElement>) => {
    if (this.resetDone) {
      try {
        let options = {
          itemWidth: this.itemWidth,
          getSortingSpeed: this.getSortingSpeed,
          continueSorting: this.continueSorting,
        } as SortOptions;
        let sortingEngine = new SortingEngine(this.arrayToSort);

        this.setState({ sortingInProgress: true }, async () => {
          this.resetDone = false;
          await sortingEngine.sort(this.sortingAlgorithm, options);
          this.setState({ sortingInProgress: false });
        });
      } catch (e) {
        this.setState({ sortingInProgress: false });
        console.error(e);
      }
    }
  };

  /**
   * stop array sorting
   */
  private stopSorting = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({ sortingInProgress: false });
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
    this.reset();
  };

  /**
   * get sorting speed
   */
  private getSortingSpeed = (): number => {
    return this.sortingSpeed;
  };

  /**
   * return true if its oke to continue sorting.
   */
  private continueSorting = (): boolean => {
    return this.state.sortingInProgress;
  };

  /**
   * reset array
   */
  private reset = () => {
    this.resetDone = true;
    this.generateRandomArray();
    this.setState({ removeItems: true }, () => {
      setTimeout(() => {
        this.setState({ removeItems: false });
      }, 10);
    });
  };

  /**
   * start array sorting
   */
  private onItemWidthChange = (e: React.ChangeEvent<HTMLElement>) => {
    if (!this.resetDone) {
      this.reset();
    }
    let target: any = e.target;
    this.itemWidth = SortingHelper.getItemWidth(parseInt(target.value));
    this.setItemWidth();
    this.arrayToSort = this.rawArray.slice(0, this.itemCount);
    this.setState({ renderedOn: Date.now() });
  };

  /**
   * trigger when sorting speed is changed
   */
  private onSortingSpeedChange = (e: React.ChangeEvent<HTMLElement>) => {
    let target: any = e.target;
    let weight = parseInt(target.value);
    this.setSortingSpeed(weight);
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
    this.rawArray = SortingHelper.generateRandomArray(400, 1, this.stageHeight);
    this.arrayToSort = [...this.rawArray];
    this.arrayToSort = this.rawArray.slice(0, this.itemCount);
  };

  /**
   * set sorting speed
   */
  private setSortingSpeed = (index = 0) => {
    this.sortingSpeed = SortingHelper.getSortingSpeed(
      index === 0 ? settings.sortingSpeed.default : index
    );

    this.setTransitionForSortableItems();
  };

  /**
   * set transition for sortable items
   */
  private setTransitionForSortableItems = () => {
    let sortableItems = SortingHelper.getSortableUIItems();
    let speed = this.sortingSpeed / 1000;

    if (sortableItems.length !== this.arrayToSort.length) {
      throw new Error("DOM element count not matching with array to sort");
    }

    for (let i = 0; i < this.arrayToSort.length; i++) {
      sortableItems[i].style.transition = `transform ${speed}s`;
    }
  };
}

export default Stage;
