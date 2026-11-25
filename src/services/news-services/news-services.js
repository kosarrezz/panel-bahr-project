import http from "../http-service.js/http-service";

export const getNewsListApi = async (params) => {
  const response = await http.get("/News", { params });
  return response.data;
};

export const activeAndDeactiveNewsApi = async (active, id) => {
  const formData = new FormData();
  formData.append("Active", active);
  formData.append("Id", id);

  const response = await http.put("/News/ActiveDeactiveNews", formData);
  return response.data;
};

export const createNewsApi = async (newsData) => {
  const formData = new FormData();

  formData.append("Title", newsData.title);
  formData.append("GoogleTitle", newsData.googleTitle);
  formData.append("MiniDescribe", newsData.miniDescribe);
  formData.append("Describe", newsData.describe);
  formData.append("Keyword", newsData.keyword);
  formData.append("GoogleDescribe", newsData.googleDescribe);
  formData.append("NewsCatregoryId", newsData.newsCategoryId);
  formData.append("NewsCategoryId", newsData.newsCategoryId);

  const response = await http.post("/News/CreateNews", formData);
  return response.data;
};

export const getNewsCategoryListApi = async () => {
  const response = await http.get("/News/GetListNewsCategory");
  return response.data;
};

export const updateNewsApi = async (newsData) => {
  const formData = new FormData();

  formData.append("Id", newsData.id);
  formData.append("Title", newsData.title);
  formData.append("GoogleTitle", newsData.googleTitle);
  formData.append("MiniDescribe", newsData.miniDescribe);
  formData.append("Describe", newsData.describe);
  formData.append("Keyword", newsData.keyword);
  formData.append("GoogleDescribe", newsData.googleDescribe);
  formData.append("NewsCatregoryId", newsData.newsCategoryId);
  formData.append("IsSlider", String(!!newsData.isSlider));

  const response = await http.put("/News/UpdateNews", formData);
  return response.data;
};
