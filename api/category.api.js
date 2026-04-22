import API from "./axios";

export const createCategoryApi = (data) =>
  API.post("/api/v1/category/create", data);