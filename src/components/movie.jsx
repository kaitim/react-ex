import React from "react";

const Movie = ({ match, history }) => {
  const handleSubmit = () => {
    history.replace("/movies");
  };

  return (
    <div>
      <div className="title">Movie - {match.params.id}</div>
      <button onClick={handleSubmit} className="btn btn-primary">
        Save
      </button>
    </div>
  );
};

export default Movie;
