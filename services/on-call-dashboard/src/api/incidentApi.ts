import axios from "axios";

// 1. We wrap it in a function and EXPORT it so other files can see it
export const fetchIncidentsFromBackend = async () => {
  try {
    const response = await axios.get("http://localhost:8002/incidents");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
// Fetch a single incident by ID
export const fetchIncidentById = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:8002/incidents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching incident ${id}:`, error);
    return null;
  }
};

export const acknowledgeIncidentApi = async (id: string) => {
  const response = await axios.patch(
    `http://localhost:8002/incidents/${id}/acknowledge`,
  );
  return response.data;
};

export const resolveIncidentApi = async (id: string) => {
  const response = await axios.patch(
    `http://localhost:8002/incidents/${id}/resolve`,
  );
  return response.data;
};
