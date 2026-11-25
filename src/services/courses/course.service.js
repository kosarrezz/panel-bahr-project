import http from "../http-service.js/http-service";

export const getCourseListApi = async (params) => {
  try {
    const response = await http.get("Course/CourseList", { params });
    return response.data;
  } catch (error) {
    e.error("Error fetching course list:", error);
    throw error;
  }
};
export const activeAndDeactiveCourseApi = async (active, courseId) => {
  try {
    const response = await http.put("Course/ActiveAndDeactiveCourse", {
      active,
      id: courseId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createCourse = async (formData) => {
  try {
    const response = await http.post("/Course", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCourseDetailsApi = async (courseId) => {
  try {
    const response = await http.get("Home/GetCourseDetails", {
      params: {
        CourseId: courseId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateCourseApi = async (courseData) => {
  try {
    const response = await http.put("/Course", courseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
