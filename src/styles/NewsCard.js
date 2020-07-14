const { makeStyles } = require("@material-ui/core");

export const NewsCardStyles = makeStyles({
  title: {
    fontFamily: '"Baloo 2"',
    fontSize: "1rem",
    lineHeight: "1.2rem"
  },
  snippet: {
    fontFamily: '"Baloo 2"',
    lineHeight: "1.2rem",
    marginBottom: ".5em"
  },
  footer: {
    fontFamily: '"Baloo 2"',
    fontSize: ".8rem",
    opacity: ".6"
  }
});
