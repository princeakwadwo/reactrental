import React, { Component } from "react";
import Like from "../common/like";
import Table from "../common/table";
import { Link } from "react-router-dom";
class MovieTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Number In Stock" },
    { path: "dailyRentalRate", label: "Daily Rental Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie =>
        this.props.user && (
          <button
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
    }
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MovieTable;
