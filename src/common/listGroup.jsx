import React from "react";

const ListGroup = props => {
  const {
    itemList,
    valueProperty,
    textProperty,
    selectedGenre,
    onItemSelect
  } = props;
  return (
    <ul className="list-group">
      {itemList.map(item => (
        <li
          className={
            item === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name"
};

export default ListGroup;
