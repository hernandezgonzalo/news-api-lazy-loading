const { makeStyles } = require("@material-ui/core");

export const NewsCardStyles = makeStyles({
  title: {
    fontSize: "1rem",
    lineHeight: "1.2rem",
    fontFamily: '"Baloo 2"'
  },
  snippet: {
    lineHeight: "1.2rem",
    marginBottom: ".5em",
    fontFamily: '"Baloo 2"'
  },
  footer: {
    fontSize: ".8rem",
    opacity: ".6",
    fontFamily: '"Baloo 2"'
  }
});
