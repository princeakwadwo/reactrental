import http from "./httpservice";
import { urlEndPoint } from "../config.json";

export function registerUser(user) {
  return http.post(urlEndPoint + "users", {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
