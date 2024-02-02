import { Stack } from "@mui/material";
import React from "react";

const Wrapper = ({ children }) => {
  return (
    <Stack
      maxWidth={"100vw"}
      minHeight={"100vh"}
      flexWrap={"wrap"}
      sx={{ backgroundColor: "#f0ece5" }}
    >
      {children}
    </Stack>
  );
};

export default Wrapper;
