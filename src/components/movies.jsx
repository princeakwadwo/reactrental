import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieservice";
import Pagination from "../common/pagination";
import { paginate } from "../util/paginate";
import ListGroup from "../common/listGroup";
import { getGenres } from "../services/genreservice";
import MovieTable from "./movieTable";
import SearchBox from "../common/searchbox";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    searchQuery: "",
    pageSize: 7,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: moviedata } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies: moviedata, genres: genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter(
      paremter => paremter._id !== movie._id
    );
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      toast.error(ex);
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies]; //clone the object before for update
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = movie.liked === true ? false : true; // !movies[index].liked
    this.setState({ movies: movies });
  };
  handlePageChanged = page => {
    this.setState({ currentPage: page }); // update the state with the current page number
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    //filter the data based on selected genre
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(c => c.genre._id === selectedGenre._id);
    //sort the filtered data by either asc or desc
    const sortedMovies = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );
    const filteredMovies = paginate(sortedMovies, currentPage, pageSize); //filtered the data based on page number and size

    return { totalCount: filtered.length, data: filteredMovies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: movies } = this.getPagedData();

    if (count === 0)
      return <p>No available movies in the database currently</p>;
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            itemList={this.state.genres}
            selectedGenre={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col-8">
          {this.props.user && (
            <Link
              className="btn btn-primary"
              to="/movies/new"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}

          <p>Showing {totalCount} movies in the database</p>
          <SearchBox
            onChange={this.handleSearch}
            value={this.state.searchQuery}
          />
          <MovieTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            user={this.props.user}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={this.handlePageChanged}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
