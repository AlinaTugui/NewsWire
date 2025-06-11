//import UserInterface from "../interfaces/UserInterface";
import axios from "axios";
import { authConfig } from "./authConfig";


const newsURL = "http://localhost:8080/news";
const API_URL = 'https://api.smmry.com';

const saveArticle = async (article) => {
    return (await axios.post(`${newsURL}`, article, authConfig(localStorage.getItem("token") || ""))).data;
  };

const deleteArticle = async (id,url) => {
    return (await axios.delete(`${newsURL}/${id}?url=${url}`, authConfig(localStorage.getItem("token") || ""))).data;
}

const getSavedNews = async (userId)=> {
    return (await  axios.get(`${newsURL}/saved/${userId}`, authConfig(localStorage.getItem("token")||""))).data;
}

const getSummary = async (apiKey, url) => {
  const options = {
    method: 'POST',
    url: 'https://news-article-data-extract-and-summarization1.p.rapidapi.com/extract/',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'news-article-data-extract-and-summarization1.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: { url: url },
  };

  return await axios.request(options);
};
export {saveArticle,deleteArticle, getSavedNews,getSummary}