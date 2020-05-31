import React from "react";

interface Props {
  items: number[];
  maxHeight: number;
  itemWidth: number;
}

const ItemContainer: React.SFC<Props> = (props) => {
  const { maxHeight, items, itemWidth } = props;

  /** render each sortable item */
  const renderItem = (item: number) => {
    let style: React.CSSProperties = {
      marginTop: maxHeight - item,
      width: itemWidth,
    };
    return <div style={style}></div>;
  };

  return (
    <div className="item-container">
      {items.map((item: number) => {
        return renderItem(item);
      })}
    </div>
  );
};

export default ItemContainer;
