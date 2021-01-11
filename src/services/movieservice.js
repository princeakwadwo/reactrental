import http from "./httpservice";
import { urlEndPoint } from "../config.json";

export function getMovies() {
  return http.get(urlEndPoint + "movies");
}

export function getMovie(id) {
  return http.get(urlEndPoint + "movies" + "/" + id);
}

export function deleteMovie(movieId) {
  return http.get(urlEndPoint + "movies" + "/" + movieId);
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie }; //to clone the movie data
    delete body._id; //to delete id property from the movie data object to avoid confusing
    return http.put(urlEndPoint + "movies" + "/" + movie._id, body);
  }
  return http.post(urlEndPoint + "movies", movie);
}
