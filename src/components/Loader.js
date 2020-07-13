import React from "react";
import { CircularProgress, Box } from "@material-ui/core";

const Loader = () => (
  <Box width={1} display="flex" justifyContent="center" p={1}>
    <CircularProgress />
  </Box>
);

export default Loader;
