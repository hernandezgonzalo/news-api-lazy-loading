import React, { useEffect, useRef, useReducer } from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import _ from "lodash";
import NewsCard from "./components/NewsCard";
import { getNews } from "./services/news.api";
import newsReducer from "./reducers/newsReducer";
import Loader from "./components/Loader";
import { AppStyles } from "./styles/App";

const App = () => {
  const classes = AppStyles();
  const newsRef = useRef();
  const [news, newsDispatch] = useReducer(newsReducer, {
    page: 0,
    articles: [],
    isLazy: true
  });

  useEffect(() => {
    const { current } = newsRef;
    if (current) {
      current.onscroll = e => {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        if (scrollHeight - (scrollTop + clientHeight) < 10 && !news.isLazy)
          newsDispatch({ type: "INCREASE_PAGE" });
      };
    }
  }, [news.isLazy]);

  useEffect(() => {
    let isSubscribed = true;
    getNews(news.page)
      .then(articles => {
        if (isSubscribed) newsDispatch({ type: "SET_ARTICLES", articles });
      })
      .catch(console.error);
    return () => (isSubscribed = false);
  }, [news.page]);

  return (
    <Grid item xs={12} md={4} lg={3} className={classes.newsGrid}>
      <Box
        component={Paper}
        square
        className={classes.newsWrapper}
        ref={newsRef}
      >
        {news.articles.map((article, index) => (
          <NewsCard key={index} {...article} />
        ))}
        {(_.isEmpty(news.articles) || news.isLazy) && <Loader />}
      </Box>
    </Grid>
  );
};

export default App;
