import { createContext, useEffect, useReducer } from "react";
import { videoReducer } from "./reducers/reducerVideo";
import {
  VIDEO_FAIL,
  VIDEO_REQUEST,
  VIDEO_SUCCESS,
} from "./constants/videoConstants";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { lastNewsReducer } from "./reducers/reducerLastNews";
import {
  LAST_POST_FAIL,
  LAST_POST_REQUEST,
  LAST_POST_SUCCESS,
} from "./constants/lastPostconstants";
import { useState } from "react";
import { catPostReducer } from "./reducers/reducerCategory";
import {
  CATEGORY_POST_FAIL,
  CATEGORY_POST_REQUEST,
  CATEGORY_POST_SUCCESS,
} from "./constants/categoryConstants";
import { useLocation } from "react-router-dom";
import { popularNewsReducer } from "./reducers/reducerPopular";
import {
  POPULAR_NEWS_FAIL,
  POPULAR_NEWS_REQUEST,
  POPULAR_NEWS_SUCCESS,
} from "./constants/popularConstants";
export const HomeContext = createContext();
const INITIAL_STATE = {
  loading: true,
  error: "",
  videos: [],
};
const INITIAL_STATE_LAST_NEWS = {
  loading: true,
  error: "",
  lastNews: [],
};
const INITIAL_STATE_CAT_POST = {
  loading: true,
  error: "",
  news: [],
};

const INITIAL_STATE_POPULAR_NEWS = {
  loading: true,
  error: "",
  popularNews: [],
};

export const HomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE);
  const [stateLastNews, lastNewsDispatch] = useReducer(
    lastNewsReducer,
    INITIAL_STATE_LAST_NEWS
  );
  const [stateCatPost, catPostDispatch] = useReducer(
    catPostReducer,
    INITIAL_STATE_CAT_POST
  );
  const [statePopularNews, popularNewsDispatch] = useReducer(
    popularNewsReducer,
    INITIAL_STATE_POPULAR_NEWS
  );
  const [category, setCategory] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    LoadVideo();
    LoadLastNews();
    LoadCategory();
    LoadCatPost();
    LoadMostPopular()
  }, []);

  const LoadVideo = async () => {
    try {
      dispatch({ type: VIDEO_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/single-video`);
      dispatch({ type: VIDEO_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: VIDEO_FAIL, payload: error.response.data.message });
    }
  };

  const LoadLastNews = async () => {
    try {
      lastNewsDispatch({ type: LAST_POST_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/news/lastnews`);
      lastNewsDispatch({ type: LAST_POST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      lastNewsDispatch({
        type: LAST_POST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  const LoadCatPost = async () => {
    try {
      catPostDispatch({ type: CATEGORY_POST_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/news/cat-news${cat}`);
      catPostDispatch({ type: CATEGORY_POST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      catPostDispatch({
        type: CATEGORY_POST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  const LoadMostPopular = async () => {
    try {
      popularNewsDispatch({ type: POPULAR_NEWS_REQUEST });
      const { data } = await axios.get(`${baseUrl}/api/news/popular`);
      popularNewsDispatch({ type: POPULAR_NEWS_SUCCESS, payload: data });
    } catch (error) {
      popularNewsDispatch({
        type: POPULAR_NEWS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  const LoadCategory = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/category/home`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async(data) => {
console.log(data);
  }

  return (
    <HomeContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        videos: state.videos,
        loadingLastNews: stateLastNews.loading,
        errorLastNews: stateLastNews.error,
        lastNews: stateLastNews.lastNews,
        loadingCatPost: stateCatPost.loading,
        errorCatPost: stateCatPost.error,
        news: stateCatPost.news,
        loadingPopular : statePopularNews.loading,
        errorPopular: statePopularNews.error,
        popularNews: statePopularNews.popularNews,

        category,
        LoadCatPost,
        createComment
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
