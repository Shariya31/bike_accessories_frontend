import API from "./axios";

export const getProductVariantApi = ({ page = 0, limit = 10, deleteType = "SD" }) =>
  API.get("/api/v1/product-variant", {
    params: {
      page,
      limit,
      deleteType,
    },
  });

export const createProductVariantApi = (data) =>
  API.post("/api/v1/product-variant/create", data);

export const getProductVariantById = (id) =>
  API.get(`/api/v1/product/get-product-variant/${id}`)

export const updateProductVariantApi = async ({ _id, name, slug, category, mrp, sellingPrice, discountPercentage, description, media }) => {
  const { data } = await API.put(`/api/v1/product-variant/update`, {
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