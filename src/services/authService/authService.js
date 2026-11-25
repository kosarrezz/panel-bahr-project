import http from "../http-service.js/http-service";

export const loginAPI = async (values) => {
  try {
    const response = await http.post("/Sign/Login", {
      phoneOrGmail: values.email,
      password: values.password,
      rememberMe: values.rememberMe || false,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const sendVerifyMessageAPI = async (gmail) => {
  const response = await http.post("/Sign/SendVerifyMessage", { gmail });
  return response.data;
};

export const verifyMessageAPI = async (gmail, verifyCode) => {
  const response = await http.post("/Sign/VerifyMessage", {
    gmail,
    verifyCode,
  });
  return response.data;
};

export const registerAPI = async (values) => {
  try {
    const response = await http.post("/Sign/Register", {
      password: values.password,
      gmail: values.gmail,
      phoneNumber: values.phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgetPasswordAPI = async (email, baseUrl) => {
  try {
    const response = await http.post("/Sign/ForgetPassword", {
      email,
      baseUrl,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const resetPasswordAPI = async (data) => {
  try {
    const response = await http.post("/Sign/Reset", data);
    return response;
  } catch (error) {
    throw error;
  }
};
