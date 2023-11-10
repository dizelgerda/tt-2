const BASE_URL = "http://localhost:3000";

export function getCurrentUser() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
  });
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export function register(data: RegisterData) {
  return fetch(`${BASE_URL}/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
}

interface LoginData {
  email: string;
  password: string;
}

export function login(data: LoginData) {
  return fetch(`${BASE_URL}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
}

export function logout() {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
}

interface PostNewsData {
  text: string;
  publishedAt?: Date;
}

export function postNews(data: PostNewsData) {
  return fetch(`${BASE_URL}/news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
}
