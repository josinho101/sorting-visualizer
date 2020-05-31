import React from "react";

interface Props {
  items: number[];
  maxHeight: number;
  itemWidth: number;
}

const ItemContainer: React.SFC<Props> = (props) => {
  const { maxHeight, items, itemWidth } = props;

  /** render each sortable item */
  const renderItem = (item: number, index: number) => {
    let style: React.CSSProperties = {
      marginTop: maxHeight - item,
      width: itemWidth,
    };
    return <div style={style} key={index} data-index={index}></div>;
  };

  return (
    <div className="item-container">
      {items.map((item: number, index: number) => {
        return renderItem(item, index);
      })}
    </div>
  );
};

export default ItemContainer;
