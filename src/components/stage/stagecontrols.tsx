import React from "react";
import * as enums from "../../enums";
import settings from "../../appsettings";
import { RangeOptions } from "./typings/rangeoptions";
import classNames from "classnames";

interface Props {
  selectedAlgorithm: enums.Algorithms;
  sortingInProgress: boolean;
  resetArray: (event: React.MouseEvent<HTMLElement>) => void;
  startSorting: (event: React.MouseEvent<HTMLElement>) => void;
  stopSorting: (event: React.MouseEvent<HTMLElement>) => void;
  onItemWidthChange: (event: React.ChangeEvent<HTMLElement>) => void;
  onAlgorithmSelected: (algorithm: enums.Algorithms) => void;
}

const StageControls: React.SFC<Props> = (props) => {
  // options for item width range selector
  const itemWidthRangeOptions: RangeOptions = {
    default: settings.itemWidth.default,
    min: settings.itemWidth.min,
    max: settings.itemWidth.max,
  };

  // generate nav item
  const getNavItem = (text: string, algorithm: enums.Algorithms) => {
    return (
      <li
        className={classNames({
          active: props.selectedAlgorithm === algorithm,
          disable: props.sortingInProgress,
        })}
      >
        <a
          onClick={() => props.onAlgorithmSelected(algorithm)}
          href="#"
          data-id={algorithm}
        >
          {text}
        </a>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <ul className="nav navbar-nav">
          <li>
            <button
              className="btn btn-primary navbar-btn right-margin16px"
              onClick={props.resetArray}
              disabled={props.sortingInProgress}
            >
              Reset
            </button>
          </li>
          <li className="range">
            <p>item width</p>
            <input
              type="range"
              min={itemWidthRangeOptions.min}
              max={itemWidthRangeOptions.max}
              defaultValue={itemWidthRangeOptions.default}
              onChange={props.onItemWidthChange}
              disabled={props.sortingInProgress}
            />
          </li>
        </ul>
        <ul className="nav navbar-nav">
          {getNavItem("Bubble sort", enums.Algorithms.BubbleSort)}
          {getNavItem("Quick sort", enums.Algorithms.QuickSort)}
          {getNavItem("Merge sort", enums.Algorithms.MergeSort)}
        </ul>
        <ul className="nav navbar-nav">
          <li>
            <button
              onClick={props.startSorting}
              className="btn btn-success navbar-btn right-margin16px left-margin16px"
              disabled={props.sortingInProgress}
            >
              Start
            </button>
          </li>
          <li>
            <button
              onClick={props.stopSorting}
              className="btn btn-danger navbar-btn right-margin16px"
            >
              Stop
            </button>
          </li>
          <li className="range">
            <p>Sorting speed</p>
            <input type="range" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default StageControls;
