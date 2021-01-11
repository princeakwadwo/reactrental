import jwtDecode from "jwt-decode";
import http from "./httpservice";
import { urlEndPoint } from "../config.json";

const url = urlEndPoint + "auth";
const tokenKey = "token";

http.setJwt(getJwt());
export async function login(email, password) {
  const { data: jwt } = await http.post(url, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser
};
