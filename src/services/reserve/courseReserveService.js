import http from "../http-service.js/http-service";

export const getCourseReservesApi = async (params) => {
  try {
    const response = await http.get("/CourseReserve", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const sendReserveToCourseApi  = async (reserveData) => {
    try{
        const response = await http.post("/CourseReserve/SendReserveToCourse", reserveData);
        return response.data;
    }catch(error){
        throw error
    }
}
export const getCourseReserveByIdApi = async (courseId) => {
  try {
    const response = await http.get(`/CourseReserve/${courseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
