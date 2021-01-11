import http from "./httpservice";
import { urlEndPoint } from "../config.json";

export function getGenres() {
  return http.get(urlEndPoint + "genres");
}
