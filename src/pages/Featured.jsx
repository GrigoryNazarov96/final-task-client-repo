import React from "react";
import { Container } from "@mui/material";
import MyCollectionCard from "../components/MyCollectionCard";

const Featured = () => {
  return (
    <Container sx={{ marginTop: "2%" }}>
      <MyCollectionCard />
    </Container>
  );
};

export default Featured;
