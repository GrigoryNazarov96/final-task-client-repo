import { Container, Typography, Box } from "@mui/material";
import React from "react";
import MyTagCloud from "../components/MyTagCloud";
import MyTable from "../components/MyTable";

import FeaturedCard from "../components/FeaturedCard";

const Home = () => {
  return (
    <>
      <Container sx={{ marginTop: "2%", marginBottom: "2%" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ marginTop: "2%", marginBottom: "1%" }}
        >
          Tags
        </Typography>
        <MyTagCloud />
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ marginTop: "3%", marginBottom: "1%" }}
        >
          Featured
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <FeaturedCard title={"Most liked"} />
          <FeaturedCard title={"Biggest"} />
        </Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ marginTop: "3%", marginBottom: "1%" }}
        >
          Items
        </Typography>
        <MyTable />
      </Container>
    </>
  );
};

export default Home;
