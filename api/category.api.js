import API from "./axios";

export const createCategoryApi = (data) =>
  API.post("/api/v1/category/create", data);

export const getCategoryApi = ({ page = 0, limit = 10, deleteType = "SD" }) =>
  API.get("/api/v1/category", {
    params: {
      start:page,
      size:limit,
      deleteType,
    },
  });

export const getCategoryById = (id) => 
  API.get(`/api/v1/category/get-category/${id}`)

export const updateCategoryApi = async({_id, name, slug})=> {
  const {data} = await API.put(`/api/v1/category/update`, {
    payload:{
      _id,
      name, 
      slug
    }
  })
  return data
}