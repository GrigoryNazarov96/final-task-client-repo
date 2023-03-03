import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { getFeaturedCollections } from "../requests/featuredRequests";
import MyCollectionCard from "../components/MyCollectionCard";

const Featured = ({ title }) => {
  const [collections, setCollections] = useState([]);
  const queryStr = title === "Most Liked" ? "liked" : "biggest";

  useEffect(() => {
    if (queryStr === "liked") {
      console.log("Most Liked");
    } else {
      getFeaturedCollections("biggest").then((data) => setCollections(data));
    }
  }, []);

  return (
    <Container sx={{ marginTop: "2%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: collections.length ? "start" : "center",
          alignItems: "center",
          width: "100%",
          marginTop: "10%",
        }}
      >
        {collections.map((c) => (
          <MyCollectionCard key={c._id} collection={c.collection[0]} />
        ))}
      </Box>
    </Container>
  );
};

export default Featured;
