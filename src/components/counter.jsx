import React, { Component } from "react";

class Counter extends Component {
  render() {
    const { onIncrement, onDecrement, onDelete, counter } = this.props;
    let badgeClass = "badge badge-";
    badgeClass += counter.value === 0 ? "warning" : "primary";

    return (
      <div className="row">
        <div className="col-1">
          <span className={badgeClass}>
            {counter.value === 0 ? "zero" : counter.value}
          </span>
        </div>
        <div className="col">
          <button
            onClick={() => onIncrement(counter.id)}
            className="btn btn-success m-1"
          >
            +
          </button>
          <button
            onClick={() => onDecrement(counter.id)}
            className="btn btn-secondary m-1"
            disabled={counter.value === 0}
          >
            -
          </button>
          <button
            onClick={() => onDelete(counter.id)}
            className="btn btn-danger m-1"
          >
            x
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
