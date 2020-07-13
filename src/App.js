import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useReducer
} from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import _ from "lodash";
import NewsCard from "./components/NewsCard";
import { getNews } from "./services/news.api";
import newsReducer from "./reducers/newsReducer";
import Loader from "./components/Loader";
import { AppStyles } from "./styles/App";

const App = () => {
  const classes = AppStyles();
  const [isLazy, setIsLazy] = useState(false);
  const newsRef = useRef();
  const [news, newsDispatch] = useReducer(newsReducer, {
    page: 0,
    articles: []
  });

  useLayoutEffect(() => {
    const { current } = newsRef;
    if (current) {
      current.onscroll = e => {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        if (scrollHeight - (scrollTop + clientHeight) < 10 && !isLazy) {
          setIsLazy(true);
          newsDispatch({ type: "INCREASE_PAGE" });
        }
      };
    }
  }, [isLazy]);

  useEffect(() => {
    let isSubscribed = true;
    getNews(news.page).then(response => {
      if (isSubscribed) {
        newsDispatch({ type: "SET_ARTICLES", articles: response });
        setIsLazy(false);
      }
    });
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
        {news.articles.map((article, i) => (
          <NewsCard key={i} {...article} />
        ))}
        {(_.isEmpty(news.articles) || isLazy) && <Loader />}
      </Box>
    </Grid>
  );
};

export default App;
