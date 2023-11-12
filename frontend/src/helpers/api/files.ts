const BASE_URL = "http://localhost:3000";

export function uploadFile(files: FormData, newsID: string) {
  return fetch(`${BASE_URL}/news/${newsID}/files`, {
    method: "POST",
    credentials: "include",
    body: files,
  });
}

export function getFile(id: string) {
  return fetch(`${BASE_URL}/files/${id}`, {
    method: "GET",
    credentials: "include",
  });
}
