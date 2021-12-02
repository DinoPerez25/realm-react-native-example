import httpRequest from "./httpRequest";

export const fetchAddresses = async (page, pageSize) => {
  try {
    const response = await httpRequest({
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4ODE5OTgyOCwib3BlcmF0aW5nVW5pdElkIjoyLCJpYXQiOjE2Mzg0NjE4NTl9.1AqnTVoTBW95Esrk3xl_h6jJPazi1tFIaelGPTG6iII`,
      },
      method: 'GET',
      url: `/addresses/byPage?page=${page}&pageSize=${pageSize}`,
    });
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, error: err };
  }
}