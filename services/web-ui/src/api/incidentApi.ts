import axios from "axios";

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

export const fetchOnCallScheduleByService = async (serviceName: string) => {
  try {
    console.log("here");
    const ON_CALL_API_URL = "http://localhost:8003/api/v1/on-call";
    const response = await axios.get(
      `${ON_CALL_API_URL}/schedule?service=${serviceName}`,
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
