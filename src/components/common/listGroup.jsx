import React from "react";

const ListGroup = ({
  items,
  selectedItem,
  textProperty,
  valueProperty,
  onItemSelect,
}) => {
  return (
    <React.Fragment>
      <ul className="list-group" style={{ width: "150px", float: "right" }}>
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            className={
              selectedItem._id === item._id
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
