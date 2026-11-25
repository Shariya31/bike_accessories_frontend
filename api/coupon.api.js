import API from "./axios";

export const getCouponApi = ({ page = 0, limit = 10, deleteType = "SD" }) =>
  API.get("/api/v1/coupon", {
    params: {
      page,
      limit,
      deleteType,
    },
  });

export const createCouponApi = (data) =>
  API.post("/api/v1/coupon/create", data);

export const getCouponById = (id) =>
  API.get(`/api/v1/coupon/get-coupon/${id}`)

export const updateCouponApi = async ({ _id, code, discountPercentage, minShoppingAmount, validity }) => {
  const { data } = await API.put(`/api/v1/coupon/update`, {
    payload: {
      _id,
      code,
      discountPercentage,
      minShoppingAmount,
      validity,
    }
  })
  return data
}