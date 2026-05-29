import axios from "axios";

// 1. We wrap it in a function and EXPORT it so other files can see it
export const fetchIncidentsFromBackend = async () => {
  try {
    const response = await axios.get("http://localhost:8002/incidents");
    return response.data; // This is the raw JSON from NestJS
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
// Fetch a single incident by ID
export const fetchIncidentById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8002/incidents/${id}`);
    if (!response.ok) throw new Error("Failed to fetch incident");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching incident ${id}:`, error);
    return null;
  }
};
