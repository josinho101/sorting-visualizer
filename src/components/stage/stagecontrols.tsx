import React from "react";
import { RangeOptions } from "./typings/rangeoptions";
import settings from "../../appsettings";

interface Props {
  resetArray: (event: React.MouseEvent<HTMLElement>) => void;
  startSorting: (event: React.MouseEvent<HTMLElement>) => void;
  stopSorting: (event: React.MouseEvent<HTMLElement>) => void;
  onItemWidthChange: (event: React.ChangeEvent<HTMLElement>) => void;
}

const StageControls: React.SFC<Props> = (props) => {
  const itemWidthRangeOptions: RangeOptions = {
    default: settings.itemWidth.default,
    min: settings.itemWidth.min,
    max: settings.itemWidth.max,
  };

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <ul className="nav navbar-nav">
          <li>
            <button
              className="btn btn-primary navbar-btn right-margin16px"
              onClick={props.resetArray}
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
            />
          </li>
        </ul>
        <ul className="nav navbar-nav">
          <li className="active">
            <a href="#">Bubble sort</a>
          </li>
          <li>
            <a href="#">Quick sort</a>
          </li>
          <li>
            <a href="#">Merge sort</a>
          </li>
        </ul>
        <ul className="nav navbar-nav">
          <li>
            <button
              onClick={props.startSorting}
              className="btn btn-success navbar-btn right-margin16px left-margin16px"
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
