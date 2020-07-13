const newsReducer = (state, action) => {
  switch (action.type) {
    case "INCREASE_PAGE":
      return { ...state, page: state.page + 1 };
    case "SET_ARTICLES":
      return { ...state, articles: [...state.articles, ...action.articles] };
    default:
      throw new Error();
  }
};

export default newsReducer;
