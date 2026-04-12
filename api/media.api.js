import API from "./axios";

export const createMediaApi = (data) =>
  API.post("/api/v1/media/create", data);

export const getMediaApi = ({ page = 0, limit = 10, deleteType = "SD" }) =>
  API.get("/api/v1/media/get-media", {
    params: {
      page,
      limit,
      deleteType,
    },
  });

//add endpoint as a parameter if endpoint is dynamic
export const deleteMediaApi = async ({ ids, deleteType, deleteEndpoint }) => {
  const { data } = await API({
    url: deleteEndpoint, // or pass dynamically if needed url: endpoint
    method: deleteType === "PD" ? "DELETE" : "PUT",
    data: {payload: { ids, deleteType }}
  });
  return data
}
