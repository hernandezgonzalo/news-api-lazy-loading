import axios from "axios";

const api = axios.create({
  baseURL: "https://api.nytimes.com/svc/search/v2"
});

export const getNews = async page => {
  try {
    const { data } = await api.get("/articlesearch.json", {
      params: {
        "api-key": process.env.REACT_APP_NEWS_API_KEY,
        fq: 'news_desk:("Culture")',
        sort: "newest",
        page
      }
    });
    return data.response.docs;
  } catch (error) {
    throw error;
  }
};
