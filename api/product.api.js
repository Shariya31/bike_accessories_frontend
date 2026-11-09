import API from "./axios";

export const createProductApi = (data) =>
  API.post("/api/v1/product/create", data);

export const getProductById = (id) =>
  API.get(`/api/v1/product/get-product/${id}`)

export const updateProductApi = async ({ _id, name, slug, category, mrp, sellingPrice, discountPercentage, description, media }) => {
  const { data } = await API.put(`/api/v1/product/update`, {
    payload: {
      _id,
      name,
      slug,
      category,
      mrp,
      sellingPrice,
      discountPercentage,
      description,
      media,
    }
  })
  return data
}