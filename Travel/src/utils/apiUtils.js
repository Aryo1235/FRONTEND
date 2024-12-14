import axiosInstance from "../api/axiosInstance";

export const fetchDestinations = async (
  query = "",
  sort = "",
  category = "",
  cityId = null // Ganti dengan cityId
) => {
  try {
    const response = await axiosInstance.get("/destination", {
      params: {
        name: query,
        sort: sort,
        category: category,
        cityId: cityId, // Kirim city.id ke API
      },
    });
    return response.data.destinations || [];
  } catch (err) {
    throw new Error(err.message || "Failed to fetch destinations.");
  }
};

export const fetchDestinationById = async (id) => {
  try {
    const response = await axiosInstance.get(`/destination/${id}`);
    return response.data.destination;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch destination details.");
  }
};

export const fetchNearbyDestinations = async (cityId) => {
  if (!cityId) {
    throw new Error("User city ID not available");
  }

  try {
    const response = await axiosInstance.get(`/destination?city=${cityId}`);
    return response.data.destinations || [];
  } catch (error) {
    console.error("Error fetching nearby destinations:", error);
    throw new Error("Failed to load destinations.");
  }
};

export const fetchDestinationsAPI = async (cityId) => {
  const response = await axiosInstance.get(`/destination?city=${cityId}`);
  console.log(response);
  return response.data.destinations || [];
};
