import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import MyCollectionCard from "../components/MyCollectionCard";

const Featured = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {});

  return (
    <Container sx={{ marginTop: "2%" }}>
      <MyCollectionCard />
    </Container>
  );
};

export default Featured;
